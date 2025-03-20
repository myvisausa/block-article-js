const parseHeader = (line) => {
  const headerMatch = line.match(/^(#{1,6})\s(.+)$/)
  if (headerMatch) {
    return {
      type: 'header',
      level: headerMatch[1].length,
      text: headerMatch[2],
    }
  }
}

export default parseHeader
