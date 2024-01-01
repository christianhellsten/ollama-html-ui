export class DOM {
  static showElement(element) {
    element.classList.remove('hidden');
    return this;
  }

  static hideElement(element) {
    element.classList.add('hidden');
    return this;
  }

  static enableInput(element) {
    element.removeAttribute('disabled');
    return this;
  }

  static disableInput(element) {
    element.setAttribute('disabled', 'disabled');
    return this;
  }
}
