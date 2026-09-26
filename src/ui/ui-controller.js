/**
 * UI Controller Module
 * Manages DOM updates, view switching, event listeners, and user interaction.
 */

export class UIController {
  /**
   * @param {QuizEngine} engine - Instance of QuizEngine
   * @param {Function} onRestartRequest - Callback to trigger reset confirmation
   */
  constructor(engine, onRestartRequest) {
    this.engine = engine;
    this.onRestartRequest = onRestartRequest;

    // View Elements
    this.viewLoading = document.getElementById('view-loading');
    this.viewQuiz = document.getElementById('view-quiz');
    this.viewResults = document.getElementById('view-results');

    // Header & Navigation Elements
    this.btnRestartHeader = document.getElementById('btn-restart');
    this.btnRestartFinal = document.getElementById('btn-restart-final');

    // Quiz View Elements
    this.progressFill = document.getElementById('progress-fill');
    this.questionNumberLabel = document.getElementById('question-number');
    this.answeredBadge = document.getElementById('answered-badge');
    this.questionStatement = document.getElementById('question-statement');
    this.optionsContainer = document.getElementById('options-container');

    // Feedback Panel Elements
    this.feedbackPanel = document.getElementById('feedback-panel');
    this.feedbackBadge = document.getElementById('feedback-badge');
    this.feedbackExplanation = document.getElementById('feedback-explanation');

    // Quiz Action Buttons
    this.btnPrev = document.getElementById('btn-prev');
    this.btnConfirm = document.getElementById('btn-confirm');
    this.btnNext = document.getElementById('btn-next');

    // Result Screen Elements
    this.statCorrectCount = document.getElementById('stat-correct-count');
    this.statIncorrectCount = document.getElementById('stat-incorrect-count');
    this.statPercentage = document.getElementById('stat-percentage');

    this.initEventListeners();
  }

  initEventListeners() {
    // Header & Final restart buttons trigger modal confirmation
    this.btnRestartHeader.addEventListener('click', () => this.onRestartRequest());
    this.btnRestartFinal.addEventListener('click', () => this.onRestartRequest());

    // Navigation buttons
    this.btnPrev.addEventListener('click', () => this.handlePrevious());
    this.btnConfirm.addEventListener('click', () => this.handleConfirm());
    this.btnNext.addEventListener('click', () => this.handleNext());
  }

  /**
   * Initializes the UI and shows the first question.
   */
  start() {
    this.viewLoading.classList.add('hidden');
    this.viewResults.classList.add('hidden');
    this.viewQuiz.classList.remove('hidden');
    this.renderCurrentQuestion();
  }

  /**
   * Renders active question, options, progress, and confirmation/feedback state.
   */
  renderCurrentQuestion() {
    const question = this.engine.getCurrentQuestion();
    const currentIndex = this.engine.getCurrentIndex();
    const totalQuestions = this.engine.questions.length;
    const selectedOption = this.engine.getSelectedOption();
    const isConfirmed = this.engine.isCurrentAnswerConfirmed();

    // 1. Update Progress Bar & Counter
    const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;
    this.progressFill.style.width = `${progressPercent}%`;
    this.questionNumberLabel.textContent = `Questão ${currentIndex + 1} de ${totalQuestions}`;

    // 2. Set Statement
    this.questionStatement.textContent = question.statement;

    // 3. Render 4 Options
    this.optionsContainer.innerHTML = '';
    const optionLetters = ['A', 'B', 'C', 'D'];

    question.options.forEach((optText, index) => {
      const optionEl = document.createElement('div');
      optionEl.className = 'option-item';
      
      if (selectedOption === index) {
        optionEl.classList.add('selected');
      }

      // If already confirmed on this question, apply feedback state styles
      if (isConfirmed) {
        optionEl.classList.add('disabled');
        if (index === question.correctIndex) {
          optionEl.classList.add('state-correct');
        } else if (selectedOption === index && index !== question.correctIndex) {
          optionEl.classList.add('state-incorrect');
        }
      } else {
        optionEl.addEventListener('click', () => this.handleOptionClick(index));
      }

      optionEl.innerHTML = `
        <span class="option-prefix">${optionLetters[index]}</span>
        <span class="option-text">${this.escapeHTML(optText)}</span>
      `;
      this.optionsContainer.appendChild(optionEl);
    });

    // 4. Feedback Panel State
    if (isConfirmed && selectedOption !== null) {
      this.renderFeedback(question, selectedOption);
    } else {
      this.feedbackPanel.classList.add('hidden');
    }

    // 5. Action Buttons State
    this.btnPrev.disabled = this.engine.isFirstQuestion();

    if (isConfirmed) {
      this.btnConfirm.classList.add('hidden');
      this.btnNext.classList.remove('hidden');
      this.btnNext.disabled = false;
      this.btnNext.textContent = this.engine.isLastQuestion() ? 'Ver Resultado Final 🏆' : 'Próxima Questão →';
      this.answeredBadge.classList.remove('hidden');
    } else {
      this.btnConfirm.classList.remove('hidden');
      this.btnNext.classList.add('hidden');
      this.btnConfirm.disabled = (selectedOption === null);
      this.answeredBadge.classList.add('hidden');
    }
  }

  /**
   * Handles click on an option item.
   * @param {number} optionIndex 
   */
  handleOptionClick(optionIndex) {
    if (this.engine.isCurrentAnswerConfirmed()) return;

    this.engine.selectOption(optionIndex);
    this.renderCurrentQuestion();
  }

  /**
   * Handles click on "Confirmar Resposta".
   */
  handleConfirm() {
    if (this.engine.getSelectedOption() === null) return;

    this.engine.confirmCurrentAnswer();
    this.renderCurrentQuestion();
  }

  /**
   * Renders feedback panel (Correct/Incorrect + Explanation).
   */
  renderFeedback(question, selectedOption) {
    this.feedbackPanel.classList.remove('hidden');
    const isCorrect = (selectedOption === question.correctIndex);

    if (isCorrect) {
      this.feedbackPanel.className = 'feedback-panel correct';
      this.feedbackBadge.textContent = '✓ Resposta Correta!';
      this.feedbackExplanation.textContent = question.explanation;
    } else {
      this.feedbackPanel.className = 'feedback-panel incorrect';
      const correctOptionLetter = ['A', 'B', 'C', 'D'][question.correctIndex];
      const correctText = question.options[question.correctIndex];
      this.feedbackBadge.textContent = `✗ Resposta Incorreta! (A alternativa correta é a ${correctOptionLetter}: "${correctText}")`;
      this.feedbackExplanation.textContent = question.explanation;
    }
  }

  /**
   * Handles click on "Anterior".
   */
  handlePrevious() {
    if (this.engine.previousQuestion()) {
      this.renderCurrentQuestion();
    }
  }

  /**
   * Handles click on "Próxima Questão" / "Ver Resultado Final".
   */
  handleNext() {
    if (this.engine.isLastQuestion()) {
      this.renderResultsScreen();
    } else {
      this.engine.nextQuestion();
      this.renderCurrentQuestion();
    }
  }

  /**
   * Calculates metrics and displays the final result screen.
   */
  renderResultsScreen() {
    const result = this.engine.calculateResult();

    this.statCorrectCount.textContent = result.correctCount;
    this.statIncorrectCount.textContent = result.incorrectCount;
    this.statPercentage.textContent = `${result.percentage}%`;

    this.viewQuiz.classList.add('hidden');
    this.viewResults.classList.remove('hidden');
  }

  /**
   * Escapes HTML string to prevent XSS.
   */
  escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}
