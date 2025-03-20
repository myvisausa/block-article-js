const parseImage = (line: string) => {
  const imageMatch = line.match(/!\[([^\]]+)\]\(([^)]+)\)/)
  if (imageMatch) {
    return {
      type: 'image',
      url: imageMatch[2],
      caption: imageMatch[1],
    }
  }
}

export default parseImage
