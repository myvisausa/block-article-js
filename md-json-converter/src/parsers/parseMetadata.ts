import { generateBlockId } from '../../../src/generateBlockId'

export default function parseMetadata(metadata: any) {
  let blocks: any[] = []
  const titleBlock = {
    id: generateBlockId({
      type: 'header', 
      data: { text: metadata.title, level: 1 }
    }),
    type: 'header',
    data: {
      text: metadata.title,
      level: 1,
    },
  }
  blocks.push(titleBlock)

  if (metadata.ogImage !== '') {
    let ogImageBLock = {
      id: generateBlockId({
        type: 'simpleImage',
        data: {
          url: metadata.ogImage,
          alt: metadata.ogImageAlt,
          caption: metadata.ogImageCaption
        }
      }),
      type: 'simpleImage',
      data: {
        url: metadata.ogImage,
        alt: metadata.ogImageAlt,
        caption: metadata.ogImageCaption,
        withBorder: false,
        withBackground: false,
        stretched: false,
      },
    }
    blocks.push(ogImageBLock)
  }
  return blocks
}
