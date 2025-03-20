const parseNote = (line) => {
  const noteMatch = line.match(/\|NOTE title=(.+)\s+message=(.+)\s+NOTE\|/)
  if (noteMatch) {
    return {
      type: 'note',
      title: noteMatch[1],
      message: noteMatch[2],
    }
  }
}

export default parseNote
