import {
  BlockType,
  SimpleImageBlock,
  HeaderBlock,
  ImageBlock,
  ParagraphBlock,
  ListBlock,
  CodeBlock,
  WarningBlock,
  TableBlock,
  ArticleBlock,
  NoteBlock,
  ChecklistBlock,
  StepsBlock,
} from '../../../../types/Block'

const blocksToMarkdown = (
  blocks:
    | SimpleImageBlock[]
    | HeaderBlock[]
    | ImageBlock[]
    | ParagraphBlock[]
    | ListBlock[]
    | CodeBlock[]
    | WarningBlock[]
    | TableBlock[]
    | ArticleBlock[]
    | NoteBlock[]
    | ChecklistBlock[]
    | StepsBlock[],
) => {
  let mdContent = ''

  for (const block of blocks) {
    if (block.type === BlockType.SimpleImage) {
      mdContent += `![${block.caption}](${block.url})\n<${block.caption}\n\n`
    } else if (block.type === BlockType.Header) {
      mdContent += `${'#'.repeat(block.level)} ${block.text}\n\n`
    } else if (block.type === BlockType.Image) {
      mdContent += `![${block.caption}](${block.url})\n<${block.caption}\n\n`
    } else if (block.type === BlockType.Paragraph) {
      let text = block.text

      // Convert <a> tags to markdown links
      text = text.replace(/<a href="([^"]+)">([^<]+)<\/a>/g, '[$2]($1)')

      // Convert <b> and <i> tags to markdown bold and italic syntax
      text = text.replace(/<b>([^<]+)<\/b>/g, '**$1**')
      text = text.replace(/<i>([^<]+)<\/i>/g, '*$1*')

      mdContent += `${text}\n\n`
    } else if (block.type === BlockType.List) {
      for (const item of block.items) {
        if (item.match(/^\d\.\s/)) {
          // Check for ordered list
          mdContent += `${item}\n`
        } else {
          mdContent += `- ${item}\n`
        }
      }
      mdContent += '\n'
    } else if (block.type === BlockType.Code) {
      mdContent += '```\n' + block.code + '\n```\n\n'
    } else if (block.type === BlockType.Warning) {
      mdContent += `|WARNING title=${block.title} message=${block.message} WARNING|\n\n`
    } else if (block.type === BlockType.Table) {
      const content = JSON.stringify(block.content)
      mdContent += `|TABLE withHeadings=${block.withHeadings} content=${content} TABLE|\n\n`
    } else if (block.type === BlockType.Article) {
      mdContent += `|ARTICLE title=${block.title} text=${block.text} href=${block.href} ARTICLE|\n\n`
    } else if (block.type === BlockType.Note) {
      mdContent += `|NOTE title=${block.title} message=${block.message} NOTE|\n\n`
    } else if (block.type === BlockType.Checklist) {
      mdContent += `|CHECKLIST title=${block.title} items=${block.items} CHECKLIST|\n\n`
    } else if (block.type === BlockType.Steps) {
      mdContent += `|STEPS title=${block.title} items=${block.items} STEPS|\n\n`
    }
  }

  return mdContent.trim()
}

export default blocksToMarkdown
