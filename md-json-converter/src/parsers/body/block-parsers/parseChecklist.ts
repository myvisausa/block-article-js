import { BlockType, ChecklistBlock } from "../../../../../types/Block"

const parseChecklist = (line: string): ChecklistBlock | null => {
  const checklistMatch = line.match(
    /\|CHECKLIST title=(.+)\s+items=(.+)\s+CHECKLIST\|/,
  )
  if (checklistMatch) {
    return {
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
