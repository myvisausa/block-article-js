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
} from '../../types/Block';

export type transforms = {
  [key: string]: any
  delimiter(): string
  header({data, id}: {data: HeaderBlock, id: string}): string
  paragraph({data, id}: {data: ParagraphBlock, id: string}): string
  list({data, id}: {data: ListBlock, id: string}): string
  image({data, id}: {data: ImageBlock, id: string}): string
  simpleImage({data, id}: {data: SimpleImageBlock, id: string}): string
  quote({data, id}: {data: QuoteBlock, id: string}): string
  code({data, id}: {data: CodeBlock, id: string}): string
  embed({data, id}: {data: EmbedBlock, id: string}): string
  faq({data, id}: {data: FaqBlock, id: string}): string
  warning({data, id}: {data: WarningBlock, id: string}): string
  table({data, id}: {data: TableBlock, id: string}): string
  article({data, id}: {data: ArticleBlock, id: string}): string
  note({data, id}: {data: NoteBlock, id: string}): string
  checklist({data, id}: {data: ChecklistBlock, id: string}): string
  steps({data, id}: {data: StepsBlock, id: string}): string
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

  header: ({ data, id }) => {
    if (data.text === 'omit') return ''
    if (!data.level) {
      return ``
    } else if (data.level === 1) {
      return `<div id=${id}><h${data.level}>${data.text}</h${data.level}></div>`
    } else if (data.level < 4) {
      return `<div id=${id} style="margin-top: 24px;"><h${data.level} class="head_title">${data.text}</h${data.level}></div>`
    } else {
      return `<div id=${id} style="padding-top: 10px;"><h${data.level} style="color: #131313;">${data.text}</h${data.level}></div>`
    }
  },

  paragraph: ({ data, id }: { data: ParagraphBlock; id: string }) => {
    const paragraphAlign = data.alignment || data.align

    if (
      typeof paragraphAlign !== 'undefined' &&
      alignType.includes(paragraphAlign)
    ) {
      return `<p style="text-align:${paragraphAlign};">${data.text}</p>`
    } else {
      return `<p>${data.text}</p>`
    }
  },

  list: ({ data, id }: { data: ListBlock; id: string }) => {
    const listStyle = data.style === 'unordered' ? 'ul' : 'ol'

    const recursor = (items: any, listStyle: string) => {
      const list = items.map((item: any) => {
        if (!item.content && !item.items) return `<li>${item}</li>`

        let list = ''
        if (item.items) list = recursor(item.items, listStyle)
        if (item.content) return `<li> ${item.content} </li>` + list
      })

      return `<${listStyle}>${list.join('')}</${listStyle}>`
    }

    return recursor(data.items, listStyle)
  },

  image: ({ data, id }: { data: ImageBlock; id: string }) => {
    let alt = data.caption ? data.caption : 'Image'
    if (data.caption === '') {
      return `<img loading="eager" src="${
        data.file && data.file.url ? data.file.url : data.url
      }" alt="${alt}" style="display: block; margin: 0 auto; max-width: 100%; height: auto;" /></br>`
    }
    return `<img loading="eager" src="${
      data.file && data.file.url ? data.file.url : data.url
    }" alt="${alt}" style="display: block; margin: 0 auto; max-width: 100%; height: auto;" />
    <p class="image-caption">${data.caption}</p>`
  },

  simpleImage: ({ data, id }: { data: SimpleImageBlock; id: string }) => {
    let url = data.url
    let caption = data.caption ? data.caption : 'Image'
    return `<img loading="eager" src="${url}" alt="${caption}" style="display: block; margin: 0 auto; width: 100%; max-width: 750px; height: auto;" />
  <p class="image-caption">${caption}</p>`
  },

  quote: ({ data, id }: { data: QuoteBlock; id: string }) => {
    return `<blockquote>${data.text}</blockquote> - ${data.caption}`
  },

  code: ({ data, id }: { data: CodeBlock; id: string }) => {
    return `<pre><code>${data.code}</code></pre>`
  },

  warning: ({ data, id }: { data: WarningBlock; id: string }) => {
    const processedMessage = processMarkdownLinks(data.message)
    return `<div style="background-color: #F0F2F6; border-left: 4px solid red; padding: 10px 10px; margin: 10px 0;">
              <div style="display: flex; align-items: center; padding-bottom: 5px">
                <span style="color: red;">⚠️</span>
                <div style="margin-left: 10px; font-weight: 600">${data.title}</div>
              </div>
              <p>${processedMessage}</p>
            </div>`
  },

  table: ({ data, id }: { data: TableBlock; id: string }) => {
    let tableHtml = `<div style="overflow-x:auto; padding-top: 10px; padding-bottom: 15px"><table style="width:100%; border-collapse: collapse; border-top: 1px solid #e5e5e5;">`

    // Check if the table should have headings
    if (data.withHeadings) {
      tableHtml += `<thead><tr style="background-color: #f2f2f2;">`
      data.content[0].forEach((heading) => {
        tableHtml += `<th style="text-align: left; padding: 8px;">${heading}</th>`
      })
      tableHtml += `</tr></thead>`
    }

    // Add table body
    tableHtml += `<tbody>`
    // Start loop from 1 if there are headings, 0 otherwise
    const startRow = data.withHeadings ? 1 : 0
    // Loop through all rows except the last one
    for (let i = startRow; i < data.content.length - 1; i++) {
      tableHtml += `<tr>`
      data.content[i].forEach((cell) => {
        tableHtml += `<td style="text-align: left; padding: 8px; border-bottom: 1px solid #e5e5e5;">${cell}</td>`
      })
      tableHtml += `</tr>`
    }

    // Render the last row without a bottom border
    if (data.content.length > startRow) {
      // Ensure there's at least one row
      const lastRowIndex = data.content.length - 1
      tableHtml += `<tr>`
      data.content[lastRowIndex].forEach((cell) => {
        tableHtml += `<td style="text-align: left; padding: 8px;">${cell}</td>`
      })
      tableHtml += `</tr>`
    }

    tableHtml += `</tbody>`

    // Assuming the first row defines the number of columns
    const columnCount = data.content[0].length
    // Render the special div after the last row
    tableHtml += `<tfoot><tr><td colspan="${columnCount}" style="text-align: center; padding: 8px; position: relative;">
                    <div style="margin-top: 8px; width: 75px; height: 2px; background-color: #e5e5e5; margin-left: auto; margin-right: auto;"></div>
                  </td></tr></tfoot>`

    tableHtml += `</table></div>`

    return tableHtml
  },

  article: ({ data, id }: { data: ArticleBlock; id: string }) => {
    return `<div style="background-color: #fcfcfc; padding-left: 10px; padding-bottom: 10px; margin-bottom: 10px; position: relative;">
              <div style="height: 7px; background-color: black; width: 75px; margin-bottom: 13px;"></div>
              <div style="display: flex; align-items: center;">
                <p style="font-weight: 600">${data.title}</p>
              </div>
              <a href=${data.href}>${data.text}</a>
            </div>`
  },

  note: ({ data, id }: { data: NoteBlock; id: string }) => {
    const processedMessage = processMarkdownLinks(data.message)
    return `<div style="background-color: #fcfcfc; padding: 10px 10px; margin: 20px 0;">
              <div style="display: flex; align-items: center; padding-bottom: 5px">
                <span style="color: #0078d2;">★</span>
                <div style="margin-left: 10px; font-weight: 600">${data.title}</div>
              </div>
              <p>${processedMessage}</p>
            </div>`
  },

  checklist: ({ data, id }: { data: ChecklistBlock; id: string }) => {
    const itemsList = data.items
      .map(
        (item) =>
          `<li style="list-style-type: none; position: relative; padding-left: 3px; margin-top: 5px; margin-bottom: 10px;"><span style="color: #00C853; margin-right: 17px;">✔</span>${item}</li>`,
      )
      .join('')
    return `<div style="background-color: #fcfcfc; padding: 10px 0px 10px 10px; margin: 20px 0;">
              <div style="display: flex; align-items: center; padding-bottom: 0px">
                <div style="margin-left: 10px; font-weight: 600">${data.title}</div>
              </div>
              <ul style="padding-left: 0; margin-top: 0px;">${itemsList}</ul>
            </div>`
  },

  steps: ({ data, id }: { data: StepsBlock; id: string }) => {
    const numbersList = data.items
      .map(
        (_, index) => `
      <div style="height: 24px; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; position: relative;">
        <div style="width: 24px; height: 24px; background-color: yellow; color: black; text-align: center; line-height: 24px; font-weight: bold; position: relative; z-index: 2;">${
          index + 1
        }</div>
      </div>`,
      )
      .join('')

    const itemsList = data.items
      .map(
        (item) => `
      <div style="margin-bottom: 20px; display: flex; align-items: center;">
        ${item}
      </div>`,
      )
      .join('')

    return `<div style="background-color: #fcfcfc; padding: 10px 10px; margin: 20px 0; position: relative; border: 1px solid #eaeaea;">
              <div style="margin-left: 10px; font-weight: 600; margin-bottom: 20px;">${data.title}</div>
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

  embed: ({ data, id }: { data: EmbedBlock; id: string }) => {
    switch (data.service) {
      case 'vimeo':
        return `<iframe src="${data.embed}" height="${data.height}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`
      case 'youtube':
        return `<iframe width="${data.width}" height="${data.height}" src="${data.embed}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      default:
        throw new Error('Only Youtube and Vime Embeds are supported right now.')
    }
  },

  faq: ({ data, id }: { data: FaqBlock; id: string } ) => {
    // We will render FAQ blocks as accordions elsewhere
    return ''
  },
}

export default transforms
