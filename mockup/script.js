/**
 * Static UI Mockup - Interactive Behaviors
 * Pure JavaScript (no dependencies)
 */

// ============================================
// State Management
// ============================================
const state = {
  sidebarVisible: window.innerWidth > 768,
  currentChatId: 'chat-1',
  isStreaming: false,
};

// ============================================
// DOM Elements
// ============================================
const elements = {
  // Buttons
  hamburgerBtn: document.querySelector('.hamburger-btn'),
  settingsBtn: document.querySelector('.settings-btn'),
  newChatBtn: document.querySelector('.new-chat-btn'),
  menuBtn: document.querySelector('.sidebar .menu-btn'),
  chatMenuBtn: document.querySelector('.chat-controls .icon-btn'),
  scrollToTopBtn: document.querySelectorAll('.scroll-btn')[0],
  scrollToBottomBtn: document.querySelectorAll('.scroll-btn')[1],

  // Containers
  sidebar: document.querySelector('.sidebar'),
  chatHistory: document.querySelector('.chat-history'),
  chatList: document.querySelector('.chat-list'),
  searchContainer: document.querySelector('.search-container'),

  // Form elements
  chatForm: document.querySelector('.chat-form'),
  messageInput: document.querySelector('.message-input'),
  sendBtn: document.querySelector('.send-btn'),
  abortBtn: document.querySelector('.abort-btn'),

  // Other
  chatTitle: document.querySelector('.chat-title'),
  searchInput: document.querySelector('.search-input'),
};

// ============================================
// Dropdown Management
// ============================================
class Dropdown {
  constructor(element) {
    this.element = element;
    this.button = element.querySelector('.icon-btn, .menu-btn, .model-btn');
    this.menu = element.querySelector('.dropdown-menu');

    if (this.button && this.menu) {
      this.init();
    }
  }

  init() {
    this.button.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.element.contains(e.target)) {
        this.close();
      }
    });

    // Handle dropdown item clicks
    const items = this.menu.querySelectorAll('.dropdown-item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        console.log('Dropdown item clicked:', item.textContent.trim());
        this.close();
      });
    });
  }

  toggle() {
    this.element.classList.toggle('active');
  }

  close() {
    this.element.classList.remove('active');
  }

  open() {
    this.element.classList.add('active');
  }
}

// Initialize all dropdowns
const dropdowns = Array.from(document.querySelectorAll('.dropdown')).map(
  el => new Dropdown(el)
);

// ============================================
// Sidebar Toggle
// ============================================
function toggleSidebar() {
  state.sidebarVisible = !state.sidebarVisible;
  elements.sidebar.classList.toggle('visible', state.sidebarVisible);
}

if (elements.hamburgerBtn) {
  elements.hamburgerBtn.addEventListener('click', toggleSidebar);
}

// ============================================
// Chat List Management
// ============================================
function selectChatListItem(item) {
  // Remove active class from all items
  document.querySelectorAll('.chat-list-item').forEach(el => {
    el.classList.remove('active');
  });

  // Add active class to clicked item
  item.classList.add('active');

  // Update chat title
  const title = item.querySelector('.chat-list-title').textContent;
  elements.chatTitle.textContent = title;

  // Close sidebar on mobile
  if (window.innerWidth <= 768) {
    state.sidebarVisible = false;
    elements.sidebar.classList.remove('visible');
  }
}

// Add click handlers to chat list items
document.querySelectorAll('.chat-list-item').forEach(item => {
  item.addEventListener('click', (e) => {
    // Don't select if clicking delete button
    if (!e.target.closest('.delete-btn')) {
      selectChatListItem(item);
    }
  });

  // Delete button handler
  const deleteBtn = item.querySelector('.delete-btn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm('Delete this chat?')) {
        item.remove();
        console.log('Chat deleted');
      }
    });
  }
});

// ============================================
// Search Functionality
// ============================================
const searchButton = document.querySelector('#chats-menu .dropdown-item');
if (searchButton) {
  searchButton.addEventListener('click', () => {
    elements.searchContainer.classList.toggle('hidden');
    if (!elements.searchContainer.classList.contains('hidden')) {
      elements.searchInput.focus();
    }
  });
}

if (elements.searchInput) {
  elements.searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll('.chat-list-item').forEach(item => {
      const title = item.querySelector('.chat-list-title').textContent.toLowerCase();
      item.style.display = title.includes(query) ? '' : 'none';
    });
  });
}

// ============================================
// New Chat
// ============================================
if (elements.newChatBtn) {
  elements.newChatBtn.addEventListener('click', () => {
    console.log('New chat created');
    elements.chatTitle.textContent = 'New Chat';
    elements.chatHistory.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary); padding: 2rem;">Start a new conversation...</p>';
  });
}

// ============================================
// Chat Title Editing
// ============================================
if (elements.chatTitle) {
  elements.chatTitle.addEventListener('blur', () => {
    const newTitle = elements.chatTitle.textContent.trim();
    if (newTitle) {
      console.log('Chat title updated:', newTitle);
      // Update in chat list
      const activeItem = document.querySelector('.chat-list-item.active');
      if (activeItem) {
        activeItem.querySelector('.chat-list-title').textContent = newTitle;
      }
    }
  });

  elements.chatTitle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      elements.chatTitle.blur();
    }
  });
}

// ============================================
// Message Input Auto-resize
// ============================================
if (elements.messageInput) {
  elements.messageInput.addEventListener('input', () => {
    // Reset height to auto to get the correct scrollHeight
    elements.messageInput.style.height = 'auto';

    // Set height to scrollHeight (up to max-height defined in CSS)
    elements.messageInput.style.height = elements.messageInput.scrollHeight + 'px';

    // Show/hide send button based on input
    const hasText = elements.messageInput.value.trim().length > 0;
    if (elements.sendBtn) {
      elements.sendBtn.classList.toggle('hidden', !hasText || state.isStreaming);
    }
  });

  // Handle Enter key (send) and Shift+Enter (new line)
  elements.messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
}

// ============================================
// Send Message
// ============================================
function sendMessage() {
  const message = elements.messageInput.value.trim();

  if (!message || state.isStreaming) return;

  console.log('Sending message:', message);

  // Add user message to chat
  addMessage('user', message);

  // Clear input
  elements.messageInput.value = '';
  elements.messageInput.style.height = 'auto';
  if (elements.sendBtn) {
    elements.sendBtn.classList.add('hidden');
  }

  // Simulate AI response
  state.isStreaming = true;
  if (elements.abortBtn) {
    elements.abortBtn.classList.remove('hidden');
  }

  setTimeout(() => {
    addMessage('ai', 'This is a simulated response. In the real application, this would be generated by the AI model.');
    state.isStreaming = false;
    if (elements.abortBtn) {
      elements.abortBtn.classList.add('hidden');
    }
  }, 1000);
}

if (elements.chatForm) {
  elements.chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
  });
}

if (elements.abortBtn) {
  elements.abortBtn.addEventListener('click', () => {
    console.log('Aborted message generation');
    state.isStreaming = false;
    elements.abortBtn.classList.add('hidden');
  });
}

// ============================================
// Add Message to Chat
// ============================================
function addMessage(role, text) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${role}-message`;

  const avatarDiv = document.createElement('div');
  avatarDiv.className = 'message-avatar';

  const avatar = document.createElement('div');
  avatar.className = role === 'ai' ? 'avatar ai-avatar' : 'avatar';
  avatar.textContent = role === 'ai' ? 'AI' : 'You';
  avatarDiv.appendChild(avatar);

  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';

  const textDiv = document.createElement('div');
  textDiv.className = 'message-text';

  const p = document.createElement('p');
  p.textContent = text;
  textDiv.appendChild(p);

  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'message-actions';

  // Copy button
  const copyBtn = createIconButton('Copy message', `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  `);
  copyBtn.addEventListener('click', () => copyToClipboard(text));
  actionsDiv.appendChild(copyBtn);

  if (role === 'ai') {
    // Good/bad/flag buttons for AI messages
    const goodBtn = createIconButton('Good response', `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
      </svg>
    `);
    actionsDiv.appendChild(goodBtn);

    const badBtn = createIconButton('Bad response', `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
      </svg>
    `);
    actionsDiv.appendChild(badBtn);

    const flagBtn = createIconButton('Flag message', `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
        <line x1="4" y1="22" x2="4" y2="15"/>
      </svg>
    `);
    actionsDiv.appendChild(flagBtn);
  }

  // Delete button
  const deleteBtn = createIconButton('Delete message', `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  `);
  deleteBtn.addEventListener('click', () => {
    if (confirm('Delete this message?')) {
      messageDiv.remove();
    }
  });
  actionsDiv.appendChild(deleteBtn);

  contentDiv.appendChild(textDiv);
  contentDiv.appendChild(actionsDiv);

  messageDiv.appendChild(avatarDiv);
  messageDiv.appendChild(contentDiv);

  elements.chatHistory.appendChild(messageDiv);

  // Scroll to bottom
  scrollToBottom();
}

// ============================================
// Helper Functions
// ============================================
function createIconButton(title, svgContent) {
  const btn = document.createElement('button');
  btn.className = 'icon-btn';
  btn.title = title;
  btn.innerHTML = svgContent;
  return btn;
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copied to clipboard');
      // Could show a toast notification here
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  } else {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      console.log('Copied to clipboard (fallback)');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
    document.body.removeChild(textarea);
  }
}

// ============================================
// Scroll Functions
// ============================================
function scrollToBottom() {
  elements.chatHistory.scrollTo({
    top: elements.chatHistory.scrollHeight,
    behavior: 'smooth'
  });
}

function scrollToTop() {
  elements.chatHistory.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

if (elements.scrollToBottomBtn) {
  elements.scrollToBottomBtn.addEventListener('click', scrollToBottom);
}

if (elements.scrollToTopBtn) {
  elements.scrollToTopBtn.addEventListener('click', scrollToTop);
}

// ============================================
// Message Action Handlers
// ============================================
document.addEventListener('click', (e) => {
  const target = e.target.closest('button');
  if (!target) return;

  // Handle message action buttons
  if (target.closest('.message-actions')) {
    const message = target.closest('.message');
    const messageText = message.querySelector('.message-text').textContent;

    if (target.title.includes('Good')) {
      console.log('Marked as good:', messageText);
      target.style.color = 'var(--color-success)';
    } else if (target.title.includes('Bad')) {
      console.log('Marked as bad:', messageText);
      target.style.color = 'var(--color-danger)';
    } else if (target.title.includes('Flag')) {
      console.log('Flagged:', messageText);
      target.style.color = 'var(--color-warning)';
    }
  }
});

// ============================================
// Responsive Behavior
// ============================================
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    state.sidebarVisible = true;
    elements.sidebar.classList.remove('visible');
  } else {
    state.sidebarVisible = false;
    elements.sidebar.classList.remove('visible');
  }
});

// ============================================
// Settings Button
// ============================================
if (elements.settingsBtn) {
  elements.settingsBtn.addEventListener('click', () => {
    console.log('Settings button clicked');
    alert('Settings dialog would open here. This will be implemented in the next view.');
  });
}

// ============================================
// Initialization
// ============================================
console.log('Static UI Mockup initialized');
console.log('Features:');
console.log('- Dropdown menus');
console.log('- Chat list selection');
console.log('- Search functionality');
console.log('- Message sending (simulated)');
console.log('- Auto-resizing textarea');
console.log('- Scroll controls');
console.log('- Copy to clipboard');
console.log('- Responsive sidebar');
console.log('- Message actions (good/bad/flag/delete)');
console.log('- Chat title editing');

// Focus message input on load
if (elements.messageInput) {
  elements.messageInput.focus();
}
