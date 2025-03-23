import { BlockType, ImageBlock } from '../../../../../types/Block'
import { generateBlockId } from '../../../../../src/generateBlockId'

const parseImage = (line: string): ImageBlock | null => {
  const imageMatch = line.match(/!\[([^\]]+)\]\(([^)]+)\)/)
  if (imageMatch) {
    return {
      id: generateBlockId(),
      type: BlockType.Image,
      data: {
        url: imageMatch[2],
        caption: imageMatch[1],
        withBorder: false,
        stretched: false,
        withBackground: false,
        file: {
          url: imageMatch[2],
        },
      },
    }
  }
  return null
}

export default parseImage
