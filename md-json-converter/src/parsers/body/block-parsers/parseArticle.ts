import { BlockType, ArticleBlock } from "../../../../../types/Block"

const parseArticle = (line: string): ArticleBlock | null => {
  const articleMatch = line.match(
    /\|ARTICLE title=(.+)\s+text=(.+)\s+href=(.+)\s+ARTICLE\|/,
  )
  if (articleMatch) {
    return {
      type: BlockType.Article,
      data: {
        title: articleMatch[1],
        text: articleMatch[2],
        href: articleMatch[3],
      },
    }
  }
  return null
}

export default parseArticle
