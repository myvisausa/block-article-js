import { BlockType, AnyBlock } from '../../../../types/Block'
import { BlockData } from '../../../../types/BlockData'

// BlockIdGenerator.ts
export const generateBlockId = () => Math.random().toString(36).substring(2, 12)

// BlockFactory.js
class BlockFactory {
  static createBlock(block: AnyBlock): AnyBlock {
    const id = generateBlockId()

    switch (block.type) {
      case BlockType.Header:
        return { 
          id,
          type: BlockType.Header, 
          data: { text: block.data.text, level: block.data.level } 
        }
      case BlockType.Image:
        return {
          id,
          type: BlockType.Image,
          data: {
            url: block.data.file.url,
            file: { url: block.data.file.url },
            caption: block.data.caption,
            withBorder: false,
            stretched: false,
            withBackground: false,
          },
        }
      case BlockType.Paragraph:
        return { 
          id,
          type: BlockType.Paragraph, 
          data: { text: block.data.text } 
        }
      case BlockType.List:
        return { 
          id,
          type: BlockType.List, 
          data: { style: 'ordered', items: block.data.items } 
        }
      case BlockType.Code:
        return { 
          id,
          type: BlockType.Code, 
          data: { code: block.data.code } 
        }
      case BlockType.Warning:
        return {
          id,
          type: BlockType.Warning,
          data: { title: block.data.title, message: block.data.message },
        }
      case BlockType.Table:
        return {
          id,
          type: BlockType.Table,
          data: { withHeadings: block.data.withHeadings, content: block.data.content },
        }
      case BlockType.Article:
        return {
          id,
          type: BlockType.Article,
          data: { title: block.data.title, text: block.data.text, href: block.data.href },
        }
      case BlockType.Note:
        return {
          id,
          type: BlockType.Note,
          data: { title: block.data.title, message: block.data.message },
        }
      case BlockType.Checklist:
        return {
          id,
          type: BlockType.Checklist,
          data: { title: block.data.title, items: block.data.items },
        }
      case BlockType.Steps:
        return {
          id,
          type: BlockType.Steps,
          data: { title: block.data.title, items: block.data.items },
        }
      case BlockType.Quote:
        return {
          id,
          type: BlockType.Quote,
          data: { text: block.data.text, caption: block.data.caption },
        }
      default:
        throw new Error('Unsupported block type')
    }
  }
}


export default function parseBlocks(blocks: AnyBlock[]): BlockData {
  const data = {
    time: Date.now(),
    blocks: blocks.map((block: AnyBlock) => BlockFactory.createBlock(block)),
    version: '2.28.2',
  }
  return data
}
