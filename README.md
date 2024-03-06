# ollama-html-ui

![cover](/screenshots/ollama-html-ui.jpg)

![Contributions Welcome](https://img.shields.io/badge/Contributions-welcome-blue.svg)

A HTML UI for Ollama.

## Goals

- Zero dependencies: vanilla HTML, CSS, and Javascript
- Simple installation: download and open in browser

## Features

- https://ollama.ai support
- New chat
- Edit chat
- Clear chats
- View settings
- Update settings
- Chat history (local storage)

## Screenshots

![Main screen](/screenshots/main.png)
![Settings screen](/screenshots/settings.png)

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

## Development

```bash
$ yarn global add parcel-bundler
# Alternatively, use npm:
# npm install -g parcel-bundler
$ parcel index.html
$ open http://locahost:1234
```

## Compiling

```bash
$ parcel build index.html
```

## Todo

- [ ] Ollama Chat API
- [ ] Select model in sidebar (global)
- [ ] Select model in chat (local)
- [ ] Delete message and response
- [ ] Add browserslist to package.json for transpiling
- [ ] Copy message / response
- [ ] CSP
- [ ] Unit and UI tests: https://nodejs.org/api/test.html

## Done

- [x] Delete Chat
- [x] Select model
- [x] Save settings
- [x] View settings
- [x] Clear chats
- [x] Edit chat
- [x] New chat
- [x] Abort response
- [x] Send message
