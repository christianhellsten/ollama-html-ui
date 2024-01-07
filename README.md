# ollama-html-ui

<video controls>
  <source src="videos/video.webm" type="video/webm">
  ![cover](/screenshots/chat-collapsed.png)
</video>

![Contributions Welcome](https://img.shields.io/badge/Contributions-welcome-blue.svg)

A HTML UI for [Ollama](https://ollama.ai).

## Goals

- Minimal & responsive UI: mobile & desktop
- Cross browser: support last 2 versions with more than > 0.5% global use
- Zero dependencies: HTML, CSS, and JavaScript (less than 10 Kb gzipped)
- Simple installation: run in your browser, host on your own server

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

## How to install Ollama

**Manually**

Download [Ollama](https://ollama.ai/) from the website.

**MacOS**

```bash
brew install ollama
```

**Linux**

For instructions on how to install Ollama on Linux, see [https://ollama.ai/download/linux](https://ollama.ai/download/linux).

## How to install and run the Ollama UI

To run the Ollama UI, all you need is a web server that serves dist/index.html
and the bundled JS and CSS file.

First, start Ollama:

```bash
$ ollama run dolphin-phi
```

**Using Caddy**

To run the Ollama UI using [Caddy](https://caddyserver.com/), execute the following command from the command line:

```bash
$ git clone git@github.com:christianhellsten/ollama-html-ui.git
$ caddy run
```

**Using Docker**

To run the Ollama UI using Docker, execute the following command from the command line:

```bash
$ docker run -p 80:80 aktagon/ollama-html-ui
```

Alternatively, build the image yourself:

```bash
$ git clone git@github.com:christianhellsten/ollama-html-ui.git
$ docker build -t ollama-html-ui .
$ docker run -p 80:80 ollama-html-ui
```

<details>
  <summary>Contributing</summary>
Clone the repository:

```bash
$ git clone git@github.com:christianhellsten/ollama-html-ui.git
$ cd ollama-html-ui
$ yarn global add parcel-bundler
# Alternatively, use npm:
# npm install -g parcel-bundler
$ npm install
$ parcel index.html
$ open http://locahost:1234
```

## Testing

Tests are written using `Playwright` and `node:test`.

The the tests can be run from the command line using this command:

```bash
$ ollama run dolphin-phi
$ node test
```

## Deployment

```bash
$ parcel build index.html
```
  </summary>
</details>


<details>
  <summary>Tasks</summary>
  - [ ] Edit message / response
  - [ ] Clear chat
  - [ ] CSP
  - [ ] Speech recognition
  - [ ] Image upload / multi-modal
  - [ ] Markdown support
  - [ ] Keyboard shortcuts
  - [ ] Dark & light theme
  - [ ] Vote up / down
  - [ ] Export chat messages to JSON

  ## Done

  - [x] Delete message / response
  - [x] Ollama chat API / chat memory
  - [x] IndexedDB persistence
  - [x] Model parameters
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
  </summary>
</details>

<details>
  <summary>Features</summary>
    - https://ollama.ai support

    **Chat**

    - New chat
    - Edit chat
    - Delete chat
    - Download chat
    - Scroll to top/bottom
    - Copy chat to clipboard

    **Chats**

    - Search chats
    - Clear chats
    - Chat history

    **Settings**

    - URL
    - Model
    - System prompt
    - Model parameters
  </summary>
</details>

<details>
  <summary>Licensing</summary>
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
  </summary>
</details>
