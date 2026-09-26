# Contract Specification: QuizEngine JS API

**Feature Branch**: `001-quiz-computacional`
**Date**: 2026-09-26

## Engine Interface (`quiz-engine.js`)

A classe `QuizEngine` encapsula toda a lógica de estado e regras de negócio do quiz de forma totalmente isolada da manipulação de DOM/HTML.

### Interface Pública

```javascript
export class QuizEngine {
  /**
   * Inicializa o QuizEngine com uma lista de questões validada.
   * @param {Array<Question>} questions - Lista com 10 questões.
   */
  constructor(questions) {}

  /**
   * Retorna a questão atualmente ativa na sessão.
   * @returns {Question} Objeto da questão atual.
   */
  getCurrentQuestion() {}

  /**
   * Retorna o índice (0 a 9) da questão atual.
   * @returns {number}
   */
  getCurrentIndex() {}

  /**
   * Registra a escolha de uma alternativa pelo estudante na questão atual.
   * @param {number} optionIndex - Índice (0 a 3) da alternativa selecionada.
   */
  selectOption(optionIndex) {}

  /**
   * Retorna o índice da opção atualmente selecionada na questão corrente (ou null se não selecionada).
   * @returns {number|null}
   */
  getSelectedOption() {}

  /**
   * Avança para a próxima questão se disponível.
   * @returns {boolean} True se avançou com sucesso.
   */
  nextQuestion() {}

  /**
   * Retorna para a questão anterior se disponível.
   * @returns {boolean} True se voltou com sucesso.
   */
  previousQuestion() {}

  /**
   * Verifica se a questão atual é a primeira (índice 0).
   * @returns {boolean}
   */
  isFirstQuestion() {}

  /**
   * Verifica se a questão atual é a última (índice 9).
   * @returns {boolean}
   */
  isLastQuestion() {}

  /**
   * Finaliza o quiz e calcula o resultado de desempenho.
   * @returns {QuizResult} Objeto contendo totalQuestions, correctCount, incorrectCount e percentage.
   */
  calculateResult() {}

  /**
   * Reinicia o estado da sessão zerando as respostas e voltando para a primeira questão.
   */
  reset() {}
}
```
