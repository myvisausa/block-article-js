export enum BlockType {
  SimpleImage = 'simpleImage',
  Header = 'header',
  Image = 'image',
  Paragraph = 'paragraph',
  List = 'list',
  Code = 'code',
  Warning = 'warning',
  Table = 'table',
  Article = 'article',
  Note = 'note',
  Checklist = 'checklist',
  Steps = 'steps',
  Embed = 'embed',
  Faq = 'faq',
  Quote = 'quote',
}

export interface SimpleImageBlock {
  type: BlockType.SimpleImage
  url: string
  caption: string
}

export interface HeaderBlock {
  type: BlockType.Header
  level: number
  text: string
}

export interface ImageBlock {
  type: BlockType.Image
  url: string
  caption: string
  file: {
    url: string
  }
}

export interface ParagraphBlock {
  type: BlockType.Paragraph
  text: string
  alignment: string
  align: string
}

export interface ListBlock {
  type: BlockType.List
  items: string[]
  style: string
}

export interface CodeBlock {
  type: BlockType.Code
  code: string
}

export interface TableBlock {
  type: BlockType.Table
  content: string[][]
  withHeadings: boolean
}

export interface ArticleBlock {
  type: BlockType.Article
  title: string
  text: string
  href: string
}

export interface NoteBlock {
  type: BlockType.Note
  title: string
  message: string
}

export interface ChecklistBlock {
  type: BlockType.Checklist
  title: string
  items: string[]
}

export interface StepsBlock {
  type: BlockType.Steps
  title: string
  items: string[]
}

export interface EmbedBlock {
  type: BlockType.Embed
  url: string
  caption: string
  service: string
  embed: string
  width: number
  height: number
}

export interface FaqBlock {
  type: BlockType.Faq
  title: string
  items: string[]
}


export interface WarningBlock {
  type: BlockType.Warning
  title: string
  message: string
}

export interface QuoteBlock {
  type: BlockType.Quote
  text: string
  caption: string
}

export type AnyBlock = SimpleImageBlock | HeaderBlock | ImageBlock | ParagraphBlock | ListBlock | CodeBlock | TableBlock | ArticleBlock | NoteBlock | ChecklistBlock | StepsBlock | EmbedBlock | FaqBlock | WarningBlock | QuoteBlock