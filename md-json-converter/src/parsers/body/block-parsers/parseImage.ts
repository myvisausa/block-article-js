import { BlockType, ImageBlock } from '../../../../../types/Block'

const parseImage = (line: string): ImageBlock | null => {
  const imageMatch = line.match(/!\[([^\]]+)\]\(([^)]+)\)/)
  if (imageMatch) {
    return {
      type: BlockType.Image,
      data: {
        url: imageMatch[2],
        caption: imageMatch[1],
        file: {
          url: imageMatch[2],
        },
      },
    }
  }
  return null
}

export default parseImage
