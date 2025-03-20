import { BlockType, WarningBlock } from "../../../../../types/Block"

const parseWarning = (line: string): WarningBlock | null => {
  const warningMatch = line.match(
    /\|WARNING title=(.+)\s+message=(.+)\s+WARNING\|/,
  )
  if (warningMatch) {
    return {
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
