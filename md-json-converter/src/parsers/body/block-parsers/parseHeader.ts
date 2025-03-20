import { BlockType, HeaderBlock } from '../../../../../types/Block'

const parseHeader = (line: string): HeaderBlock | null => {
  const headerMatch = line.match(/^(#{1,6})\s(.+)$/)
  if (headerMatch) {
    return {
      type: BlockType.Header,
      level: headerMatch[1].length,
      text: headerMatch[2],
    }
  }
  return null
}

export default parseHeader
