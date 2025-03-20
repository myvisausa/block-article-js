import blocksToMarkdown from './blocksToMarkdown'
import convertFromJSON from './convertFromJson'

export default function cleanjson2md(data: any) {
  const blocks = convertFromJSON(data)
  const markdown = blocksToMarkdown(blocks)
  return markdown
}
