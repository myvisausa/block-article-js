const parseChecklist = (line) => {
  const checklistMatch = line.match(
    /\|CHECKLIST title=(.+)\s+items=(.+)\s+CHECKLIST\|/,
  )
  if (checklistMatch) {
    return {
      type: 'checklist',
      title: checklistMatch[1],
      items: checklistMatch[2].split(',').map((item) => item.trim()),
    }
  }
}

export default parseChecklist
