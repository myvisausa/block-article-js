const convertMdtoHtml = (line: string): string => {
  // Replace bold markdown with HTML <b> tags
  line = line.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
  line = line.replace(/__(.*?)__/g, '<b>$1</b>')

  // Replace italic markdown with HTML <i> tags
  // Updated regex pattern for italics, accounting for edge cases and ignoring underscores in words/identifiers
  const italicRegex = /(?<!\w)(?<!\\)_([^\s_](?:.*?[^\s_])?)(?<!\\)_(?!\w)/g
  line = line.replace(italicRegex, function (match: string, content: string) {
    // The "content" captured group contains the text to be italicized
    return `<i>${content}</i>`
  })

  // Replace markdown links with HTML <a> tags
  line = line.replace(/\[([^\]]+)]\(([^)]+)\)/g, '<a href="$2">$1</a>')

  return line
}

export default convertMdtoHtml
