import {
  BlockType,
  HeaderBlock,
  ParagraphBlock,
  ListBlock,
  ImageBlock,
  SimpleImageBlock,
  QuoteBlock,
  CodeBlock,
  EmbedBlock,
  FaqBlock,
  WarningBlock,
  TableBlock,
  ArticleBlock,
  NoteBlock,
  ChecklistBlock,
  StepsBlock,
} from '../../types/Block'

export type transforms = {
  [key: string]: any
  delimiter(): string
  header(block: HeaderBlock): string
  paragraph(block: ParagraphBlock): string
  list(block: ListBlock): string
  image(block: ImageBlock): string
  simpleImage(block: SimpleImageBlock): string
  quote(block: QuoteBlock): string
  code(block: CodeBlock): string
  embed(block: EmbedBlock): string
  faq(block: FaqBlock): string
  warning(block: WarningBlock): string
  table(block: TableBlock): string
  article(block: ArticleBlock): string
  note(block: NoteBlock): string
  checklist(block: ChecklistBlock): string
  steps(block: StepsBlock): string
}

const alignType = ['left', 'right', 'center', 'justify']

function processMarkdownLinks(message: string) {
  // Regex to find markdown links, optionally ending with a caret (^) for new tab
  const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s\)]+)(\^)?\)/g
  return message.replace(
    markdownLinkRegex,
    (match, text, url, newTabIndicator) => {
      // If there's a caret (^), open in a new tab, otherwise in the same tab
      const target = newTabIndicator
        ? ' target="_blank" rel="noopener noreferrer"'
        : ''
      return `<a href="${url}"${target}>${text}</a>`
    },
  )
}

const transforms: transforms = {
  delimiter: () => {
    return `<br/>`
  },

  header: (block: HeaderBlock) => {
    if (block.data.text === 'omit') return ''
    if (!block.data.level) {
      return ``
    } else if (block.data.level === 1) {
      return `<div id=${block.id}><h${block.data.level}>${block.data.text}</h${block.data.level}></div>`
    } else if (block.data.level < 4) {
      return `<div id=${block.id} style="margin-top: 24px;"><h${block.data.level} class="head_title">${block.data.text}</h${block.data.level}></div>`
    } else {
      return `<div id=${block.id} style="padding-top: 10px;"><h${block.data.level} style="color: #131313;">${block.data.text}</h${block.data.level}></div>`
    }
  },

  paragraph: (block: ParagraphBlock) => {
    const paragraphAlign = block.data.alignment || block.data.align

    if (
      typeof paragraphAlign !== 'undefined' &&
      alignType.includes(paragraphAlign)
    ) {
      return `<p style="text-align:${paragraphAlign};">${block.data.text}</p>`
    } else {
      return `<p>${block.data.text}</p>`
    }
  },

  list: (block: ListBlock) => {
    const listStyle = block.data.style === 'unordered' ? 'ul' : 'ol'

    const recursor = (items: any, listStyle: string) => {
      const list = items.map((item: any) => {
        if (!item.content && !item.items) return `<li>${item}</li>`

        let list = ''
        if (item.items) list = recursor(item.items, listStyle)
        if (item.content) return `<li> ${item.content} </li>` + list
      })

      return `<${listStyle}>${list.join('')}</${listStyle}>`
    }

    return recursor(block.data.items, listStyle)
  },

  image: (block: ImageBlock) => {
    let alt = block.data.caption ? block.data.caption : 'Image'
    if (block.data.caption === '') {
      return `<img loading="eager" src="${
        block.data.file && block.data.file.url
          ? block.data.file.url
          : block.data.url
      }" alt="${alt}" style="display: block; margin: 0 auto; max-width: 100%; height: auto;" /></br>`
    }
    return `<img loading="eager" src="${
      block.data.file && block.data.file.url
        ? block.data.file.url
        : block.data.url
    }" alt="${alt}" style="display: block; margin: 0 auto; max-width: 100%; height: auto;" />
    <p class="image-caption">${block.data.caption}</p>`
  },

  simpleImage: (block: SimpleImageBlock) => {
    let url = block.data.url
    let caption = block.data.caption ? block.data.caption : 'Image'
    return `<img loading="eager" src="${url}" alt="${caption}" style="display: block; margin: 0 auto; width: 100%; max-width: 750px; height: auto;" />
  <p class="image-caption">${caption}</p>`
  },

  quote: (block: QuoteBlock) => {
    return `<blockquote>${block.data.text}</blockquote> - ${block.data.caption}`
  },

  code: (block: CodeBlock) => {
    return `<pre><code>${block.data.code}</code></pre>`
  },

  warning: (block: WarningBlock) => {
    const processedMessage = processMarkdownLinks(block.data.message)
    return `<div style="background-color: #F0F2F6; border-left: 4px solid red; padding: 10px 10px; margin: 10px 0;">
              <div style="display: flex; align-items: center; padding-bottom: 5px">
                <span style="color: red;">⚠️</span>
                <div style="margin-left: 10px; font-weight: 600">${block.data.title}</div>
              </div>
              <p>${processedMessage}</p>
            </div>`
  },

  table: (block: TableBlock) => {
    let tableHtml = `<div style="overflow-x:auto; padding-top: 10px; padding-bottom: 15px"><table style="width:100%; border-collapse: collapse; border-top: 1px solid #e5e5e5;">`

    // Check if the table should have headings
    if (block.data.withHeadings) {
      tableHtml += `<thead><tr style="background-color: #f2f2f2;">`
      block.data.content[0].forEach((heading: string) => {
        tableHtml += `<th style="text-align: left; padding: 8px;">${heading}</th>`
      })
      tableHtml += `</tr></thead>`
    }

    // Add table body
    tableHtml += `<tbody>`
    // Start loop from 1 if there are headings, 0 otherwise
    const startRow = block.data.withHeadings ? 1 : 0
    // Loop through all rows except the last one
    for (let i = startRow; i < block.data.content.length - 1; i++) {
      tableHtml += `<tr>`
      block.data.content[i].forEach((cell: string) => {
        tableHtml += `<td style="text-align: left; padding: 8px; border-bottom: 1px solid #e5e5e5;">${cell}</td>`
      })
      tableHtml += `</tr>`
    }

    // Render the last row without a bottom border
    if (block.data.content.length > startRow) {
      // Ensure there's at least one row
      const lastRowIndex = block.data.content.length - 1
      tableHtml += `<tr>`
      block.data.content[lastRowIndex].forEach((cell: string) => {
        tableHtml += `<td style="text-align: left; padding: 8px;">${cell}</td>`
      })
      tableHtml += `</tr>`
    }

    tableHtml += `</tbody>`

    // Assuming the first row defines the number of columns
    const columnCount = block.data.content[0].length
    // Render the special div after the last row
    tableHtml += `<tfoot><tr><td colspan="${columnCount}" style="text-align: center; padding: 8px; position: relative;">
                    <div style="margin-top: 8px; width: 75px; height: 2px; background-color: #e5e5e5; margin-left: auto; margin-right: auto;"></div>
                  </td></tr></tfoot>`

    tableHtml += `</table></div>`

    return tableHtml
  },

  article: (block: ArticleBlock) => {
    return `<div style="background-color: #fcfcfc; padding-left: 10px; padding-bottom: 10px; margin-bottom: 10px; position: relative;">
              <div style="height: 7px; background-color: black; width: 75px; margin-bottom: 13px;"></div>
              <div style="display: flex; align-items: center;">
                <p style="font-weight: 600">${block.data.title}</p>
              </div>
              <a href=${block.data.href}>${block.data.text}</a>
            </div>`
  },

  note: (block: NoteBlock) => {
    const processedMessage = processMarkdownLinks(block.data.message)
    return `<div style="background-color: #fcfcfc; padding: 10px 10px; margin: 20px 0;">
              <div style="display: flex; align-items: center; padding-bottom: 5px">
                <span style="color: #0078d2;">★</span>
                <div style="margin-left: 10px; font-weight: 600">${block.data.title}</div>
              </div>
              <p>${processedMessage}</p>
            </div>`
  },

  checklist: (block: ChecklistBlock) => {
    const itemsList = block.data.items
      .map(
        (item: string) =>
          `<li style="list-style-type: none; position: relative; padding-left: 3px; margin-top: 5px; margin-bottom: 10px;"><span style="color: #00C853; margin-right: 17px;">✔</span>${item}</li>`,
      )
      .join('')
    return `<div style="background-color: #fcfcfc; padding: 10px 0px 10px 10px; margin: 20px 0;">
              <div style="display: flex; align-items: center; padding-bottom: 0px">
                <div style="margin-left: 10px; font-weight: 600">${block.data.title}</div>
              </div>
              <ul style="padding-left: 0; margin-top: 0px;">${itemsList}</ul>
            </div>`
  },

  steps: (block: StepsBlock) => {
    const numbersList = block.data.items
      .map(
        (_, index) => `
      <div style="height: 24px; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; position: relative;">
        <div style="width: 24px; height: 24px; background-color: yellow; color: black; text-align: center; line-height: 24px; font-weight: bold; position: relative; z-index: 2;">${
          index + 1
        }</div>
      </div>`,
      )
      .join('')

    const itemsList = block.data.items
      .map(
        (item: string) => `
      <div style="margin-bottom: 20px; display: flex; align-items: center;">
        ${item}
      </div>`,
      )
      .join('')

    return `<div style="background-color: #fcfcfc; padding: 10px 10px; margin: 20px 0; position: relative; border: 1px solid #eaeaea;">
              <div style="margin-left: 10px; font-weight: 600; margin-bottom: 20px;">${block.data.title}</div>
              <div style="display: flex; padding-left: 30px;">
                <div style="position: relative; flex-shrink: 0;">
                  ${numbersList}
                  <div style="position: absolute; left: 50%; top: 20px; bottom: 20px; width: 0; border-left: 2px dotted #ccc; transform: translateX(-50%); z-index: 1;"></div>
                </div>
                <div style="padding-left: 12px;">
                  ${itemsList}
                </div>
              </div>
            </div>`
  },

  embed: (block: EmbedBlock) => {
    switch (block.data.service) {
      case 'vimeo':
        return `<iframe src="${block.data.embed}" height="${block.data.height}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`
      case 'youtube':
        return `<iframe width="${block.data.width}" height="${block.data.height}" src="${block.data.embed}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      default:
        throw new Error('Only Youtube and Vime Embeds are supported right now.')
    }
  },

  faq: (block: FaqBlock) => {
    // We will render FAQ blocks as accordions elsewhere
    return ''
  },
}

export default transforms
