# ollama-html-ui

![cover](/screenshots/ollama-html-ui.jpg)

![Contributions Welcome](https://img.shields.io/badge/Contributions-welcome-blue.svg)

A HTML UI for Ollama.

## Goals

- Zero dependencies: vanilla HTML, CSS, and Javascript
- Simple installation: download and open in browser

## Features

- Ollama support
- New chat
- Edit chat
- Clear chats
- Persistence of chat history using local storage

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
$ open index.html
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

- [ ] Delete Chat
- [ ] Ollama Chat API
- [ ] CSP
- [ ] GPTs

## Done

- [x] Select model
- [x] Save settings
- [x] View settings
- [x] Clear chats
- [x] Edit chat
- [x] New chat
- [x] Abort response
- [x] Send message
