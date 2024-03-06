import { List } from './List.js';
import { DOM } from './DOM.js';

export class FilteredList extends List {
  constructor(ul, items) {
    super(ul, items); // Call the constructor of the parent class
    this.div = document.createElement('small');
    this.div.classList.add('hidden', 'p-2');
    this.ul.prepend(this.div);
    this.query = null;
  }

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapes special characters
  }

  render() {
    super.render();
  }

  /*
  selectFirst() {
    const select = document.querySelector(
      '#chat-model .chat-model-list li:not(.hidden)',
    )?.textContent;
    this.setSelected(select);
  }
  */

  filter(searchTerm) {
    this.query = searchTerm;
    if (searchTerm === null || searchTerm === undefined) {
      this.clearFilter();
      this.filtered = false;
      return null;
    }
    const query = this.escapeRegExp(searchTerm).replace(/\s+/g, '.*');
    const regex = new RegExp(query, 'i'); // 'i' for case-insensitive matching

    // Loop through the list items
    const matches = this.li
      .map((listItemElement) => {
        const text = listItemElement.textContent;
        const match = regex.test(text);

        if (match) {
          DOM.showElement(listItemElement);
          return text;
        } else {
          DOM.hideElement(listItemElement);
          return null;
        }
      })
      .filter((match) => match);
    console.log(`Search ${query}. Matches: ${matches}`);

    // Update text
    DOM.showElement(this.div);
    let message = null;
    if (searchTerm.length < 1) {
      message = `Continue typing to search models. Showing all models:`;
    } else {
      if (matches.length != 0) {
        message = `Found ${matches.length} model(s) matching '${this.query}'. Click to change chat's model, or press tab to change prompt's model:`;
      } else {
        message = `Did not find any models that match '${this.query}'.`;
      }
    }
    this.div.textContent = message;

    return matches;
  }

  clearFilter() {
    DOM.hideElement(this.div);
    this.query = null;
    this.li.forEach((listItemElement) => {
      DOM.showElement(listItemElement);
    });
  }
}
