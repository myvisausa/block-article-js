import { BlockType, StepsBlock } from "../../../../../types/Block"

const parseSteps = (line: string): StepsBlock | null => {
  const stepsMatch = line.match(/\|STEPS title=(.+)\s+items=(.+)\s+STEPS\|/)
  if (stepsMatch) {
    return {
      type: BlockType.Steps,
      data: {
        title: stepsMatch[1],
        items: stepsMatch[2].split(',').map((item: string) => item.trim()),
      },
    }
  }
  return null
}

export default parseSteps
