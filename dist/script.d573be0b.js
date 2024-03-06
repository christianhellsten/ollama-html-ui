// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/UINotification.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UINotification = void 0;
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

// Show all uncaught errors as UI notifications
/*
window.onerror = function (message, source, lineno, colno, error) {
  const errorDetails = `${message} at ${source}:${lineno}:${colno}`;
  UINotification.show(errorDetails, 'error');
  return true;
};
*/

class UINotification {
  constructor(message, type) {
    const id = simpleHash(JSON.stringify(message));
    this.type = type;
    this.domId = `notification-${id}`;
    this.container = document.body;
    this.template = document.getElementById('notification-template').content;
    this._bindEventListeners();
  }
  _bindEventListeners() {
    window.addEventListener('keydown', event => {
      console.log('adfadsf');
      if (event.key === 'Escape') {
        this.hide();
      }
    });
  }
  static show(message, type) {
    const notification = new UINotification(message, type);
    notification.show(message);
  }
  static initialize() {
    // Store the original console.error function
    const originalConsoleError = console.error;

    // Override console.error
    console.error = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      UINotification.show(args);
      // Call the original console.error with all arguments
      originalConsoleError.apply(console, args);
    };
  }
  static handleApplicationError(error) {
    console.debug('caught error');
    console.error(error);
    UINotification.show(error);
  }
  show(message) {
    // Clone the template
    const clone = this.template.cloneNode(true);

    // Find the root element of the notification in the clone
    const notificationElement = clone.querySelector('.notification');
    if (!notificationElement) {
      console.error('Notification root element not found in template');
      return;
    }

    // Set the message
    clone.querySelector('.notification-message').textContent = message;
    notificationElement.id = this.domId; // Set ID on the actual element, not the fragment
    // Add type, for example, error
    if (this.type) {
      notificationElement.classList.add(`notification-${this.type}`);
    }

    // Add close functionality
    const closeButton = clone.querySelector('.close-notification-button');
    closeButton.onclick = () => this.hide();

    // Don't show the same notification twice
    if (!document.getElementById(this.domId)) {
      // Append to the container and display
      this.container.appendChild(clone);
    }
  }
  hide() {
    document.getElementById(this.domId)?.remove();
  }
}
exports.UINotification = UINotification;
},{}],"js/models/Settings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Settings = void 0;
class Settings {
  // Static method to set a value in localStorage
  static set(key, value) {
    try {
      const stringValue = JSON.stringify(value);
      localStorage.setItem(key, stringValue);
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  // Static method to get a value from localStorage
  static get(key) {
    let defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    try {
      const value = localStorage.getItem(key);
      return value !== null ? JSON.parse(value) : defaultValue;
    } catch (e) {
      console.error('Error reading from localStorage', e);
      return defaultValue;
    }
  }

  // Static method to remove a value from localStorage
  static remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing from localStorage', e);
    }
  }
  static getUrl(uri) {
    try {
      const baseUrl = Settings.get('url');
      if (uri) {
        return new URL(uri, baseUrl).href;
      } else {
        return baseUrl;
      }
    } catch (error) {
      return null;
    }
  }
  static setUrl(url) {
    Settings.set('url', url);
  }
  static getModel() {
    return Settings.get('model');
  }
  static setModel(model) {
    Settings.set('model', model);
  }
  static getSystemPrompt() {
    return Settings.get('system-prompt');
  }
  static setSystemPrompt(systemPrompt) {
    if (systemPrompt === '') {
      systemPrompt = null;
    }
    Settings.set('system-prompt', systemPrompt);
  }
  static getModelParameters() {
    return Settings.get('model-parameters');
  }
  static setModelParameters(modelParameters) {
    if (modelParameters === '') {
      modelParameters = null;
    }
    Settings.set('model-parameters', modelParameters);
  }
  static getCurrentChatId() {
    return Settings.get('currentChatId');
  }
  static setCurrentChatId(chatId) {
    if (chatId === undefined) {
      chatId = null;
    }
    Settings.set('currentChatId', chatId);
  }
}
exports.Settings = Settings;
},{}],"js/Event.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Event = void 0;
class Event {
  static listen(eventName, handler) {
    window.addEventListener(eventName, event => {
      handler(event.detail);
    });
  }
  static emit(eventName, data) {
    let log = `${eventName}`;
    if (data?.id) {
      log += ` id: ${data.id}`;
    }
    console.log(log);
    const event = new CustomEvent(eventName, {
      detail: data || {},
      bubbles: true // This makes the event bubble up through the DOM
    });
    window.dispatchEvent(event);
  }
}
exports.Event = Event;
},{}],"js/Dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOM = void 0;
class DOM {
  static showElement(element) {
    element.classList.remove('hidden');
    return this;
  }
  static hideElement(element) {
    element.classList.add('hidden');
    return this;
  }
  static enableInput(element) {
    element.removeAttribute('disabled');
    return this;
  }
  static disableInput(element) {
    element.setAttribute('disabled', 'disabled');
    return this;
  }
}
exports.DOM = DOM;
},{}],"js/debounce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = debounce;
function debounce(func, wait) {
  let timeout;
  return function funcWrapper() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
},{}],"js/Database.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Database = void 0;
class Database {
  constructor(dbName, objectStores, migrations) {
    this.dbName = dbName;
    this.objectStores = objectStores;
    this.dbConnection = null; // Initialized in open
    this.migrations = migrations;
  }
  async open() {
    if (this.dbConnection) {
      throw new Error('Connection already open');
    }
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.migrations.version);
      request.onerror = event => reject(event.target.error);
      request.onupgradeneeded = event => {
        const db = event.target.result;
        const transaction = event.currentTarget.transaction;
        this.migrations.upgrade(db, transaction, event.oldVersion);
      };
      request.onsuccess = event => {
        this.dbConnection = event.target.result;
        resolve(this.dbConnection);
      };
    });
  }
  async transaction(storeName, mode) {
    return this.dbConnection.transaction([storeName], mode).objectStore(storeName);
  }
  async add(storeName, data) {
    const store = await this.transaction(storeName, 'readwrite');
    return this.handleRequest('add', store.add(data));
  }
  async get(storeName, id) {
    const store = await this.transaction(storeName, 'readonly');
    return this.handleRequest('get', store.get(id));
  }
  async put(storeName, data) {
    const store = await this.transaction(storeName, 'readwrite');
    return this.handleRequest('put', store.put(data));
  }
  async delete(storeName, id) {
    const store = await this.transaction(storeName, 'readwrite');
    return this.handleRequest('delete', store.delete(id));
  }
  async getAll(storeName) {
    const store = await this.transaction(storeName, 'readwrite');
    return this.handleRequest('getAll', store.getAll());
  }
  async clear(storeName) {
    const store = await this.transaction(storeName, 'readwrite');
    return this.handleRequest('deleteAll', store.clear());
  }
  handleRequest(type, request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = event => {
        const error = `Database ${type} operation failed: ${event.target.error.message}`;
        reject(new Error(JSON.stringify(error)));
      };
    });
  }
}
exports.Database = Database;
},{}],"js/Migrations.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Migrations = void 0;
class Migrations {
  static version = 2;
  static upgrade(database, transaction, oldVersion) {
    console.debug(`Migration needed. Old version ${oldVersion}. New version ${this.version}.`);
    const funcName = `upgradeToVersion${this.version}`;
    const upgradeFunc = this[funcName];
    if (!upgradeFunc) {
      throw new Error(`Upgrade function missing for ${funcName}`);
    }
    if (this.version >= oldVersion) {
      upgradeFunc({
        database,
        transaction
      });
    }
  }
  static upgradeToVersion2(context) {
    // Create chats
    context.database.createObjectStore('chats', {
      keyPath: 'id',
      autoIncrement: true
    });
    // Create chat_messages
    const chatMessages = context.database.createObjectStore('chat_messages', {
      keyPath: 'id',
      autoIncrement: true
    });
    chatMessages.createIndex('by_chat', 'chatId', {
      unique: false
    });
  }
}
exports.Migrations = Migrations;
},{}],"js/models/BaseModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseModel = void 0;
var _Database = require("../Database.js");
var _Migrations = require("../Migrations.js");
class BaseModel {
  constructor(data) {
    Object.assign(this, data);
  }
  static async database(name, store) {
    this.dbName = name;
    this.storeName = store;
    this.db = new _Database.Database(name, [store], _Migrations.Migrations);
    await this.db.open();
  }
  static async transaction(mode) {
    return await this.db.transaction(this.storeName, mode);
  }
  async transaction(mode) {
    return await this.constructor.transaction(mode);
  }
  async create() {
    const key = await this.constructor.db.add(this.constructor.storeName, this);
    if (!this.id) {
      this.id = key;
    }
    return this;
  }
  async save() {
    return await this.constructor.db.put(this.constructor.storeName, this);
  }
  async delete() {
    return await this.constructor.db.delete(this.constructor.storeName, this.id);
  }
  static async get(id) {
    const data = await this.db.get(this.storeName, id);
    return new this(data);
  }
  static async clear() {
    return await this.db.clear(this.storeName);
  }

  // TODO: sorting and selecting only certain attributes
  static async getAll() {
    const records = await this.db.getAll(this.storeName);
    return records.map(data => new this(data));
  }

  /**
   * Retrieves all objects associated with a given ID and index.
   *
   * @param {number|string} chatId - The ID of the chat.
   * @returns {Promise<Array>} A promise that resolves to an array.
   */
  static async getAllByIndexAndId(indexName, id) {
    // Open a transaction and access the messages store
    const transaction = await this.transaction('readonly');

    // Use an index to find objects with the specified id
    const index = transaction.index(indexName);
    const request = index.getAll(id);
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        // Convert the result into instances
        const messages = request.result.map(data => new this(data));
        resolve(messages);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }
}
exports.BaseModel = BaseModel;
},{"../Database.js":"js/Database.js","../Migrations.js":"js/Migrations.js"}],"js/models/ChatMessage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatMessage = void 0;
var _BaseModel = require("./BaseModel.js");
class ChatMessage extends _BaseModel.BaseModel {
  static async initialize() {
    await this.database('ChatApp', 'chat_messages');
  }
  static async getAllByChatId(chatId) {
    return this.getAllByIndexAndId('by_chat', chatId);
  }
}
exports.ChatMessage = ChatMessage;
},{"./BaseModel.js":"js/models/BaseModel.js"}],"js/models/Chat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chat = void 0;
var _BaseModel = require("./BaseModel.js");
var _ChatMessage = require("./ChatMessage.js");
class Chat extends _BaseModel.BaseModel {
  async addMessage(data) {
    data.chatId = this.id;
    await new _ChatMessage.ChatMessage(data).create();
  }
  async getMessages() {
    const messages = await _ChatMessage.ChatMessage.getAllByChatId(this.id);
    this.messages = messages;
    return this.messages;
  }
  static async initialize() {
    await this.database('ChatApp', ['chats']);
  }
  static async clear() {
    await _ChatMessage.ChatMessage.clear();
    await super.clear();
  }
  static async get(id) {
    const chat = await super.get(id);
    if (chat) {
      // Fetch all messages for this chat
      const messages = await _ChatMessage.ChatMessage.getAllByChatId(id);
      chat.messages = messages;
    }
    return chat;
  }
  static async delete(id) {
    // Delete the chat instance
    await super.delete(id);

    // Delete all associated messages
    const messages = await _ChatMessage.ChatMessage.getAllByChatId(id);
    for (const message of messages) {
      await message.delete();
    }
  }
}
exports.Chat = Chat;
},{"./BaseModel.js":"js/models/BaseModel.js","./ChatMessage.js":"js/models/ChatMessage.js"}],"js/AppController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppController = void 0;
var _Event = require("./Event.js");
var _Chat = require("./models/Chat.js");
var _ChatMessage = require("./models/ChatMessage.js");
var _Settings = require("./models/Settings.js");
class AppController {
  static async updateChat(chat, data) {
    Object.assign(chat, data);
    await chat.save();
    // TODO: Move to BaseModel
    _Event.Event.emit('chatUpdated', chat);
  }
  static async createChat(data) {
    if (!data) {
      data = {};
    }
    if (!data.title) {
      data.title = 'Untitled';
    }
    if (!data.model) {
      data.model = _Settings.Settings.getModel();
    }
    const chat = await new _Chat.Chat(data).create();
    _Settings.Settings.setCurrentChatId(chat.id);
    _Event.Event.emit('chatCreated', chat);
    _Event.Event.emit('chatSelected', chat);
    return chat;
  }
  static async deleteChatMessage(messageId) {
    const message = await _ChatMessage.ChatMessage.get(messageId);
    message.delete();
  }
  static async deleteChat(chat) {
    await chat.delete();
    if (_Settings.Settings.getCurrentChatId() === chat.id) {
      _Settings.Settings.setCurrentChatId(null);
    }
    _Event.Event.emit('chatDeleted', chat);
  }
  static async getCurrentChat() {
    const chatId = this.getCurrentChatId();
    if (chatId) {
      return await _Chat.Chat.get(chatId);
    }
    return null;
  }
  static getCurrentChatId() {
    return _Settings.Settings.get('currentChatId');
  }
  static async setCurrentChat(chat) {
    _Settings.Settings.setCurrentChatId(chat.id);
    _Event.Event.emit('chatSelected', chat);
  }
  static async setCurrentChatId(chatId) {
    const chat = await _Chat.Chat.get(chatId);
    if (chat) {
      await this.setCurrentChat(chat);
    }
  }
  static async clearChats() {
    _Settings.Settings.setCurrentChatId(null);
    await _Chat.Chat.clear();
    _Event.Event.emit('chatsCleared');
  }
}
exports.AppController = AppController;
},{"./Event.js":"js/Event.js","./models/Chat.js":"js/models/Chat.js","./models/ChatMessage.js":"js/models/ChatMessage.js","./models/Settings.js":"js/models/Settings.js"}],"js/ChatListItem.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatListItem = void 0;
var _AppController = require("./AppController.js");
class ChatListItem {
  constructor(chat, chatList, selected) {
    this.chat = chat;
    this.chatList = chatList;
    this.content = document.getElementById('chat-list-item-template').content.cloneNode(true);
    this.element = this.content.querySelector('.chat-list-item');
    this.element.title = this.chat.title;
    this.element.data = {
      id: this.chat.id
    };
    this.element.classList.add(`chat${this.chat.id}`);
    if (selected === true) {
      this.element.classList.add('selected');
      // this.content.querySelector('.icon-selected').classList.remove('hidden')
    }
    this.setTitle();
    this.bindEventListeners();
  }
  render() {}
  bindEventListeners() {
    this.element.addEventListener('mouseover', this.onMouseover.bind(this));
    this.element.addEventListener('mouseout', this.onMouseout.bind(this));
    this.element.addEventListener('click', this.onClick.bind(this));
    this.element.querySelector('.list-item-delete').addEventListener('click', this.deleteChat.bind(this));
  }
  onMouseover() {
    this.element.classList.add('hover');
  }
  onMouseout() {
    this.element.classList.remove('hover');
  }
  onClick() {
    this.chatList.selectChat(this.chat.id);
  }
  setTitle() {
    const chatTitle = this.content.querySelector('.chat-title');
    chatTitle.textContent = this.chat.title;
  }
  deleteChat() {
    _AppController.AppController.deleteChat(this.chat);
    this.element.remove();
  }
}
exports.ChatListItem = ChatListItem;
},{"./AppController.js":"js/AppController.js"}],"js/DragAndDrop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragAndDrop = void 0;
class DragAndDrop {
  constructor(selector) {
    this.listItems = document.querySelectorAll(selector);
    this.draggedItem = null;
    this.initializeDragAndDrop();
  }
  initializeDragAndDrop() {
    this.listItems.forEach(item => {
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
exports.DragAndDrop = DragAndDrop;
},{}],"js/ChatList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatList = void 0;
var _Event = require("./Event.js");
var _ChatListItem = require("./ChatListItem.js");
var _DragAndDrop = require("./DragAndDrop.js");
var _Chat = require("./models/Chat.js");
var _AppController = require("./AppController.js");
class ChatList {
  constructor() {
    this.element = document.getElementById('chat-list');
    this.template = document.getElementById('chat-list-item-template').content;
    this.bindEventListeners();
    _AppController.AppController.getCurrentChat().then(chat => {
      this.chat = chat;
    });
  }
  bindEventListeners() {
    _Event.Event.listen('chatCreated', this.handleChatCreated.bind(this));
    _Event.Event.listen('chatDeleted', this.handleChatDeleted.bind(this));
    _Event.Event.listen('chatsCleared', this.handleChatsCleared.bind(this));
    _Event.Event.listen('chatUpdated', this.handleChatUpdated.bind(this));
    _Event.Event.listen('chatSelected', this.handleChatSelected.bind(this));
  }
  async selectChat(chatId) {
    await _AppController.AppController.setCurrentChatId(chatId);
  }
  handleChatCreated(chat) {
    this.appendChat(chat, true);
  }
  handleChatDeleted(chat) {
    if (this.chat?.id === chat.id) {
      this.chat = null;
    }
    this.element.querySelector(`.chat${chat.id}`)?.remove();
  }
  handleChatsCleared() {
    const elements = this.element.querySelectorAll('.chat-list-item');
    elements.forEach(element => element.remove());
  }
  handleChatUpdated(chat) {
    const listElement = this.element.querySelector(`.chat${chat.id} .chat-title`);
    if (listElement) {
      listElement.textContent = chat.title;
    }
  }
  handleChatSelected(chat) {
    if (this.chat) {
      const previousListElement = this.element.querySelector(`.chat${this.chat.id}`);
      if (previousListElement) {
        previousListElement.classList.remove('selected');
      }
    }
    const newListElement = this.element.querySelector(`.chat${chat.id}`);
    if (newListElement) {
      newListElement.classList.add('selected');
    }
    // Remember selected chat
    this.chat = chat;
  }
  render() {
    const currentChatId = _AppController.AppController.getCurrentChatId();
    this.element.innerHTML = '';
    _Chat.Chat.getAll().then(chats => {
      chats.forEach(chat => {
        const selected = chat.id === currentChatId;
        this.appendChat(chat, selected);
      });
      new _DragAndDrop.DragAndDrop('.chat-list-item');
    });
  }
  appendChat(chat, selected) {
    const chatListItem = new _ChatListItem.ChatListItem(chat, this, selected);
    this.element.appendChild(chatListItem.element);
    return chatListItem;
  }
}
exports.ChatList = ChatList;
},{"./Event.js":"js/Event.js","./ChatListItem.js":"js/ChatListItem.js","./DragAndDrop.js":"js/DragAndDrop.js","./models/Chat.js":"js/models/Chat.js","./AppController.js":"js/AppController.js"}],"js/models/LocalStorage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalStorage = void 0;
class LocalStorage {
  // Set a value in localStorage
  set(key, value) {
    try {
      const stringValue = JSON.stringify(value);
      localStorage.setItem(key, stringValue);
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  // Get a value from localStorage, return defaultValue if key doesn't exist
  get(key) {
    let defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    try {
      const value = localStorage.getItem(key);
      return value !== null ? JSON.parse(value) : defaultValue;
    } catch (e) {
      console.error('Error reading from localStorage', e);
      return defaultValue;
    }
  }

  // Remove a value from localStorage
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing from localStorage', e);
    }
  }
}
exports.LocalStorage = LocalStorage;
},{}],"js/Sidebar.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sidebar = void 0;
var _debounce = require("./debounce.js");
var _Event = require("./Event.js");
var _Chat = require("./models/Chat.js");
var _AppController = require("./AppController.js");
var _ChatList = require("./ChatList.js");
var _LocalStorage = require("./models/LocalStorage.js");
class Sidebar {
  constructor() {
    this.settings = new _LocalStorage.LocalStorage();
    this.chatList = new _ChatList.ChatList();
    this.element = document.getElementById('sidebar');
    this.newChatButton = this.element.querySelector('#new-chat-button');
    this.clearButton = this.element.querySelector('#clear-button');
    this.hamburgerButton = document.getElementById('hamburger-menu');
    this.searchButton = document.getElementById('search-button');
    this.searchRow = document.getElementById('search-row');
    this.searchInput = document.getElementById('search-input');
    if (this.settings.get('sidebar-collapsed') === true) {
      this.element.classList.add('collapsed');
    }
    this.bindEventListeners();
  }
  render() {
    this.chatList.render();
  }
  bindEventListeners() {
    _Event.Event.listen('chatSelected', this.handleChatSelected);
    this.searchButton.addEventListener('click', this.toggleSearch.bind(this));
    this.searchInput.addEventListener('keypress', (0, _debounce.debounce)(this.performSearch.bind(this), 50));
    this.searchInput.addEventListener('keyup', (0, _debounce.debounce)(this.performSearch.bind(this), 50));
    this.newChatButton.addEventListener('click', this.handleNewChat.bind(this));
    this.clearButton.addEventListener('click', this.handleClear.bind(this));
    this.hamburgerButton.addEventListener('click', this.toggle.bind(this));
  }

  // TODO: Fix
  handleChatSelected = chat => {
    const listItem = this.element.querySelector(`chat${chat.id}`);
    if (listItem) {
      listItem.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        // "start" will bring the top of the element into view
        inline: 'nearest' // "nearest" will scroll to the nearest edge if partially visible
      });
    }
  };
  toggleSearch() {
    const searchRow = document.getElementById('search-row');
    searchRow.classList.toggle('hidden');
    this.searchInput.focus();
  }
  performSearch() {
    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapes special characters
    }
    const query = escapeRegExp(this.searchInput.value.trim()).replace(/\s+/g, '.*');
    const queryContent = query.length > 2; // Nobody wants to query content based on one character?
    const regex = new RegExp(query, 'i'); // 'i' for case-insensitive matching
    console.log(`Search ${query}`);
    _Chat.Chat.getAll().then(chats => {
      const matches = chats.filter(chat => {
        let match = regex.test(chat.title);
        if (queryContent) {
          match ||= regex.test(chat.content);
        }
        return match;
      }).map(chat => chat.id);
      this.element.querySelectorAll('.chat-list-item').forEach(item => {
        if (matches.includes(item.data.id)) {
          // Now matches the type
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  }
  toggle() {
    this.element.classList.toggle('collapsed');
    this.hamburgerButton.classList.toggle('collapsed');
    if (this.element.classList.contains('collapsed')) {
      this.settings.set('sidebar-collapsed', true);
    } else {
      this.settings.set('sidebar-collapsed', false);
    }
  }
  async handleNewChat() {
    await _AppController.AppController.createChat();
  }
  async handleClear() {
    await _AppController.AppController.clearChats();
  }
}
exports.Sidebar = Sidebar;
},{"./debounce.js":"js/debounce.js","./Event.js":"js/Event.js","./models/Chat.js":"js/models/Chat.js","./AppController.js":"js/AppController.js","./ChatList.js":"js/ChatList.js","./models/LocalStorage.js":"js/models/LocalStorage.js"}],"js/CopyButton.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CopyButton = void 0;
class CopyButton {
  constructor() {
    document.addEventListener('click', function (event) {
      // Check if the clicked element has the class 'copy-button'
      if (event.target.classList.contains('copy-button')) {
        const targetSelector = event.target.getAttribute('data-target');
        const textToCopy = document.getElementById(targetSelector).innerText;
        // Create a temporary textarea element
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);

        // Select the text and copy it
        textarea.select();
        document.execCommand('copy');

        // Remove the temporary textarea
        document.body.removeChild(textarea);

        // Optional: Display a message or change the button text/content
        alert('Text copied to clipboard');
      }
    });
  }
}
exports.CopyButton = CopyButton;
},{}],"js/OllamaApi.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OllamaApi = void 0;
class OllamaApi {
  constructor() {
    this.abortController = null;
  }
  async send(url, data, onResponse, onError, onDone) {
    const request = {
      data
    };
    try {
      const response = await this.postChatMessage(url, data);
      await this.handleResponse(request, response, onResponse, onDone);
    } catch (error) {
      onError(request, error);
    }
  }
  async postChatMessage(url, data) {
    this.abortController = new AbortController();
    const {
      signal
    } = this.abortController;
    const response = await fetch(url, {
      signal,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`${url} failed with status ${response.status}`);
    }
    return response;
  }
  async handleResponse(request, response, onResponse, onDone) {
    const reader = response.body.getReader();
    let partialLine = '';
    var isRequestDone = false;
    while (!isRequestDone) {
      const {
        done,
        value
      } = await reader.read();
      if (done) {
        onDone(request, response);
        isRequestDone = true;
        continue;
      }
      const textChunk = new TextDecoder().decode(value);
      const lines = (partialLine + textChunk).split('\n');
      partialLine = lines.pop();
      lines.forEach(line => {
        const responseData = JSON.parse(line);
        if (line.trim()) {
          // TODO: Move this line:
          this.printResponseStats(responseData);
          onResponse(request, responseData.message.content);
        }
      });
    }
    if (partialLine.trim()) {
      onResponse(request, partialLine);
    }
  }
  abort() {
    if (this.abortController) {
      this.abortController.abort();
    }
  }
  printResponseStats(data) {
    if (!data.total_duration) {
      return;
    }
    // Convert nanoseconds to seconds for durations
    const totalDurationInSeconds = data.total_duration / 1e9;
    const loadDurationInSeconds = data.load_duration / 1e9;
    const promptEvalDurationInSeconds = data.prompt_eval_duration / 1e9;
    const responseEvalDurationInSeconds = data.eval_duration / 1e9;

    // Calculate tokens per second (token/s)
    const tokensPerSecond = data.eval_count / responseEvalDurationInSeconds;
    const output = `
Model: ${data.model}
Created At: ${data.created_at}
Total Duration (s): ${totalDurationInSeconds.toFixed(2)}
Load Duration (s): ${loadDurationInSeconds.toFixed(2)}
Prompt Evaluation Count: ${data.prompt_eval_count}
Prompt Evaluation Duration (s): ${promptEvalDurationInSeconds.toFixed(2)}
Response Evaluation Count: ${data.eval_count}
Response Evaluation Duration (s): ${responseEvalDurationInSeconds.toFixed(2)}
Tokens Per Second: ${tokensPerSecond.toFixed(2)} token/s
    `;
    console.log(output);
  }
  static getModels(url, onResponse) {
    if (!url) {
      return null;
    }
    return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(`Unable to fetch models from ${url}`);
      }
      return response.json();
    }).then(data => {
      onResponse(data.models);
    }).catch(error => {
      console.debug(error);
      console.error(`Please ensure the server is running at: ${url}. Error code: 39847`);
      onResponse([]);
    });
  }
}
exports.OllamaApi = OllamaApi;
},{}],"js/DownloadButton.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DownloadButton = void 0;
class DownloadButton {
  constructor() {
    document.addEventListener('click', event => {
      // Check if the clicked element has the class 'copy-button'
      if (event.target.classList.contains('download-button')) {
        // Get the index from the data-target attribute
        const targetId = event.target.getAttribute('data-target');
        this.downloadElementContent(targetId, 'chat.html');
      }
    });
  }
  downloadElementContent(elementId, filename) {
    // Get the element
    const element = document.getElementById(elementId);
    if (!element) {
      console.error('Element not found');
      return;
    }

    // Get the contents of the element
    const content = element.innerText;

    // Create a Blob with the content
    const blob = new Blob([content], {
      type: 'text/html'
    });

    // Create an anchor element and set the href to the blob
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;

    // Append the anchor to the document, trigger a click, and then remove it
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Revoke the blob URL
    URL.revokeObjectURL(a.href);
  }
}
exports.DownloadButton = DownloadButton;
},{}],"js/DropDownMenu.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropDownMenu = void 0;
class DropDownMenu {
  constructor() {
    this.buttonSelector = '.drop-down-menu';
    this.dropDownMenus = document.querySelectorAll(this.buttonSelector);
    this.init();
  }
  init() {
    // Add a click listener to the whole document
    document.addEventListener('click', event => {
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
exports.DropDownMenu = DropDownMenu;
},{}],"js/Modal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = void 0;
// Modal base class
class Modal {
  constructor(domId) {
    this.domId = domId;
    this.modal = document.getElementById(this.domId);
    this.closeButton = this.modal.querySelector('.button-close');
    this.closeButton.onclick = () => this.hide();
    this._bindEventListeners();
  }
  _bindEventListeners() {
    window.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        this.hide();
      }
    });
  }
  show() {
    this.handleShow();
  }
  hide() {
    this.handleHide();
  }
  handleShow() {
    this.modal.classList.add('show');
  }
  handleHide() {
    this.modal.classList.remove('show');
  }
}
exports.Modal = Modal;
},{}],"js/List.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.List = void 0;
class List {
  constructor(containerId, items, selected) {
    this.container = document.getElementById(containerId);
    this.items = items;
    this.selected = selected;
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
    this.items.forEach(item => {
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
exports.List = List;
},{}],"js/models/Models.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Models = void 0;
var _Event = require("../Event.js");
var _Settings = require("./Settings.js");
var _OllamaApi = require("../OllamaApi.js");
class Models {
  static models = [];
  static getUrl() {
    return _Settings.Settings.getUrl('/api/tags');
  }
  static load() {
    if (!this.getUrl()) {
      return null;
    }
    return _OllamaApi.OllamaApi.getModels(this.getUrl(), models => {
      Models.models = models;
      _Settings.Settings.set('models', Models.models);
      _Event.Event.emit('modelsLoaded', Models.models);
    });
  }
  static getAll() {
    return Models.models;
  }
  static getNames() {
    return Models.models.map(model => model.name);
  }
  static findModelByName(name) {
    return Models.models.find(model => model.name === name);
  }
}
exports.Models = Models;
},{"../Event.js":"js/Event.js","./Settings.js":"js/models/Settings.js","../OllamaApi.js":"js/OllamaApi.js"}],"js/ModelsList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModelsList = void 0;
var _List = require("./List.js");
var _Event = require("./Event.js");
var _Models = require("./models/Models.js");
class ModelsList {
  constructor(selector, selectedModel) {
    this.modelList = new _List.List(selector, _Models.Models.getNames(), selectedModel);
    this.bindEventListeners();
  }
  bindEventListeners() {
    _Event.Event.listen('modelsLoaded', this.handleModelsLoaded.bind(this));
  }
  handleModelsLoaded() {
    this.modelList.setItems(_Models.Models.getNames());
  }
  onClick(handler) {
    this.modelList.clickHandler = handler;
    return this.modelList; // Allow chaining
  }
  getSelected() {
    return this.modelList.selected;
  }
}
exports.ModelsList = ModelsList;
},{"./List.js":"js/List.js","./Event.js":"js/Event.js","./models/Models.js":"js/models/Models.js"}],"js/SettingsDialog.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsDialog = void 0;
var _Modal = require("./Modal.js");
var _UINotification = require("./UINotification.js");
var _ModelsList = require("./ModelsList.js");
var _Models = require("./models/Models.js");
var _Settings = require("./models/Settings.js");
class SettingsDialog extends _Modal.Modal {
  constructor() {
    super('settings-dialog');
    this.showButton = document.getElementById('settings-button');
    this.urlInput = document.getElementById('input-url');
    this.modelInput = document.getElementById('input-model');
    this.systemPromptInput = this.modal.querySelector('#input-system-prompt');
    this.modelParametersInput = this.modal.querySelector('#input-model-parameters');
    this.refreshModelsButton = this.modal.querySelector('.refresh-models-button');
    this.modelList = new _ModelsList.ModelsList('model-list', _Settings.Settings.getModel());
    this.bindEventListeners();
    this.loadSettings();
  }
  bindEventListeners() {
    this.urlInput.addEventListener('blur', () => {
      const value = this.urlInput.value.trim();
      _Settings.Settings.setUrl(value);
    });
    this.systemPromptInput.addEventListener('blur', () => {
      _Settings.Settings.setSystemPrompt(this.systemPromptInput.value.trim());
    });
    this.modelParametersInput.addEventListener('blur', () => {
      const value = this.modelParametersInput.value.trim();
      if (value === '') {
        return;
      }
      try {
        const parsedValue = JSON.parse(value);
        const prettyJSON = JSON.stringify(parsedValue, 2);
        _Settings.Settings.setModelParameters(parsedValue);
        this.modelParametersInput.value = prettyJSON;
        this.modelParametersInput.classList.remove('error');
      } catch (error) {
        if (error.name === 'SyntaxError') {
          this.modelParametersInput.classList.add('error');
        } else {
          console.error(error);
        }
      }
    });
    this.modelList.onClick(() => {
      _Settings.Settings.setModel(this.modelList.getSelected());
    });
    this.showButton.addEventListener('click', this.show.bind(this));
    this.refreshModelsButton.onclick = () => this.refreshModels();
    this.closeButton.onclick = () => this.hide();
  }
  show() {
    _Models.Models.load();
    this.handleShow();
  }
  refreshModels() {
    if (!_Models.Models.getUrl()) {
      _UINotification.UINotification.show('Please update the URL in the settings to continue.');
    } else {
      _Models.Models.load();
    }
  }
  loadSettings() {
    this.urlInput.value = _Settings.Settings.getUrl();
    const modelParameters = _Settings.Settings.getModelParameters();
    if (modelParameters) {
      this.modelParametersInput.value = JSON.stringify(modelParameters, 2);
    }
  }
}
exports.SettingsDialog = SettingsDialog;
},{"./Modal.js":"js/Modal.js","./UINotification.js":"js/UINotification.js","./ModelsList.js":"js/ModelsList.js","./models/Models.js":"js/models/Models.js","./models/Settings.js":"js/models/Settings.js"}],"js/ChatSettingsDialog.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatSettingsDialog = void 0;
var _AppController = require("./AppController.js");
var _Event = require("./Event.js");
var _Modal = require("./Modal.js");
var _Models = require("./models/Models.js");
var _ModelsList = require("./ModelsList.js");
class ChatSettingsDialog extends _Modal.Modal {
  constructor() {
    super('chat-settings-dialog');
    this.showButton = document.getElementById('chat-settings-button');
    this.bindEventListeners();
  }
  bindEventListeners() {
    this.showButton.addEventListener('click', this.show.bind(this));
    _Event.Event.listen('chatSelected', this.handleChatSelected.bind(this));
  }
  show() {
    _Models.Models.load().then(() => {
      _AppController.AppController.getCurrentChat().then(chat => {
        this.handleChatSelected(chat);
        this.handleShow();
      });
    });
  }
  handleChatSelected(chat) {
    this.modelList = new _ModelsList.ModelsList('chat-model-list', chat.model);
    this.modelList.onClick(async model => {
      chat.model = model;
      await chat.save();
    });
  }
}
exports.ChatSettingsDialog = ChatSettingsDialog;
},{"./AppController.js":"js/AppController.js","./Event.js":"js/Event.js","./Modal.js":"js/Modal.js","./models/Models.js":"js/models/Models.js","./ModelsList.js":"js/ModelsList.js"}],"js/Hoverable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hoverable = void 0;
class Hoverable {
  constructor(element) {
    this.element = element;
    element.hoverable = this;
    this.bindEventListeners();
  }
  bindEventListeners() {
    this.element.addEventListener('mouseover', () => this.onMouseover());
    this.element.addEventListener('mouseout', () => this.onMouseout());
  }
  onMouseover() {
    this.element.classList.add('hover');
  }
  onMouseout() {
    this.element.classList.remove('hover');
  }
}
exports.Hoverable = Hoverable;
},{}],"js/ChatTitle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatTitle = void 0;
var _Event = require("./Event.js");
var _AppController = require("./AppController.js");
class ChatTitle {
  constructor() {
    this.defaultTitle = 'Untitled';
    this.element = document.getElementById('chat-title');
    this.bindEventListeners();
    this.render();
  }
  render() {
    _AppController.AppController.getCurrentChat().then(chat => {
      this.chat = chat;
      this.setTitle(chat?.title);
    });
  }
  setTitle(title) {
    this.element.textContent = title || this.defaultTitle;
  }
  focus() {
    const hasFocus = document.activeElement === this.element;
    if (!hasFocus) {
      this.element.focus();
    }
  }
  bindEventListeners() {
    _Event.Event.listen('chatDeleted', this.handleChatDeleted.bind(this));
    _Event.Event.listen('chatSelected', this.handleChatSelected.bind(this));
    this.element.addEventListener('blur', this.handleSave.bind(this));
    this.element.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.element.blur();
      }
    });
  }
  handleChatSelected(chat) {
    this.chat = chat;
    this.setTitle(chat.title);
  }
  handleChatDeleted(chat) {
    if (chat.id === this.chat.id) {
      this.setTitle(this.defaultTitle);
    }
  }
  async handleSave() {
    let title = this.element.textContent.trim();
    if (title.length === 0) {
      title = this.defaultTitle;
      this.element.classList.add('error');
    } else {
      this.element.classList.remove('error');
    }
    const chat = await _AppController.AppController.getCurrentChat();
    if (chat) {
      await _AppController.AppController.updateChat(chat, {
        title
      });
    } else {
      await _AppController.AppController.createChat({
        title
      });
    }
  }
}
exports.ChatTitle = ChatTitle;
},{"./Event.js":"js/Event.js","./AppController.js":"js/AppController.js"}],"js/ChatForm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatForm = void 0;
// TODO: Move code here from App.js
class ChatForm {
  constructor() {
    this.chatHistory = document.getElementById('chat-history');
    this.messageInput = document.getElementById('message-input');
    this.sendButton = document.getElementById('send-button');
    this.abortButton = document.getElementById('abort-button');
  }
}
exports.ChatForm = ChatForm;
},{}],"js/ChatArea.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatArea = void 0;
var _AppController = require("./AppController.js");
var _Event = require("./Event.js");
var _Hoverable = require("./Hoverable.js");
var _ChatTitle = require("./ChatTitle.js");
var _ChatForm = require("./ChatForm.js");
class ChatArea {
  constructor() {
    this.chatTitle = new _ChatTitle.ChatTitle();
    this.chatForm = new _ChatForm.ChatForm();
    this.chatHistory = document.getElementById('chat-history');
    this.messageInput = document.getElementById('message-input');
    this.editChatButton = document.getElementById('edit-chat-button');
    this.scrollToTopButton = document.getElementById('scroll-to-top-button');
    this.scrollToEndButton = document.getElementById('scroll-to-end-button');
    this.deleteChatButton = document.getElementById('delete-chat-button');
    _AppController.AppController.getCurrentChat().then(chat => {
      this.chat = chat;
      this.render();
    });
    this.bindEventListeners();
  }
  render() {
    // Clear history view
    this.chatHistory.innerText = '';
    // Render chat history
    this.chat?.getMessages()?.then(messages => {
      messages.forEach(message => {
        this.createMessageDiv(message);
      });
    });
    this.scrollToEnd();
    this.messageInput.focus();
  }
  bindEventListeners() {
    _Event.Event.listen('chatSelected', this.handleChatSelected.bind(this));
    _Event.Event.listen('chatDeleted', this.handleChatDeleted.bind(this));
    this.scrollToTopButton.addEventListener('click', this.scrollToTop.bind(this));
    this.scrollToEndButton.addEventListener('click', this.scrollToEnd.bind(this));
    this.editChatButton.addEventListener('click', this.handleEditChat.bind(this));
    this.deleteChatButton.addEventListener('click', this.handleDeleteChat.bind(this));
  }
  createMessageDiv(message) {
    const role = message.role;
    const content = message.content;
    // Get the template and its content
    const template = document.getElementById('chat-message-template');
    const messageClone = template.content.cloneNode(true);
    // Find the div and span elements within the cloned template
    const messageDiv = messageClone.querySelector('.chat-message');
    const textSpan = messageClone.querySelector('.chat-message-text');
    const deleteButton = messageClone.querySelector('.delete-chat-message-button');

    // Set the class for role and text content
    messageDiv.classList.add(`${role}-chat-message`);
    textSpan.textContent = content;
    messageDiv.spellcheck = false;

    // Append to chatHistory and adjust scroll
    this.chatHistory.appendChild(messageDiv);
    messageDiv.dataset['id'] = message.id;
    new _Hoverable.Hoverable(messageDiv);
    deleteButton.addEventListener('click', async () => {
      await _AppController.AppController.deleteChatMessage(message.id);
      messageDiv.remove();
    });
    return messageDiv;
  }
  handleChatDeleted(chat) {
    if (chat.id === this.chat?.id) {
      this.chat = null;
    } else {
      this.chat = chat;
    }
    this.render();
  }
  handleChatSelected(chat) {
    this.chat = chat;
    this.render();
  }
  handleEditChat() {
    this.chatTitle.focus();
    event.stopPropagation();
  }
  async handleDeleteChat() {
    const chat = await _AppController.AppController.getCurrentChat();
    if (chat) {
      await _AppController.AppController.deleteChat(chat);
    }
  }
  scrollToTop() {
    this.chatHistory.scrollTop = 0;
  }
  scrollToEnd() {
    this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
  }
}
exports.ChatArea = ChatArea;
},{"./AppController.js":"js/AppController.js","./Event.js":"js/Event.js","./Hoverable.js":"js/Hoverable.js","./ChatTitle.js":"js/ChatTitle.js","./ChatForm.js":"js/ChatForm.js"}],"js/App.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;
var _UINotification = require("./UINotification.js");
var _Settings = require("./models/Settings.js");
var _Event = require("./Event.js");
var _Dom = require("./Dom.js");
var _Sidebar = require("./Sidebar.js");
var _AppController = require("./AppController.js");
var _CopyButton = require("./CopyButton.js");
var _OllamaApi = require("./OllamaApi.js");
var _DownloadButton = require("./DownloadButton.js");
var _DropDownMenu = require("./DropDownMenu.js");
var _SettingsDialog = require("./SettingsDialog.js");
var _ChatSettingsDialog = require("./ChatSettingsDialog.js");
var _ChatArea = require("./ChatArea.js");
// import { MarkdownFormatter } from './MarkdownFormatter.js'

// TODO: Review and refactor
class App {
  static run() {
    _UINotification.UINotification.initialize();
    const app = new App();
    return app;
  }
  constructor() {
    this.sidebar = new _Sidebar.Sidebar();
    this.chatArea = new _ChatArea.ChatArea();
    this.ollamaApi = new _OllamaApi.OllamaApi();
    this.settingsDialog = new _SettingsDialog.SettingsDialog();
    this.chatSettingsDialog = new _ChatSettingsDialog.ChatSettingsDialog();
    this.downloadButton = new _DownloadButton.DownloadButton();
    this.copyButton = new _CopyButton.CopyButton();
    this.dropDownMenu = new _DropDownMenu.DropDownMenu();
    this.initializeElements();
    this.bindEventListeners();
    this.logInitialization();
    this.render();
  }
  initializeElements() {
    // this.sendButton = document.getElementById('send-button');
    this.abortButton = document.getElementById('abort-button');
    this.messageInput = document.getElementById('message-input');
    this.chatHistory = document.getElementById('chat-history');
  }
  logInitialization() {
    const msg = `~~~~\nChat\n~~~~
Model:       ${_Settings.Settings.getModel()}
URL:         ${_Settings.Settings.getUrl()}
Chat:        ${_Settings.Settings.getCurrentChatId()}
Parameters:  ${JSON.stringify(_Settings.Settings.getModelParameters())}
`;
    console.log(msg);
  }
  render() {
    this.sidebar.render();
    this.chatArea.render();
  }
  bindEventListeners() {
    _Event.Event.listen('chatSelected', this.handleChatSelected);
    // this.sendButton.addEventListener('click', this.sendMessage.bind(this));
    this.abortButton.addEventListener('click', this.handleAbort.bind(this));
    this.messageInput.addEventListener('keypress', this.handleKeyPress.bind(this));
  }
  handleChatSelected = chat => {
    window.history.pushState({}, '', `/chats/${chat.id}`);
  };
  handleAbort = () => {
    this.ollamaApi.abort();
    this.enableForm();
    console.log('Request aborted');
  };
  handleKeyPress = event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      this.sendMessage();
    }
  };
  enableForm() {
    _Dom.DOM.hideElement(this.abortButton).enableInput(this.messageInput);
    this.messageInput.focus();
  }
  disableForm() {
    _Dom.DOM.showElement(this.abortButton).disableInput(this.messageInput);
  }

  // https://github.com/jmorganca/ollama/blob/main/docs/api.md#generate-a-completion
  async sendMessage() {
    const userMessage = this.messageInput.value.trim();
    // Get the current chat
    let chat = await _AppController.AppController.getCurrentChat();
    const url = _Settings.Settings.getUrl('/api/chat');
    if (!url) {
      _UINotification.UINotification.show('Please update the URL in the settings to continue. ');
      return null;
    }
    if (userMessage) {
      // Reset input
      this.messageInput.value = '';
      // Create new chat
      if (!chat) {
        chat = await _AppController.AppController.createChat({
          title: 'Untitled',
          model: _Settings.Settings.getModel()
        });
      }
      // Store user message
      await chat.addMessage({
        role: 'user',
        content: userMessage
      });
      const systemPrompt = _Settings.Settings.getSystemPrompt();
      const modelParameters = _Settings.Settings.getModelParameters();
      // Disable form
      this.disableForm();
      // Create user message
      this.createChatMessage({
        content: userMessage,
        role: 'user'
      });
      // Create system message container
      const responseElement = this.createChatMessage({
        content: '',
        role: 'system'
      });
      const requestContext = {
        chat,
        content: '',
        // TODO: Move this to the response?
        responseElement
      };
      const requestData = {
        prompt: userMessage,
        model: chat.model,
        messages: (await chat.getMessages()).map(message => ({
          role: message.role,
          content: message.content
        }))
      };
      // Add system prompt
      if (systemPrompt) {
        requestData.system = systemPrompt;
      }
      // Add model parameters
      if (modelParameters) {
        requestData.options = modelParameters;
      }
      // Show spinner
      responseElement.innerHTML = '<div class="waiting"></div>';
      // Make request
      this.ollamaApi.send(url, requestData, (request, response) => this.handleResponse(request, response, requestContext), (request, error) => this.handleResponseError(request, error), (request, response) => this.handleDone(request, response, requestContext));
    }
  }
  createChatMessage(message) {
    return this.chatArea.createMessageDiv(message);
  }
  handleResponse(request, response, context) {
    const responseElement = context.responseElement;
    const sanitizedContent = this.sanitizeContent(response);
    // Remember original response
    context.content += sanitizedContent;
    responseElement.textContent += sanitizedContent;
    this.chatArea.scrollToEnd();
  }
  handleResponseError(request, error) {
    // Ignore "Abort" button
    if (error.name !== 'AbortError') {
      console.error(`Error: ${error.message}`);
    }
    this.chatArea.scrollToEnd();
    this.enableForm();
  }
  async handleDone(request, response, context) {
    const chat = context.chat;
    console.log(`Chat ${chat.id} done`);
    await chat.addMessage({
      role: 'assistant',
      content: context.content
    });
    this.enableForm();
  }
  sanitizeContent = content => {
    // TODO: Sanitization logic here
    return content;
  };
  getIdParam = () => {
    return new URL(window.location.href).pathname.split('/').pop();
  };
}
exports.App = App;
},{"./UINotification.js":"js/UINotification.js","./models/Settings.js":"js/models/Settings.js","./Event.js":"js/Event.js","./Dom.js":"js/Dom.js","./Sidebar.js":"js/Sidebar.js","./AppController.js":"js/AppController.js","./CopyButton.js":"js/CopyButton.js","./OllamaApi.js":"js/OllamaApi.js","./DownloadButton.js":"js/DownloadButton.js","./DropDownMenu.js":"js/DropDownMenu.js","./SettingsDialog.js":"js/SettingsDialog.js","./ChatSettingsDialog.js":"js/ChatSettingsDialog.js","./ChatArea.js":"js/ChatArea.js"}],"js/script.js":[function(require,module,exports) {
"use strict";

var _App = require("./App.js");
var _Chat = require("./models/Chat.js");
var _ChatMessage = require("./models/ChatMessage.js");
// TODO: refactor
async function initialize() {
  await _Chat.Chat.initialize();
  await _ChatMessage.ChatMessage.initialize();
}
initialize().then(() => {
  _App.App.run();
});
},{"./App.js":"js/App.js","./models/Chat.js":"js/models/Chat.js","./models/ChatMessage.js":"js/models/ChatMessage.js"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55613" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/script.js"], null)
//# sourceMappingURL=/script.d573be0b.js.map