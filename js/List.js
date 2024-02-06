import { Event } from './Event.js';
import { UIElement } from './UIElement.js';

export class List extends UIElement {
  constructor(ul, items) {
    super(ul);
    this.ul = ul;
    this.items = items;
    this.render();
    this.clickHandler = null;
    this.ul.classList.add('list');
  }

  onClick(handler) {
    this.clickHandler = handler;
    return this; // Allow chaining
  }

  setItems(items) {
    this.items = items;
    this.render();
  }

  setSelected(selected) {
    console.debug(`Select ${selected}`);
    this.selected = selected;
    this.li.forEach((item) => {
      if (item.textContent === selected) {
        item.classList.add('selected');
      } else {
        item.classList.remove('selected');
      }
    });
    Event.emit('select', selected, this.ul);
  }

  getSelected() {
    return this.selected;
  }

  render() {
    this.ul.innerHTML = ''; // Clear existing content
    this.li = this.items.map((item) => {
      const li = document.createElement('li');
      li.classList.add('list-item');
      if (item === this.selected) {
        li.classList.add('selected');
      }
      li.textContent = item;
      li.item = item;
      li.addEventListener('click', () => {
        this.setSelected(item);
        if (this.clickHandler) {
          this.clickHandler(item);
        }
      });
      this.ul.appendChild(li);
      return li;
    });
  }
}
