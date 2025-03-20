const parseWarning = (line) => {
  const warningMatch = line.match(
    /\|WARNING title=(.+)\s+message=(.+)\s+WARNING\|/,
  )
  if (warningMatch) {
    return {
      type: 'warning',
      title: warningMatch[1],
      message: warningMatch[2],
    }
  }
}

export default parseWarning
