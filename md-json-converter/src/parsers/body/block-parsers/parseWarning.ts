import { BlockType, WarningBlock } from '../../../../../types/Block'
import { generateBlockId } from '../parseBlocks'

const parseWarning = (line: string): WarningBlock | null => {
  const warningMatch = line.match(
    /\|WARNING title=(.+)\s+message=(.+)\s+WARNING\|/,
  )
  if (warningMatch) {
    return {
      id: generateBlockId(),
      type: BlockType.Warning,
      data: {
        title: warningMatch[1],
        message: warningMatch[2],
      },
    }
  }
  return null
}

export default parseWarning
