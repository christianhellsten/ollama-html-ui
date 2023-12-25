export class MarkdownFormatter {
  static format (text) {
    const formattedText = text
      .replace(/^# (.*)$/gm, '<h1>$1</h1>')
      .replace(/^## (.*)$/gm, '<h2>$1</h2>')
      .replace(/^### (.*)$/gm, '<h3>$1</h3>')
      .replace(/\*\*(.*)\*\*/gm, '<strong>$1</strong>')
      .replace(/__(.*)__/gm, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gm, '<em>$1</em>')
      .replace(/_(.*)_/gm, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/gm, '<a href="$2">$1</a>')
      .replace(/`([^`]*)`/gm, '<code>$1</code>')
      .replace(/```([^`]+)```/gm, '<pre><code>$1</code></pre>')
    return formattedText
  }
}
