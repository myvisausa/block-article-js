import convertMdtoHtml from '../utils/convertMdToHtml'
import { BlockType, ParagraphBlock } from '../../../../../types/Block'

function containsInvalidTag(str: string) {
  // This regex looks for a string that starts with < and is followed by any character
  // other than a space or > (which could indicate a valid tag), and is not closed by >
  // This is used to detect the markdown caption character '<', and only render the caption specifcally with the image
  // And not accidentally on the next line of text while potentially being detected as an invalid tag
  const invalidTagRegex = /<[^ >]+[^>]*$/
  return invalidTagRegex.test(str)
}

const parseParagraph = (line: string): ParagraphBlock | null => {
  if (containsInvalidTag(line)) {
    return null
  }
  line = line.trim()
  if (line.length > 0) {
    line = convertMdtoHtml(line)
    return {
      type: BlockType.Paragraph,
      data: {
        text: line,
      },
    }
  }
  return null // Return null if the line is empty
}

export default parseParagraph
