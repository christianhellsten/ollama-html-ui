export class DOM {
  static toggle(element) {
    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
      element.classList.add('visible');
    } else {
      element.classList.remove('visible');
      // Trigger fadeOut animation, then set display to none after the animation completes
      element.classList.add('fade-out');
      // Fade-out animation duration is 0.5s
      setTimeout(() => {
        element.classList.remove('fade-out');
        element.classList.add('hidden');
      }, 500);
    }
    return this;
  }

  static showElement(element) {
    element.classList.remove('hidden');
    element.classList.add('visible');
    return this;
  }

  static hideElement(element) {
    element.classList.add('hidden');
    element.classList.remove('visible');
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
