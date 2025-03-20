import { BlockType, HeaderBlock } from '../../../../../types/Block'
import { generateBlockId } from '../parseBlocks'

const parseHeader = (line: string): HeaderBlock | null => {
  const headerMatch = line.match(/^(#{1,6})\s(.+)$/)
  if (headerMatch) {
    return {
      type: BlockType.Header,
      id: generateBlockId(),
      data: {
        level: headerMatch[1].length,
        text: headerMatch[2],
      },
    }
  }
  return null
}

export default parseHeader
