function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

// Show all uncaught errors as UI notifications
/*
window.onerror = function (message, source, lineno, colno, error) {
  const errorDetails = `${message} at ${source}:${lineno}:${colno}`;
  UINotification.show(errorDetails, 'error');
  return true;
};
*/

export class UINotification {
  constructor(message, type) {
    const id = simpleHash(JSON.stringify(message));
    this.type = type;
    this.domId = `notification-${id}`;
    this.container = document.body;
    this.template = document.getElementById('notification-template').content;
    this._bindEventListeners();
  }

  _bindEventListeners() {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.hide();
      }
    });
  }

  static show(message, type) {
    const notification = new UINotification(message, type);
    notification.show(message);
  }

  static initialize() {
    // Store the original console.error function
    const originalConsoleError = console.error;

    // Override console.error
    console.error = function (...args) {
      UINotification.show(args);
      // Call the original console.error with all arguments
      originalConsoleError.apply(console, args);
    };
  }

  static handleApplicationError(error) {
    console.debug('caught error');
    console.error(error);
    UINotification.show(error);
  }

  show(message) {
    // Clone the template
    const clone = this.template.cloneNode(true);

    // Find the root element of the notification in the clone
    const notificationElement = clone.querySelector('.notification');
    if (!notificationElement) {
      console.error('Notification root element not found in template');
      return;
    }

    // Set the message
    clone.querySelector('.notification-message').textContent = message;

    notificationElement.id = this.domId; // Set ID on the actual element, not the fragment
    // Add type, for example, error
    if (this.type) {
      notificationElement.classList.add(`notification-${this.type}`);
    }

    // Add close functionality
    const closeButton = clone.querySelector('.close-notification-button');
    closeButton.onclick = () => this.hide();

    // Don't show the same notification twice
    if (!document.getElementById(this.domId)) {
      // Append to the container and display
      this.container.appendChild(clone);
    }
  }

  hide() {
    document.getElementById(this.domId)?.remove();
  }
}
