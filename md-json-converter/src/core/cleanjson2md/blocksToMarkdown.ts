import { BlockType, AnyBlock } from '../../../../types/Block'

const blocksToMarkdown = (blocks: AnyBlock[]) => {
  let mdContent = ''

  for (const block of blocks) {
    if (block.type === BlockType.SimpleImage) {
      mdContent += `![${block.data.caption}](${block.data.url})\n<${block.data.caption}\n\n`
    } else if (block.type === BlockType.Header) {
      mdContent += `${'#'.repeat(block.data.level)} ${block.data.text}\n\n`
    } else if (block.type === BlockType.Image) {
      mdContent += `![${block.data.caption}](${block.data.url})\n<${block.data.caption}\n\n`
    } else if (block.type === BlockType.Paragraph) {
      let text = block.data.text

      // Convert <a> tags to markdown links
      text = text.replace(/<a href="([^"]+)">([^<]+)<\/a>/g, '[$2]($1)')

      // Convert <b> and <i> tags to markdown bold and italic syntax
      text = text.replace(/<b>([^<]+)<\/b>/g, '**$1**')
      text = text.replace(/<i>([^<]+)<\/i>/g, '*$1*')

      mdContent += `${text}\n\n`
    } else if (block.type === BlockType.List) {
      for (const item of block.data.items) {
        if (item.match(/^\d\.\s/)) {
          // Check for ordered list
          mdContent += `${item}\n`
        } else {
          mdContent += `- ${item}\n`
        }
      }
      mdContent += '\n'
    } else if (block.type === BlockType.Code) {
      mdContent += '```\n' + block.data.code + '\n```\n\n'
    } else if (block.type === BlockType.Warning) {
      mdContent += `|WARNING title=${block.data.title} message=${block.data.message} WARNING|\n\n`
    } else if (block.type === BlockType.Table) {
      const content = JSON.stringify(block.data.content)
      mdContent += `|TABLE withHeadings=${block.data.withHeadings} content=${content} TABLE|\n\n`
    } else if (block.type === BlockType.Article) {
      mdContent += `|ARTICLE title=${block.data.title} text=${block.data.text} href=${block.data.href} ARTICLE|\n\n`
    } else if (block.type === BlockType.Note) {
      mdContent += `|NOTE title=${block.data.title} message=${block.data.message} NOTE|\n\n`
    } else if (block.type === BlockType.Checklist) {
      mdContent += `|CHECKLIST title=${block.data.title} items=${block.data.items} CHECKLIST|\n\n`
    } else if (block.type === BlockType.Steps) {
      mdContent += `|STEPS title=${block.data.title} items=${block.data.items} STEPS|\n\n`
    }
  }

  return mdContent.trim()
}

export default blocksToMarkdown
