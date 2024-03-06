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
- [ ] Use IndexedDB instead of local storage
- [ ] Markdown support
- [ ] Keyboard shortcuts

## Done

- [x] System prompt
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

## Licensing

This project is available under two licensing options:

1. **Open Source License (MIT)**:

   - The code in this project is available under the terms of the MIT License.
   - You are free to use, modify, and distribute the code in your non-commercial, open source projects.
   - View the full text of the MIT License in the [LICENSE](LICENSE) file.

2. **Commercial License**:

   - If you intend to use this code in a commercial project, we offer a separate commercial licensing option.
   - Our commercial license provides additional rights and support tailored to your commercial needs.
   - To inquire about our commercial licensing options, pricing, and terms, please contact us at [christian@aktagon.com](mailto:christian@aktagon.com) to discuss your specific requirements.

We value and support both our open source community and commercial users. By providing dual licensing options, we aim to make this project accessible to a wide range of users while offering customized solutions for commercial projects.

