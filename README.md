# ollama-html-ui

![cover](/screenshots/chat-collapsed.png)

![Contributions Welcome](https://img.shields.io/badge/Contributions-welcome-blue.svg)

A HTML UI for Ollama.

## Goals

- Zero dependencies: vanilla HTML, CSS, and Javascript
- Simple installation: download and open in browser
- Minimal & responsive UI: mobile & desktop

## Features

- https://ollama.ai support

**Chat**

- New chat
- Edit chat
- Delete chat
- Download chat
- Copy chat to clipboard

**Chats**

- Search chats
- Clear chats
- Chat history (local storage)

**Settings**

- View settings
- Update settings

## Screenshots

**Desktop**

![Chat (fullscreen)](/screenshots/chat-collapsed.png)
![Chat](/screenshots/chat.png)
![Settings screen](/screenshots/settings.png)
![Search](/screenshots/search.png)

**Mobile**

![Chat (fullscreen)](/screenshots/mobile-chat-collapsed.png)
![Chat](/screenshots/mobile-chat.png)
![Settings screen](/screenshots/mobile-settings.png)
![Search](/screenshots/mobile-search.png)

## Installing

First, install and start [Olama](https://ollama.ai/).

```bash
$ ollama run mistral
```

Next, clone this repository:

```bash
$ git clone git@github.com:christianhellsten/ollama-html-ui.git
```

## Running

```bash
$ cd ollama-html-ui
# Use built-in and unsafe HTTP server
$ npm run server
$ open http://locahost:1234
```

## Deployment

```bash
$ parcel build index.html
```

## Development

```bash
$ yarn global add parcel-bundler
# Alternatively, use npm:
# npm install -g parcel-bundler
$ parcel index.html
$ open http://locahost:1234
```

## Testing

Tests are written using `Playwright` and `node:test`.

The the tests can be run from the command line using this command:

```bash
$ ollama run mistral
$ node test
```

## Todo

- [ ] Ollama Chat API
- [ ] Edit message / response
- [ ] Delete message / response
- [ ] Clear chat
- [ ] CSP
- [ ] Speech recognition
- [ ] Uploads
- [ ] IndexedDB
- [ ] Markdown support
- [ ] Keyboard shortcuts

## Done

- [x] Copy message to clipboard
- [x] Select model in settings (global)
- [x] Select model in chat (local)
- [x] Search chats
- [x] Delete Chat
- [x] Select model
- [x] Save settings
- [x] View settings
- [x] Clear chats
- [x] Edit chat
- [x] New chat
- [x] Abort response
- [x] Send message
- [x] UI tests: https://nodejs.org/api/test.html
