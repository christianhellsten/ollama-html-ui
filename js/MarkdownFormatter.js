export class MarkdownFormatter {
  static regexMap = [
    {
      regex: /^(#{1,6})\s+(.*?)$/gm,
      replace: (match, hashes, content) =>
        `<h${hashes.length}>${content}</h${hashes.length}>`,
    },
    { regex: /\[(.*?)\]\((.*?)\)/gm, replace: '<a href="$2">$1</a>' },
    {
      regex: /(\*\*|__)(.*?)\1|(\*|_)(.*?)\3/gm,
      replace: (match, boldDelim, boldText, italicDelim, italicText) => {
        if (boldDelim) {
          return `<strong>${boldText}</strong>`;
        }
        if (italicDelim) {
          return `<em>${italicText}</em>`;
        }
      },
    },
    {
      regex: /```(.*?)```|`([^`]*)`/gms,
      replace: (match, blockCode, inlineCode) => {
        if (blockCode !== undefined) {
          // It's a block code
          return '<pre><code>' + blockCode + '</code></pre>';
        } else {
          // It's inline code
          return '<code>' + inlineCode + '</code>';
        }
      },
      post: (formattedText, blockCode) =>
        blockCode !== undefined
          ? MarkdownFormatter.highlightCode(formattedText)
          : formattedText,
    },
  ];

  static format(text) {
    return MarkdownFormatter.regexMap.reduce(
      (formattedText, { regex, replace, post }) => {
        const replacement = formattedText.replace(regex, replace);
        return post
          ? post(replacement, replacement.includes('<pre><code>'))
          : replacement;
      },
      text,
    );
  }

  static highlightCode(code) {
    return code.replace(
      /(function|var|let|const|if|else|for|while|do|return|class|new)/g,
      '<span class="keyword">$1</span>',
    );
  }
}
