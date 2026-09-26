/**
 * Main Entry Point Module
 * Bootstraps the Quiz Computacional SPA.
 */

import { QuestionsService } from '../data/questions-service.js';
import { QuizEngine } from '../engine/quiz-engine.js';
import { UIController } from './ui-controller.js';
import { ModalController } from './modal-controller.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // 1. Load questions from JSON or fallback
    const questions = await QuestionsService.loadQuestions();

    // 2. Initialize Core Engine
    const engine = new QuizEngine(questions);

    // 3. Initialize Modal Controller with Reset Action Callback
    const modalController = new ModalController(() => {
      engine.reset();
      uiController.start();
    });

    // 4. Initialize UI Controller with Reset Trigger Callback
    const uiController = new UIController(engine, () => {
      modalController.show();
    });

    // 5. Start SPA
    uiController.start();
  } catch (error) {
    console.error('Error initializing Quiz Computacional:', error);
    const loadingView = document.getElementById('view-loading');
    if (loadingView) {
      loadingView.innerHTML = `
        <p style="color: var(--error-color); font-weight: bold;">
          Ocorreu um erro ao carregar o quiz. Por favor, recarregue a página.
        </p>
      `;
    }
  }
});
