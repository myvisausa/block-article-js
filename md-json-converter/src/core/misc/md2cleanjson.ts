import parseMarkdown from '../md2cleanjson/parseMarkdown'
import parseBlocks from '../../parsers/body/parseBlocks'
import { AnyBlock } from '../../../../types/Block'


export default function md2cleanjson(markdownContent: string): AnyBlock[] {
  const blocks = parseMarkdown(markdownContent)
  const output = parseBlocks(blocks)
  return output
}
