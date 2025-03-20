import parseMarkdown from '../md2cleanjson/parseMarkdown.js'
import parseBlocks from '../../parsers/body/parseBlocks.js'

export default function md2cleanjson(markdownContent: string) {
  const blocks = parseMarkdown(markdownContent)
  const output = parseBlocks(blocks)
  return JSON.stringify(output, null, 2)
}
