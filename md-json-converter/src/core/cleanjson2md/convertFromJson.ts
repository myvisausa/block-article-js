import {
  BlockType,
  SimpleImageBlock,
  HeaderBlock,
  ImageBlock,
  ParagraphBlock,
  ListBlock,
  CodeBlock,
  WarningBlock,
  TableBlock,
  ArticleBlock,
  NoteBlock,
  ChecklistBlock,
  StepsBlock,
} from '../../../../types/Block'

const convertFromJSON = (
  jsonData: any,
):
  | SimpleImageBlock[]
  | HeaderBlock[]
  | ImageBlock[]
  | ParagraphBlock[]
  | ListBlock[]
  | CodeBlock[]
  | WarningBlock[]
  | TableBlock[]
  | ArticleBlock[]
  | NoteBlock[]
  | ChecklistBlock[]
  | StepsBlock[] => {
  const blocks: any[] = []

  for (const block of jsonData.blocks) {
    if (block.type === BlockType.Header) {
      blocks.push({
        type: 'header',
        text: block.data.text,
        level: block.data.level,
      })
    } else if (block.type === BlockType.Image) {
      let url = block.data.url ? block.data.url : block.data.file.url
      blocks.push({
        type: 'image',
        url: url,
        caption: block.data.caption,
      })
    } else if (block.type === BlockType.SimpleImage) {
      blocks.push({
        type: 'simpleImage',
        url: block.data.url,
        caption: block.data.caption,
      })
    } else if (block.type === BlockType.Paragraph) {
      blocks.push({
        type: 'paragraph',
        text: block.data.text,
      })
    } else if (block.type === BlockType.List) {
      blocks.push({
        type: 'list',
        items: block.data.items,
      })
    } else if (block.type === BlockType.Code) {
      blocks.push({
        type: 'code',
        code: block.data.code,
      })
    } else if (block.type === BlockType.Warning) {
      blocks.push({
        type: 'warning',
        title: block.data.title,
        message: block.data.message,
      })
    } else if (block.type === BlockType.Table) {
      blocks.push({
        type: 'table',
        withHeadings: block.data.withHeadings,
        content: block.data.content,
      })
    } else if (block.type === BlockType.Article) {
      blocks.push({
        type: 'article',
        title: block.data.title,
        text: block.data.text,
        href: block.data.href,
      })
    } else if (block.type === BlockType.Note) {
      blocks.push({
        type: 'note',
        title: block.data.title,
        message: block.data.message,
      })
    } else if (block.type === BlockType.Checklist) {
      blocks.push({
        type: 'checklist',
        title: block.data.title,
        items: block.data.items,
      })
    } else if (block.type === BlockType.Steps) {
      blocks.push({
        type: 'steps',
        title: block.data.title,
        items: block.data.items,
      })
    }
  }

  return blocks
}

export default convertFromJSON
