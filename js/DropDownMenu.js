export class DropDownMenu {
  constructor() {
    this.buttonSelector = '.drop-down-menu';
    this.dropDownMenus = document.querySelectorAll(this.buttonSelector);
    this.init();
  }

  init() {
    // Add a click listener to the whole document
    document.addEventListener('click', (event) => {
      // Check if the clicked element or any of its parents has the 'drop-down-menu' class
      const menuElement = event.target.closest(this.buttonSelector);
      if (menuElement) {
        const dropDownMenu = menuElement.querySelector('.drop-down-menu-items');
        if (dropDownMenu) {
          this.toggleMenu(dropDownMenu);
        }
      }
    });
  }

  toggleMenu(menu) {
    menu.classList.toggle('hidden');
    menu.classList.toggle('visible');
  }
}
