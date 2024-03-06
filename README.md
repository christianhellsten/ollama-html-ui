# ollama-html-ui

![cover](/screenshots/main.png)

![Contributions Welcome](https://img.shields.io/badge/Contributions-welcome-blue.svg)

A HTML UI for Ollama.

## Goals

- Zero dependencies: vanilla HTML, CSS, and Javascript
- Simple installation: download and open in browser

## Features

- https://ollama.ai support
- New chat
- Edit chat
- Delete chat
- Search chats
- Clear chats
- View settings
- Update settings
- Chat history (local storage)

## Screenshots

![Main screen](/screenshots/main.png)
![Settings screen](/screenshots/settings.png)
![Search](/screenshots/search.png)

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

- [ ] Clear chat
- [ ] Ollama Chat API
- [ ] Select model in sidebar (global)
- [ ] Select model in chat (local)
- [ ] Delete message and response
- [ ] Copy message / response
- [ ] CSP
- [ ] Speech recognition
- [ ] Uploads
- [ ] IndexedDB

## Done

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
