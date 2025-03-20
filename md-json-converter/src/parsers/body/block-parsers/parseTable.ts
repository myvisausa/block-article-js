import { BlockType, TableBlock } from "../../../../../types/Block"

const parseTable = (line: string): TableBlock | null => {
  const tableMatch = line.match(
    /\|TABLE withHeadings=(true|false) content=(\[\[.+?\]\]) TABLE\|/,
  )
  if (tableMatch) {
    try {
      // Since the content is in a JSON-like format, we can parse it directly after replacing single quotes with double quotes if necessary
      const content = JSON.parse(tableMatch[2].replace(/'/g, '"'))
      return {
        type: BlockType.Table,
        data: {
          withHeadings: tableMatch[1] === 'true', // Convert string to boolean
          content: content,
        },
      }
    } catch (error) {
      console.error('Error parsing table content:', error)
      return null // or handle the error as appropriate for your application
    }
  }
  return null
}

export default parseTable
