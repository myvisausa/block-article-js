import { BlockType, HeaderBlock } from '../../../../types/Block'

const parseQuestion = (mdContent: string): HeaderBlock[] => {
  const blocks: HeaderBlock[] = []
  blocks.push({
    type: BlockType.Header,
    id: '',
    data: {
      level: 5,
      text: mdContent,
    },
  })
  return blocks
}

export default parseQuestion
