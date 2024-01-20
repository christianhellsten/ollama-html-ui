export class ExportChat {
  static exportChat(chat, filename) {
    // Get the contents of the element
    const content = chat.jsonify();

    // Create a Blob with the content
    const blob = new Blob([content], { type: 'application/json' });

    // Create an anchor element and set the href to the blob
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;

    // Append the anchor to the document, trigger a click, and then remove it
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Revoke the blob URL
    URL.revokeObjectURL(a.href);
  }
}
