import parseMarkdown from '../md2cleanjson/parseMarkdown'
import parseBlocks from '../../parsers/body/parseBlocks'
import { BlockData } from '../../../../types/BlockData'

export default function md2cleanjson(markdownContent: string): BlockData {
  const blocks = parseMarkdown(markdownContent)
  const output = parseBlocks(blocks)
  return output
}
