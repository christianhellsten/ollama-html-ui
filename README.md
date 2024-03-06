# ollama-html-ui

![cover](/ollama-html-ui.jpg)

![Contributions Welcome](https://img.shields.io/badge/Contributions-welcome-blue.svg)

A HTML UI for Ollama.

## Goals

- Zero dependencies
- Simple installation: download and open in browser

## Features

- Ollama support
- New chat
- Edit chat
- Clear chats
- Persistence of chat history using local storage

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
$ ollama run mistral
$ cd ollama-html-ui
$ open index.html
```

## Development

```bash
$ yarn add --dev parcel
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
