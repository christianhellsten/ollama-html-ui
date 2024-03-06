# ollama-html-ui

![cover](/ollama-html-ui.jpg)

![Contributions Welcome](https://img.shields.io/badge/Contributions-welcome-blue.svg)

HTML UI for Ollama.

## Goals

- Zero dependencies
- Simple to install: download and open in browser.

## Features

- Ollama
- Mistral

## Installation

First install (Olama)[https://ollama.ai/].

```bash
$ git clone git@github.com:christianhellsten/ollama-html-ui.git
$ cd ollama-html-ui
$ open index.html
```

## Compilation

```bash
$ parcel build index.html
```

## Development

```bash
$ ollama run mistral
$ yarn add --dev parcel
$ parcel index.html
$ open http://locahost:1234
```

## TODO

- [ ] Delete Chat
- [ ] Update URL to /chats/:id
- [ ] Settings
- [ ] CSP

- [x] New Chat
- [x] Local storage
