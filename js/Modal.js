// Modal base class
export class Modal {
  constructor (domId) {
    this.domId = domId
    this.modal = document.getElementById(this.domId)
    this.closeButton = this.modal.querySelector('.button-close')
    this.closeButton.onclick = () => this.hide()
  }

  show () {
    this.handleShow()
  }

  hide () {
    this.handleHide()
  }

  handleShow () {
    this.modal.classList.add('show')
  }

  handleHide () {
    this.modal.classList.remove('show')
  }
}
