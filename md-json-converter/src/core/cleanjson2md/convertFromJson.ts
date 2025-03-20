import {
  BlockType,
  AnyBlock,
} from '../../../../types/Block'

const convertFromJSON = (
  jsonData: any,
): AnyBlock[] => {
  const blocks: any[] = []

  for (const block of jsonData.blocks) {
    if (block.type === BlockType.Header) {
      blocks.push({
        type: BlockType.Header,
        data: {
          text: block.data.text,
          level: block.data.level,
        },
      })
    } else if (block.type === BlockType.Image) {
      let url = block.data.url ? block.data.url : block.data.file.url
      blocks.push({
        type: BlockType.Image,
        data: {
          url: url,
          caption: block.data.caption,
        },
      })
    } else if (block.type === BlockType.SimpleImage) {
      blocks.push({
        type: BlockType.SimpleImage,
        data: {
          url: block.data.url,
          caption: block.data.caption,
        },
      })
    } else if (block.type === BlockType.Paragraph) {
      blocks.push({
        type: BlockType.Paragraph,
        data: {
          text: block.data.text,
        },
      })
    } else if (block.type === BlockType.List) {
      blocks.push({
        type: BlockType.List,
        data: {
          items: block.data.items,
        },
      })
    } else if (block.type === BlockType.Code) {
      blocks.push({
        type: BlockType.Code,
        data: {
          code: block.data.code,
        },
      })
    } else if (block.type === BlockType.Warning) {
      blocks.push({
        type: BlockType.Warning,
        data: {
          title: block.data.title,
          message: block.data.message,
        },
      })
    } else if (block.type === BlockType.Table) {
      blocks.push({
        type: BlockType.Table,
        data: {
          withHeadings: block.data.withHeadings,
          content: block.data.content,
        },
      })
    } else if (block.type === BlockType.Article) {
      blocks.push({
        type: BlockType.Article,
        data: {
          title: block.data.title,
          text: block.data.text,
          href: block.data.href,
        },
      })
    } else if (block.type === BlockType.Note) {
      blocks.push({
        type: BlockType.Note,
        data: {
          title: block.data.title,
          message: block.data.message,
        },
      })
    } else if (block.type === BlockType.Checklist) {
      blocks.push({
        type: BlockType.Checklist,
        data: {
          title: block.data.title,
          items: block.data.items,
        },
      })
    } else if (block.type === BlockType.Steps) {
      blocks.push({
        type: BlockType.Steps,
        data: {
          title: block.data.title,
          items: block.data.items,
        },
      })
    }
  }

  return blocks
}

export default convertFromJSON
