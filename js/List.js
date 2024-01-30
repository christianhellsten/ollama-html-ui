export class List {
  constructor(container, items) {
    this.container = container;
    this.items = items;
    this.render();
    this.clickHandler = null;
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
    this.render();
  }

  getSelected() {
    return this.selected;
  }

  render() {
    this.container.innerHTML = ''; // Clear existing content
    const ul = document.createElement('ul');
    ul.classList.add('list');
    this.items.forEach((item) => {
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
      ul.appendChild(li);
    });
    this.container.appendChild(ul);
  }
}
