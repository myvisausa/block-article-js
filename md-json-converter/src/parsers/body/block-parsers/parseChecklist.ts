import { BlockType, ChecklistBlock } from '../../../../../types/Block'
import { generateBlockId } from '../../../../../src/generateBlockId'

const parseChecklist = (line: string): ChecklistBlock | null => {
  const checklistMatch = line.match(
    /\|CHECKLIST title=(.+)\s+items=(.+)\s+CHECKLIST\|/,
  )
  if (checklistMatch) {
    return {
      id: generateBlockId(),
      type: BlockType.Checklist,
      data: {
        title: checklistMatch[1],
        items: checklistMatch[2].split(',').map((item) => item.trim()),
      },
    }
  }
  return null
}

export default parseChecklist
