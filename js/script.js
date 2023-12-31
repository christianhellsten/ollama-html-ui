import { App } from './App.js'
import { Chat } from './models/Chat.js'

async function initialize () {
  await Chat.initialize()
}

initialize().then(() => {
  App.run()
})
