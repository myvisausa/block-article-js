/**
 * Import Tool's icon
 */
import { IconCopy } from '@codexteam/icons';

/**
 * Build styles
 */
import './index.css';

export default class Checklist {

  static get isReadOnlySupported() {
    return true;
  }

  static get toolbox() {
    return {
      icon: IconCopy,
      title: 'Checklist',
    };
  }

  static get enableLineBreaks() {
    return true;
  }

  static get DEFAULT_TITLE_PLACEHOLDER() {
    return 'Title';
  }

  get CSS() {
    return {
      baseClass: this.api.styles.block,
      wrapper: 'cdx-checklist',
      title: 'cdx-checklist__title',
      input: this.api.styles.input,
      item: 'cdx-checklist__item',
      button: 'cdx-button',
    };
  }

  constructor({ data, config, api, readOnly }) {
    this.api = api;
    this.readOnly = readOnly;

    this.titlePlaceholder = config.titlePlaceholder || Checklist.DEFAULT_TITLE_PLACEHOLDER;

    this.data = {
      title: data.title || '',
      items: data.items || [],
    };
  }

  render() {
    const container = this._make('div', [this.CSS.baseClass, this.CSS.wrapper]);
    const title = this._make('div', [this.CSS.input, this.CSS.title], {
      contentEditable: !this.readOnly,
      innerHTML: this.data.title,
    });

    title.dataset.placeholder = this.titlePlaceholder;

    container.appendChild(title);

    this.data.items.forEach(item => {
      container.appendChild(this.createItemElement(item));
    });

    const addButton = this._make('button', [this.CSS.button], {
      innerHTML: 'Add item',
    });
    addButton.onclick = () => {
      container.insertBefore(this.createItemElement(''), addButton);
    };

    container.appendChild(addButton);

    return container;
  }

  createItemElement(itemText) {
    const item = this._make('div', ['cdx-checklist__item']);
  
    const input = this._make('div', ['cdx-checklist__item-input', this.CSS.input, this.CSS.item], {
      contentEditable: !this.readOnly,
      innerHTML: itemText,
    });
  
    const removeButton = this._make('button', ['cdx-checklist__item-button', this.CSS.button], {
      innerHTML: 'Remove',
    });
    removeButton.onclick = () => item.remove();
  
    item.appendChild(input);
    item.appendChild(removeButton);
  
    return item;
  }

  save(container) {
    const title = container.querySelector(`.${this.CSS.title}`);
    const items = [...container.querySelectorAll(`.${this.CSS.item}`)].map(item => item.textContent);

    return {
      title: title.innerHTML,
      items,
    };
  }

  _make(tagName, classNames = null, attributes = {}) {
    const el = document.createElement(tagName);

    if (Array.isArray(classNames)) {
      el.classList.add(...classNames);
    } else if (classNames) {
      el.classList.add(classNames);
    }

    for (const attrName in attributes) {
      el[attrName] = attributes[attrName];
    }

    return el;
  }

  static get sanitize() {
    return {
      title: {},
      items: { br: true },
    };
  }
}