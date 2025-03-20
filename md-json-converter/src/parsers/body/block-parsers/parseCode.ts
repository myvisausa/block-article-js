import { BlockType, CodeBlock } from '../../../../../types/Block'

interface CodeBlockResult {
  block: CodeBlock
  newIndex: number
}

const parseCodeBlock = (
  lines: string[],
  currentIndex: number,
): CodeBlockResult | null => {
  if (lines[currentIndex].trim() === '```') {
    let codeLines: string[] = []
    currentIndex++ // Move to next line
    while (
      currentIndex < lines.length &&
      lines[currentIndex].trim() !== '```'
    ) {
      codeLines.push(lines[currentIndex])
      currentIndex++
    }
    if (currentIndex < lines.length) {
      currentIndex++ // Skip the ending ```
    }
    return {
      block: {
        type: BlockType.Code,
        data: {
          code: codeLines.join('\n'),
        },
      },
      newIndex: currentIndex, // return the updated index
    }
  }
  return null // Not a code block
}

export default parseCodeBlock
