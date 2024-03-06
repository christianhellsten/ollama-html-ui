export class ChatTitle {
  constructor(chats) {
    this.chats = chats;
    this.element = document.getElementById('chat-title');
    this.bindEventListeners();
  }

  render() {
    const chat = this.chats.getCurrentChat();
    this.setTitle(chat?.title);
  }

  setTitle(title) {
    this.element.textContent = title || 'New chat';
  }

  focus() {
    const hasFocus = (document.activeElement === this.element);
    if (!hasFocus) {
      this.element.focus();
    }
  }

  bindEventListeners() {
    this.element.addEventListener('blur', () => {
      let title = this.element.textContent.trim();
      if (title.length === 0) {
        title = 'New chat';
        this.element.classList.add('error');
      } else {
        this.element.classList.remove('error');
      }
      const chat = this.chats.getCurrentChat();
      if (chat) {
        this.chats.updateTitle(chat.id, title);
      } else {
        this.chats.add(title, '');
      }
    });

    this.element.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.element.blur();
      }
    });
  }
}
