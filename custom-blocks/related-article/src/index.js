/**
 * Import Tool's icon
 */
import { IconClipboard } from '@codexteam/icons'

/**
 * Build styles
 */
import './index.css'

/**
 * @class RelatedArticle
 * @classdesc RelatedArticle Tool for Editor.js
 * @property {RelatedArticleData} data - RelatedArticle Tool`s input and output data
 * @property {object} api - Editor.js API instance
 *
 * @typedef {object} RelatedArticleData
 * @description RelatedArticle Tool`s input and output data
 * @property {string} title - article's title
 * @property {string} text - warning`s text
 * @property {string} href - warning`s href
 *
 * @typedef {object} RelatedArticleConfig
 * @description RelatedArticle Tool`s initial configuration
 * @property {string} titlePlaceholder - placeholder to show in article's title input
 * @property {string} textPlaceholder - placeholder to show in warning`s text input
 * @property {string} hrefPlaceholder - placeholder to show in warning`s href input
 */
export default class RelatedArticle {
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
      icon: IconClipboard,
      text: 'RelatedArticle',
    }
  }

  /**
   * Allow to press Enter inside the RelatedArticle
   *
   * @public
   * @returns {boolean}
   */
  static get enableLineBreaks() {
    return true
  }

  /**
   * Default placeholder for title
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_TITLE_PLACEHOLDER() {
    return 'Title'
  }

  /**
   * Default placeholder for warning text
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_TEXT_PLACEHOLDER() {
    return 'Text'
  }

  /**
   * Default placeholder for warning href
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_MESSAGE_PLACEHOLDER() {
    return 'Hyperlink'
  }

  /**
   * RelatedArticle Tool`s styles
   *
   * @returns {object}
   */
  get CSS() {
    return {
      baseClass: this.api.styles.block,
      wrapper: 'cdx-article',
      title: 'cdx-article__title',
      text: 'cdx-article__text',
      input: this.api.styles.input,
      href: 'cdx-article__href',
    }
  }

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {RelatedArticleData} data — previously saved data
   * @param {RelatedArticleConfig} config — user config for Tool
   * @param {object} api - Editor.js API
   * @param {boolean} readOnly - read-only mode flag
   */
  constructor({ data, config, api, readOnly }) {
    this.api = api
    this.readOnly = readOnly

    this.titlePlaceholder =
      config.titlePlaceholder || RelatedArticle.DEFAULT_TITLE_PLACEHOLDER
    this.textPlaceholder =
      config.textPlaceholder || RelatedArticle.DEFAULT_TEXT_PLACEHOLDER
    this.hrefPlaceholder =
      config.hrefPlaceholder || RelatedArticle.DEFAULT_MESSAGE_PLACEHOLDER

    this.data = {
      title: data.title || '',
      text: data.text || '',
      href: data.href || '',
    }
  }

  /**
   * Create RelatedArticle Tool container with inputs
   *
   * @returns {Element}
   */
  render() {
    const container = this._make('div', [this.CSS.baseClass, this.CSS.wrapper])
    const title = this._make('div', [this.CSS.input, this.CSS.title], {
      contentEditable: !this.readOnly,
      innerHTML: this.data.title,
    })
    const text = this._make('div', [this.CSS.input, this.CSS.text], {
      contentEditable: !this.readOnly,
      innerHTML: this.data.text,
    })
    const href = this._make('div', [this.CSS.input, this.CSS.href], {
      contentEditable: !this.readOnly,
      innerHTML: this.data.href,
    })

    title.dataset.placeholder = this.titlePlaceholder
    text.dataset.placeholder = this.textPlaceholder
    href.dataset.placeholder = this.hrefPlaceholder

    container.appendChild(title)
    container.appendChild(text)
    container.appendChild(href)

    return container
  }

  /**
   * Extract RelatedArticle data from RelatedArticle Tool element
   *
   * @param {HTMLDivElement} warningElement - element to save
   * @returns {RelatedArticleData}
   */
  save(warningElement) {
    const title = warningElement.querySelector(`.${this.CSS.title}`)
    const text = warningElement.querySelector(`.${this.CSS.text}`)
    const href = warningElement.querySelector(`.${this.CSS.href}`)

    return Object.assign(this.data, {
      title: title.innerHTML,
      text: text.innerHTML,
      href: href.innerHTML,
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
  _make(tagName, classNames = null, attributes = {}) {
    const el = document.createElement(tagName)

    if (Array.isArray(classNames)) {
      el.classList.add(...classNames)
    } else if (classNames) {
      el.classList.add(classNames)
    }

    for (const attrName in attributes) {
      el[attrName] = attributes[attrName]
    }

    return el
  }

  /**
   * Sanitizer config for RelatedArticle Tool saved data
   *
   * @returns {object}
   */
  static get sanitize() {
    return {
      title: {},
      text: {},
      href: {},
    }
  }
}
