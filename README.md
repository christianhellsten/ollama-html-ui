# ollama-html-ui

![cover](/ollama-html-ui.jpg)

![Contributions Welcome](https://img.shields.io/badge/Contributions-welcome-blue.svg)

A HTML UI for Ollama.

## Goals

- Zero dependencies
- Simple installation: download and open in browser

## Features

- Ollama
- Mistral

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

## TODO

- [ ] Set model
- [ ] Delete Chat
- [ ] Use Chat API
- [ ] CSP
- [ ] GPTs

- [x] Save settings
- [x] View settings
- [x] Send message
- [x] Abort response
- [x] New chat
- [x] Clear chats
