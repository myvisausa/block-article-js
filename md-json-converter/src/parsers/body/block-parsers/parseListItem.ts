const parseListItem = (line: string) => {
  const listItemMatch = line.match(/-\s(.+)|\d\\s(.+)/)
  if (listItemMatch) {
    return listItemMatch[1] || listItemMatch[2]
  }
}

export default parseListItem
