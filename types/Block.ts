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
  id: string
  data: {
    url: string
    caption: string
  }
}

export interface HeaderBlock {
  type: BlockType.Header
  id: string
  data: {
    level: number
    text: string
  }
}

export interface ImageBlock {
  type: BlockType.Image
  id: string
  data: {
    url: string
    caption: string
    withBorder: boolean
    stretched: boolean
    withBackground: boolean
    file: {
      url: string
    }
  }
}

export interface ParagraphBlock {
  type: BlockType.Paragraph
  id: string
  data: {
    text: string
    alignment?: string
    align?: string
  }
}

export interface ListBlock {
  type: BlockType.List
  id: string
  data: {
    items: string[]
    style: string
  }
}

export interface CodeBlock {
  type: BlockType.Code
  id: string
  data: {
    code: string
  }
}

export interface TableBlock {
  type: BlockType.Table
  id: string
  data: {
    content: string[][]
    withHeadings: boolean
  }
}

export interface ArticleBlock {
  type: BlockType.Article
  id: string
  data: {
    title: string
    text: string
    href: string
  }
}

export interface NoteBlock {
  type: BlockType.Note
  id: string
  data: {
    title: string
    message: string
  }
}

export interface ChecklistBlock {
  type: BlockType.Checklist
  id: string
  data: {
    title: string
    items: string[]
  }
}

export interface StepsBlock {
  type: BlockType.Steps
  id: string
  data: {
    title: string
    items: string[]
  }
}

export interface EmbedBlock {
  type: BlockType.Embed
  id: string
  data: {
    url: string
    caption: string
    service: string
    embed: string
    width: number
    height: number
  }
}

export interface FaqBlock {
  type: BlockType.Faq
  id: string
  data: {
    title: string
    items: string[]
  }
}

export interface WarningBlock {
  type: BlockType.Warning
  id: string
  data: {
    title: string
    message: string
  }
}

export interface QuoteBlock {
  type: BlockType.Quote
  id: string
  data: {
    text: string
    caption: string
  }
}

export type AnyBlock =
  | SimpleImageBlock
  | HeaderBlock
  | ImageBlock
  | ParagraphBlock
  | ListBlock
  | CodeBlock
  | TableBlock
  | ArticleBlock
  | NoteBlock
  | ChecklistBlock
  | StepsBlock
  | EmbedBlock
  | FaqBlock
  | WarningBlock
  | QuoteBlock
