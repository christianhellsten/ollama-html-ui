export class CopyButton {
  static run () {
    const btn = new CopyButton()
    return btn
  }

  constructor () {
    document.addEventListener('click', function (event) {
      // Check if the clicked element has the class 'copy-button'
      if (event.target.classList.contains('copy-button')) {
        // Get the index from the data-target attribute
        const targetIndex = this.getAttribute('data-target')

        // Select the corresponding text element
        const textToCopy = document.querySelectorAll('.copyText')[targetIndex].innerText

        // Create a temporary textarea element
        const textarea = document.createElement('textarea')
        textarea.value = textToCopy
        document.body.appendChild(textarea)

        // Select the text and copy it
        textarea.select()
        document.execCommand('copy')

        // Remove the temporary textarea
        document.body.removeChild(textarea)

        // Optional: Display a message or change the button text/content
        alert('Text copied to clipboard')
      }
    })
  }
}
