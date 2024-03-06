export class ChatListItem {
  constructor(chat, chatList) {
    this.chat = chat;
    this.chatList = chatList;
    this.template = document.getElementById('chat-list-item-template').content;
    this.element = null; // Will hold the cloned template
  }

  render() {
    this.element = this.template.cloneNode(true);

    const listItemElement = this.element.querySelector('.chat-list-item');
    listItemElement.title = this.chat.title;
    listItemElement.data = { id: this.chat.id };
    listItemElement.classList.add(`chat${this.chat.id}`);

    if (this.chat.id === this.chatList.chats.getCurrentChat()?.id) {
      listItemElement.classList.add('selected');
      this.element.querySelector('.icon-selected').classList.remove('hidden');
    }

    listItemElement.addEventListener("mouseover", () => {
      listItemElement.classList.add('hover');
    });

    listItemElement.addEventListener("mouseout", () => {
      listItemElement.classList.remove('hover');
    });

    const chatTitle = this.element.querySelector('.chat-title');
    chatTitle.textContent = this.chat.title;

    const deleteChatLink = this.element.querySelector('.delete-chat-button');
    listItemElement.addEventListener('click', () => {
      this.chatList.selectChat(this.chat.id);
    });
    deleteChatLink.addEventListener('click', (event) => {
      this.chatList.deleteChat(this.chat.id);
      event.stopPropagation();
    });

    return this.element;
  }
}
