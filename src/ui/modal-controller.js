/**
 * Modal Controller Module
 * Handles reset confirmation dialog overlay interactions.
 */

export class ModalController {
  constructor(onConfirmCallback) {
    this.modalOverlay = document.getElementById('modal-reset');
    this.btnCancel = document.getElementById('modal-btn-cancel');
    this.btnConfirm = document.getElementById('modal-btn-confirm');
    this.onConfirmCallback = onConfirmCallback;

    this.initEventListeners();
  }

  initEventListeners() {
    this.btnCancel.addEventListener('click', () => this.hide());
    this.btnConfirm.addEventListener('click', () => {
      this.hide();
      if (typeof this.onConfirmCallback === 'function') {
        this.onConfirmCallback();
      }
    });

    // Close on overlay backdrop click
    this.modalOverlay.addEventListener('click', (event) => {
      if (event.target === this.modalOverlay) {
        this.hide();
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !this.modalOverlay.classList.contains('hidden')) {
        this.hide();
      }
    });
  }

  show() {
    this.modalOverlay.classList.remove('hidden');
  }

  hide() {
    this.modalOverlay.classList.add('hidden');
  }
}
