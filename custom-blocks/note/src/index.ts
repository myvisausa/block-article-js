/**
 * Import Tool's icon
 */
import { IconCopy } from '@codexteam/icons'

/**
 * Build styles
 */
import './index.css'

interface NoteData {
  title: string;
  message: string;
}

interface NoteConfig {
  titlePlaceholder?: string;
  messagePlaceholder?: string;
}

interface API {
  styles: {
    block: string;
    input: string;
  };
}

/**
 * @class Note
 * @classdesc Note Tool for Editor.js
 * @property {NoteData} data - Note Tool`s input and output data
 * @property {object} api - Editor.js API instance
 *
 * @typedef {object} NoteData
 * @description Note Tool`s input and output data
 * @property {string} title - note`s title
 * @property {string} message - note`s message
 *
 * @typedef {object} NoteConfig
 * @description Note Tool`s initial configuration
 * @property {string} titlePlaceholder - placeholder to show in note`s title input
 * @property {string} messagePlaceholder - placeholder to show in note`s message input
 */
export default class Note {
  api: API;
  readOnly: boolean;
  titlePlaceholder: string;
  messagePlaceholder: string;
  data: NoteData;

  /**
   * Notify core that read-only mode is supported
   */
  static get isReadOnlySupported() {
    return true
  }

  /**
   * Get Toolbox settings
   *
   * @public
   * @returns {string}
   */
  static get toolbox() {
    return {
      icon: IconCopy,
      title: 'Note',
    }
  }

  /**
   * Allow to press Enter inside the Warning
   *
   * @public
   * @returns {boolean}
   */
  static get enableLineBreaks() {
    return true
  }

  /**
   * Default placeholder for warning title
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_TITLE_PLACEHOLDER() {
    return 'Title'
  }

  /**
   * Default placeholder for warning message
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_MESSAGE_PLACEHOLDER() {
    return 'Message'
  }

  /**
   * Warning Tool`s styles
   *
   * @returns {object}
   */
  get CSS() {
    return {
      baseClass: this.api.styles.block,
      wrapper: 'cdx-note',
      title: 'cdx-note__title',
      input: this.api.styles.input,
      message: 'cdx-note__message',
    }
  }

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {NoteData} data — previously saved data
   * @param {NoteConfig} config — user config for Tool
   * @param {object} api - Editor.js API
   * @param {boolean} readOnly - read-only mode flag
   */
  constructor({ data, config, api, readOnly }: { data: NoteData; config: NoteConfig; api: API; readOnly: boolean }) {
    this.api = api
    this.readOnly = readOnly

    this.titlePlaceholder =
      config.titlePlaceholder || Note.DEFAULT_TITLE_PLACEHOLDER
    this.messagePlaceholder =
      config.messagePlaceholder || Note.DEFAULT_MESSAGE_PLACEHOLDER

    this.data = {
      title: data.title || '',
      message: data.message || '',
    }
  }

  /**
   * Create Warning Tool container with inputs
   *
   * @returns {Element}
   */
  render() {
    const container = this._make('div', [this.CSS.baseClass, this.CSS.wrapper])
    const title = this._make('div', [this.CSS.input, this.CSS.title], {
      contentEditable: !this.readOnly,
      innerHTML: this.data.title,
    })
    const message = this._make('div', [this.CSS.input, this.CSS.message], {
      contentEditable: !this.readOnly,
      innerHTML: this.data.message,
    })

    title.dataset.placeholder = this.titlePlaceholder
    message.dataset.placeholder = this.messagePlaceholder

    container.appendChild(title)
    container.appendChild(message)

    return container
  }

  /**
   * Extract Warning data from Warning Tool element
   *
   * @param {HTMLDivElement} noteElement - element to save
   * @returns {NoteData}
   */
  save(noteElement: HTMLElement) {
    const title = noteElement.querySelector(`.${this.CSS.title}`)
    const message = noteElement.querySelector(`.${this.CSS.message}`)

    return Object.assign(this.data, {
      title: title?.innerHTML || '',
      message: message?.innerHTML || '',
    })
  }

  /**
   * Helper for making Elements with attributes
   *
   * @param  {string} tagName           - new Element tag name
   * @param  {Array|string} classNames  - list or name of CSS classname(s)
   * @param  {object} attributes        - any attributes
   * @returns {Element}
   */
  _make(tagName: string, classNames: string[] | string | null = null, attributes: Record<string, any> = {}) {
    const el = document.createElement(tagName)

    if (Array.isArray(classNames)) {
      el.classList.add(...classNames)
    } else if (classNames) {
      el.classList.add(classNames)
    }

    for (const attrName in attributes) {
      if (Object.prototype.hasOwnProperty.call(attributes, attrName)) {
        if (attrName === 'innerHTML') {
          el.innerHTML = attributes[attrName];
        } else if (attrName === 'contentEditable') {
          el.contentEditable = attributes[attrName];
        } else {
          try {
            if (attrName in el) {
              (el as any)[attrName] = attributes[attrName];
            } else {
              el.setAttribute(attrName, attributes[attrName]);
            }
          } catch (e) {
            el.setAttribute(attrName, attributes[attrName]);
          }
        }
      }
    }

    return el
  }

  /**
   * Sanitizer config for Warning Tool saved data
   *
   * @returns {object}
   */
  static get sanitize() {
    return {
      title: {},
      message: {},
    }
  }
}
