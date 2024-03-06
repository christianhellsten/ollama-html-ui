export class Tabs {
  constructor (containerSelector) {
    this.container = document.querySelector(containerSelector)
    this.buttons = this.container.querySelectorAll('.tab-button')
    this.contents = document.querySelectorAll('.tab-content')

    this.buttons.forEach(button => {
      button.addEventListener('click', () => {
        this.showTab(button.getAttribute('data-tab'))
      })
    })

    this.showTab(this.buttons[0].getAttribute('data-tab'))
  }

  showTab (tabId) {
    this.contents.forEach(content => {
      content.style.display = 'none'
    })

    this.buttons.forEach(button => {
      button.classList.remove('active')
    })

    const tabContent = document.getElementById(tabId)
    const tabButton = this.container.querySelector(`[data-tab="${tabId}"]`)

    if (tabContent && tabButton) {
      tabContent.style.display = 'block'
      tabButton.classList.add('active')
    }
  }
}
