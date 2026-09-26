/**
 * Quiz Engine Module
 * Pure business logic and session state management for Quiz Computacional.
 */

export class QuizEngine {
  /**
   * Initializes the engine with loaded questions.
   * @param {Array} questions - Array of 10 question objects.
   */
  constructor(questions) {
    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error('QuizEngine requires a non-empty array of questions.');
    }
    this.questions = questions;
    this.currentIndex = 0;
    // Store user selections for each question index: number | null
    this.userAnswers = new Array(questions.length).fill(null);
    // Track confirmed status per question: boolean
    this.confirmedAnswers = new Array(questions.length).fill(false);
  }

  /**
   * Returns current active question object.
   * @returns {Object}
   */
  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }

  /**
   * Returns current question index (0-based).
   * @returns {number}
   */
  getCurrentIndex() {
    return this.currentIndex;
  }

  /**
   * Records option selection for current question.
   * @param {number} optionIndex - Index (0-3) of selected option.
   */
  selectOption(optionIndex) {
    if (optionIndex >= 0 && optionIndex < 4) {
      this.userAnswers[this.currentIndex] = optionIndex;
    }
  }

  /**
   * Returns currently selected option index for current question.
   * @returns {number|null}
   */
  getSelectedOption() {
    return this.userAnswers[this.currentIndex];
  }

  /**
   * Confirms current answer selection.
   */
  confirmCurrentAnswer() {
    if (this.getSelectedOption() !== null) {
      this.confirmedAnswers[this.currentIndex] = true;
    }
  }

  /**
   * Checks if current question answer has been confirmed.
   * @returns {boolean}
   */
  isCurrentAnswerConfirmed() {
    return this.confirmedAnswers[this.currentIndex];
  }

  /**
   * Advances to next question if available.
   * @returns {boolean} True if advanced successfully.
   */
  nextQuestion() {
    if (!this.isLastQuestion()) {
      this.currentIndex++;
      return true;
    }
    return false;
  }

  /**
   * Navigates back to previous question if available.
   * @returns {boolean} True if moved back successfully.
   */
  previousQuestion() {
    if (!this.isFirstQuestion()) {
      this.currentIndex--;
      return true;
    }
    return false;
  }

  /**
   * Checks if active question is the first one (index 0).
   * @returns {boolean}
   */
  isFirstQuestion() {
    return this.currentIndex === 0;
  }

  /**
   * Checks if active question is the last one (index N-1).
   * @returns {boolean}
   */
  isLastQuestion() {
    return this.currentIndex === this.questions.length - 1;
  }

  /**
   * Calculates final score metrics.
   * @returns {Object} { totalQuestions, correctCount, incorrectCount, percentage }
   */
  calculateResult() {
    const totalQuestions = this.questions.length;
    let correctCount = 0;

    for (let i = 0; i < totalQuestions; i++) {
      const selected = this.userAnswers[i];
      const correct = this.questions[i].correctIndex;
      if (selected !== null && selected === correct) {
        correctCount++;
      }
    }

    const incorrectCount = totalQuestions - correctCount;
    const percentage = Number(((correctCount / totalQuestions) * 100).toFixed(1));

    return {
      totalQuestions,
      correctCount,
      incorrectCount,
      percentage
    };
  }

  /**
   * Resets all progress and returns to first question.
   */
  reset() {
    this.currentIndex = 0;
    this.userAnswers = new Array(this.questions.length).fill(null);
    this.confirmedAnswers = new Array(this.questions.length).fill(false);
  }
}
