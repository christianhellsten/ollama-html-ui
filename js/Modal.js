// Modal base class
export class Modal {
  constructor(options) {
    this.domId = options.domId;
    this.templateId = options.templateId;
    this.modal = this.createDialogElement();
    this.titleElement = this.modal.querySelector('.modal-title');
    this.closeButton = this.modal.querySelector('.button-close');
    this.closeButton.onclick = () => this.hide();
    this._bindEventListeners();
    this.setTitle(options.title);
  }

  setTitle(title) {
    this.titleElement.textContent = title;
  }

  _bindEventListeners() {
    this.modal.addEventListener('click', (event) => {
      if (event.target == this.modal) {
        this.hide();
      }
    });
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.hide();
      }
    });
  }

  createDialogElement() {
    const template = document.getElementById(this.templateId);
    if (!template) {
      console.error(`Template with ID ${this.templateId} not found.`);
      return;
    }

    const clone = template.content.cloneNode(true);
    const modalElement = clone.firstElementChild;
    modalElement.id = this.domId;

    if (!modalElement) {
      console.error(
        `No modal element found in the template with ID ${this.templateId}.`,
      );
      return;
    }

    document.body.appendChild(modalElement);

    return modalElement;
  }

  show() {
    this.handleShow();
  }

  hide() {
    this.handleHide();
  }

  handleShow() {
    this.modal.classList.add('show');
  }

  handleHide() {
    this.modal.classList.remove('show');
  }
}
