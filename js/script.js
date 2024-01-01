import { App } from './App.js';
import { Chat } from './models/Chat.js';
import { ChatMessage } from './models/ChatMessage.js';

// TODO: refactor
async function initialize() {
  await Chat.initialize();
  await ChatMessage.initialize();
}

initialize().then(() => {
  App.run();
});
