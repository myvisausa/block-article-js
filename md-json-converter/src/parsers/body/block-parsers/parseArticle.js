const parseArticle = (line) => {
  const articleMatch = line.match(
    /\|ARTICLE title=(.+)\s+text=(.+)\s+href=(.+)\s+ARTICLE\|/,
  )
  if (articleMatch) {
    return {
      type: 'article',
      title: articleMatch[1],
      text: articleMatch[2],
      href: articleMatch[3],
    }
  }
}

export default parseArticle
