export class DownloadButton {
  constructor () {
    document.addEventListener('click', (event) => {
      // Check if the clicked element has the class 'copy-button'
      if (event.target.classList.contains('download-button')) {
        // Get the index from the data-target attribute
        const targetId = event.target.getAttribute('data-target')
        this.downloadElementContent(targetId, 'chat.html')
      }
    })
  }

  downloadElementContent (elementId, filename) {
    // Get the element
    const element = document.getElementById(elementId)
    if (!element) {
      console.error('Element not found')
      return
    }

    // Get the contents of the element
    const content = element.innerText

    // Create a Blob with the content
    const blob = new Blob([content], { type: 'text/html' })

    // Create an anchor element and set the href to the blob
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = filename

    // Append the anchor to the document, trigger a click, and then remove it
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    // Revoke the blob URL
    URL.revokeObjectURL(a.href)
  }
}
