export class Hoverable {
  constructor(element) {
    this.element = element;
    element.hoverable = this;
    this.bindEventListeners();
  }

  bindEventListeners() {
    this.element.addEventListener('mouseover', () => this.onMouseover());
    this.element.addEventListener('mouseout', () => this.onMouseout());
  }

  onMouseover() {
    this.element.classList.add('hover');
  }

  onMouseout() {
    this.element.classList.remove('hover');
  }
}
