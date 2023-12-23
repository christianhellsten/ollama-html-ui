export class DropDownMenu {
  constructor () {
    const buttonSelector = '.drop-down-menu'
    this.dropDownMenus = document.querySelectorAll(buttonSelector)
    this.init()
  }

  init () {
    this.dropDownMenus.forEach(menu => {
      console.log('adf')
      const button = menu.querySelector('button')
      const dropDownMenu = menu.querySelector('.drop-down-menu-items')

      if (dropDownMenu) {
        button.addEventListener('click', () => this.toggleMenu(dropDownMenu))
      }
    })
  }

  toggleMenu (menu) {
    menu.classList.toggle('hidden')
    menu.classList.toggle('visible')
  }
}
