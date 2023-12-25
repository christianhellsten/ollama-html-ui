import { debounce } from './debounce.js'
import { Event } from './Event.js'
import { ChatList } from './ChatList.js'
import { LocalStorage } from './models/LocalStorage.js'

export class Sidebar {
  constructor (chats) {
    this.chats = chats
    this.settings = new LocalStorage()
    this.chatList = new ChatList(this.chats)
    this.element = document.getElementById('sidebar')
    this.newChatButton = this.element.querySelector('#new-chat-button')
    this.clearButton = this.element.querySelector('#clear-button')
    this.hamburgerButton = document.getElementById('hamburger-menu')
    this.searchButton = document.getElementById('search-button')
    this.searchRow = document.getElementById('search-row')
    this.searchInput = document.getElementById('search-input')
    if (this.settings.get('sidebar-collapsed') === true) {
      this.element.classList.add('collapsed')
    }
    this.bindEventListeners()
  }

  render () {
    this.chatList.render()
  }

  bindEventListeners () {
    Event.listen('chatSelected', this.handleChatSelected)
    this.searchButton.addEventListener('click', this.toggleSearch.bind(this))
    this.searchInput.addEventListener('keypress', debounce(this.performSearch.bind(this), 50))
    this.searchInput.addEventListener('keyup', debounce(this.performSearch.bind(this), 50))
    this.newChatButton.addEventListener('click', this.handleNewChat.bind(this))
    this.clearButton.addEventListener('click', this.handleClear.bind(this))
    this.hamburgerButton.addEventListener('click', this.toggle.bind(this))
  }

  // TODO: Fix
  handleChatSelected = (chat) => {
    const listItem = this.element.querySelector(`chat${chat.id}`)
    if (listItem) {
      listItem.scrollIntoView({
        behavior: 'smooth',
        block: 'start', // "start" will bring the top of the element into view
        inline: 'nearest' // "nearest" will scroll to the nearest edge if partially visible
      })
    }
  }

  toggleSearch () {
    const searchRow = document.getElementById('search-row')
    searchRow.classList.toggle('hidden')
    this.searchInput.focus()
  }

  performSearch (event) {
    function escapeRegExp (string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // Escapes special characters
    }

    const query = escapeRegExp(this.searchInput.value.trim()).replace(/\s+/g, '.*')
    const regex = new RegExp(query, 'i') // 'i' for case-insensitive matching
    const chatItems = this.element.querySelectorAll('.chat-list-item')
    chatItems.forEach(function (item) {
      const title = item.textContent.toLowerCase()
      const match = regex.test(title)
      // console.log(`Search ${regex} ${title}`)
      if (match) {
        item.classList.remove('hidden')
      } else {
        item.classList.add('hidden')
      }
    })
  }

  toggle () {
    this.element.classList.toggle('collapsed')
    if (this.element.classList.contains('collapsed')) {
      this.settings.set('sidebar-collapsed', true)
    } else {
      this.settings.set('sidebar-collapsed', false)
    }
  }

  handleNewChat () {
    this.chats.add(null, '')
  }

  handleClear () {
    this.chats.clearData()
    this.chatList.render()
  }
}
