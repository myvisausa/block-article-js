const blocksToMarkdown = (blocks) => {
  let mdContent = ''

  for (const block of blocks) {
    if (block.type === 'simpleImage') {
      mdContent += `![${block.caption}](${block.url})\n<${block.caption}\n\n`
    }
    if (block.type === 'header') {
      mdContent += `${'#'.repeat(block.level)} ${block.text}\n\n`
    } else if (block.type === 'image') {
      mdContent += `![${block.caption}](${block.url})\n<${block.caption}\n\n`
    } else if (block.type === 'paragraph') {
      let text = block.text

      // Convert <a> tags to markdown links
      text = text.replace(/<a href="([^"]+)">([^<]+)<\/a>/g, '[$2]($1)')

      // Convert <b> and <i> tags to markdown bold and italic syntax
      text = text.replace(/<b>([^<]+)<\/b>/g, '**$1**')
      text = text.replace(/<i>([^<]+)<\/i>/g, '*$1*')

      mdContent += `${text}\n\n`
    } else if (block.type === 'list') {
      for (const item of block.items) {
        if (item.match(/^\d\.\s/)) {
          // Check for ordered list
          mdContent += `${item}\n`
        } else {
          mdContent += `- ${item}\n`
        }
      }
      mdContent += '\n'
    } else if (block.type === 'code') {
      mdContent += '```\n' + block.code + '\n```\n\n'
    } else if (block.type === 'warning') {
      mdContent += `|WARNING title=${block.title} message=${block.message} WARNING|\n\n`
    } else if (block.type === 'table') {
      const content = JSON.stringify(block.content)
      mdContent += `|TABLE withHeadings=${block.withHeadings} content=${content} TABLE|\n\n`
    } else if (block.type === 'article') {
      mdContent += `|ARTICLE title=${block.title} text=${block.text} href=${block.href} ARTICLE|\n\n`
    } else if (block.type === 'note') {
      mdContent += `|NOTE title=${block.title} message=${block.message} NOTE|\n\n`
    } else if (block.type === 'checklist') {
      mdContent += `|CHECKLIST title=${block.title} items=${block.items} CHECKLIST|\n\n`
    } else if (block.type === 'steps') {
      mdContent += `|STEPS title=${block.title} items=${block.items} STEPS|\n\n`
    }
  }

  return mdContent.trim()
}

export default blocksToMarkdown
