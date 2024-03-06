import assert from 'assert'
import { MarkdownFormatter } from './MarkdownFormatter.js' // Adjust the path as necessary
import { test } from 'node:test'
// import fs from 'fs'

test.describe('MarkdownFormatter tests', { only: true }, () => {
  test('formats H1 headers correctly', async () => {
    const input = '# Header 1'
    const expectedOutput = '<h1>Header 1</h1>'
    assert.strictEqual(MarkdownFormatter.format(input), expectedOutput)
  })

  test('formats H2 headers correctly', async () => {
    const input = '## Header 2'
    const expectedOutput = '<h2>Header 2</h2>'
    assert.strictEqual(MarkdownFormatter.format(input), expectedOutput)
  })

  test('formats H3 headers correctly', async () => {
    const input = '### Header 3'
    const expectedOutput = '<h3>Header 3</h3>'
    assert.strictEqual(MarkdownFormatter.format(input), expectedOutput)
  })

  test('formats bold text with double asterisks', async () => {
    const input = '**bold**'
    const expectedOutput = '<strong>bold</strong>'
    assert.strictEqual(MarkdownFormatter.format(input), expectedOutput)
  })

  test('formats bold text with double underscores', async () => {
    const input = '__bold__'
    const expectedOutput = '<strong>bold</strong>'
    assert.strictEqual(MarkdownFormatter.format(input), expectedOutput)
  })

  test('formats italic text with single asterisk', async () => {
    const input = '*italic*'
    const expectedOutput = '<em>italic</em>'
    assert.strictEqual(MarkdownFormatter.format(input), expectedOutput)
  })

  test('formats italic text with single underscore', async () => {
    const input = '_italic_'
    const expectedOutput = '<em>italic</em>'
    assert.strictEqual(MarkdownFormatter.format(input), expectedOutput)
  })

  test('formats links correctly', async () => {
    const input = '[Google](https://www.google.com)'
    const expectedOutput = '<a href="https://www.google.com">Google</a>'
    assert.strictEqual(MarkdownFormatter.format(input), expectedOutput)
  })

  test('formats inline code using backticks', async () => {
    const input = '`code`'
    const expectedOutput = '<code>code</code>'
    assert.strictEqual(MarkdownFormatter.format(input), expectedOutput)
  })

  test('formats and highlights code blocks using triple backticks', async () => {
    const input = '```function example() { return true; }```'
    const expectedOutput = '<pre><code><span class="keyword">function</span> example() { <span class="keyword">return</span> true; }</code></pre>'
    assert.strictEqual(MarkdownFormatter.format(input), expectedOutput)
  })
})

/*
test('formats and highlights code blocks using triple backticks', async () => {
  const start = performance.now();

  // Format the Markdown
  const formatter = new MarkdownFormatter();
  fs.readFile('js/App.test.js', (err, data) => {
    formatter.format(data);
  })

  const end = performance.now();
  console.log(`Formatting took ${end - start} milliseconds.`);
});
*/
