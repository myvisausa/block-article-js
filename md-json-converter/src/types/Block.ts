
export interface Block {
  type: string
}

export interface SimpleImageBlock extends Block {
  type: 'simpleImage'
  url: string
  caption: string
}

export interface ImageBlock extends Block {
  type: 'image'
  url: string
  caption: string
}

export interface ParagraphBlock extends Block {
  type: 'paragraph'
  text: string
}

export interface ListBlock extends Block {
  type: 'list'
  items: string[]
}

export interface CodeBlock extends Block {
  type: 'code'
  code: string
}

export interface WarningBlock extends Block {
  type: 'warning'
  title: string
  message: string
}

export interface TableBlock extends Block {
  type: 'table'
  content: string[][]
}

export interface ArticleBlock extends Block {
  type: 'article'
  content: string[][]
}

export interface NoteBlock extends Block {
  type: 'note'
  content: string[][]
}

export interface ChecklistBlock extends Block {
  type: 'checklist'
  items: string[]
}

export interface StepsBlock extends Block {
  type: 'steps'
  title: string
  items: string[]
}








