export class List {
  constructor (containerId, items) {
    this.container = document.getElementById(containerId)
    this.items = items
    this.render()
    this.clickHandler = null
  }

  onClick (handler) {
    this.clickHandler = handler
    return this // Allow chaining
  }

  render () {
    this.container.innerHTML = '' // Clear existing content
    const ul = document.createElement('ul')
    ul.classList.add('list')

    this.items.forEach(item => {
      const li = document.createElement('li')
      li.classList.add('list-item')
      li.textContent = item
      li.item = item
      li.addEventListener('click', () => {
        if (this.clickHandler) {
          this.clickHandler(li.item)
        }
      })
      ul.appendChild(li)
    })

    this.container.appendChild(ul)
  }
}
