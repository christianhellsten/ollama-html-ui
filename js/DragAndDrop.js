export class DragAndDrop {
  constructor(selector) {
    this.listItems = document.querySelectorAll(selector);
    this.draggedItem = null;
    this.initializeDragAndDrop();
  }

  initializeDragAndDrop() {
    this.listItems.forEach((item) => {
      item.addEventListener('dragstart', this.handleDragStart.bind(this, item));
      item.addEventListener('dragover', this.handleDragOver.bind(this));
      item.addEventListener('drop', this.handleDrop.bind(this, item));
      item.addEventListener('dragend', this.handleDragEnd.bind(this));
    });
  }

  handleDragStart(item) {
    this.draggedItem = item;
  }

  handleDragOver(e) {
    e.preventDefault();
  }

  handleDrop(item) {
    if (item !== this.draggedItem) {
      let currentHTML = item.innerHTML;
      item.innerHTML = this.draggedItem.innerHTML;
      this.draggedItem.innerHTML = currentHTML;
      console.debug('dnd drop');
    }
  }

  handleDragEnd() {
    this.draggedItem = null;
  }
}
