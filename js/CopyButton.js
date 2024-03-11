import { UINotification } from './UINotification.js';

export class CopyButton {
  constructor() {
    document.addEventListener('click', (event) => {
      // Check if the clicked element has the class 'copy-button'
      if (event.target.classList.contains('copy-button')) {
        const targetSelector = event.target.getAttribute('data-target');
        if (!targetSelector) {
          console.error('The data-target attribute is not set');
          return;
        }
        const textToCopy = document.getElementById(targetSelector).innerText;
        // Create a temporary textarea element
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);

        // Select the text and copy it
        textarea.select();
        document.execCommand('copy');

        // Remove the temporary textarea
        document.body.removeChild(textarea);

        UINotification.show('Text copied to clipboard').autoDismiss();
      }
    });
  }
}
