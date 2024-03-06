import { Event } from './Event.js';

export class AtSymbolListener {
  constructor(input, target, onSelected) {
    if (!target) {
      throw Error('No target element specified');
    }
    this.active = false;
    this.onSelected = onSelected;
    this.input = input;
    this.target = target;
    this.bindEventListeners();
  }

  bindEventListeners() {
    this.input.addEventListener('input', () => this.handleInput());
    this.input.addEventListener('keydown', (e) => this.handleKeydown(e));
    Event.listen('select', this.handleSelected.bind(this), this.ul);
  }

  handleInput() {
    const text = this.getText();
    const lastChar = text[text.length - 1];

    // Handle show and hide using special characters
    if (lastChar === '@') {
      this.showTarget();
    }

    // Handle search if active
    if (this.active) {
      const searchTerm = this.getSearchTerm();
      if (!this.target.filter(searchTerm)) {
        // TODO: Show ”No matches” instead of hiding
        this.hideTarget();
      }
    }
  }

  getText() {
    return this.input.value.trim();
  }

  getSearchTerm() {
    const text = this.getText();
    const lastAtPos = text.lastIndexOf('@');
    const query = lastAtPos !== -1 ? text.substring(lastAtPos + 1) : null;
    return query;
  }

  handleKeydown(event) {
    const key = event.key;

    // Select first item on tab
    if (event.which == 9 && this.active) {
      const select =
        this.target.element.querySelector('li:not(.hidden)')?.textContent;
      this.handleSelected(select);

      event.preventDefault();
    } else if (key === ' ' || key === 'Enter' || key === 'Escape') {
      this.hideTarget();
    }
  }

  handleSelected(selected) {
    if (selected === null || selected === undefined) {
      return;
    }
    if (!this.active) {
      return;
    }
    const text = this.getText();
    const lastAtPos = text.lastIndexOf('@');
    if (lastAtPos !== -1) {
      this.input.value = text.substring(0, lastAtPos + 1) + selected;
      this.input.focus();
      this.input.setSelectionRange(
        this.input.value.length,
        this.input.value.length,
      );
      // this.onSelected(selected);
      this.hideTarget();
    }
  }

  showTarget() {
    this.active = true;
    this.target.element.classList.add('active');
    this.target.show();
  }

  hideTarget() {
    this.active = false;
    this.target.element.classList.remove('active');
    this.target.hide();
  }
}
