const generateBlockId = () => {
  return Math.random().toString(36).substr(2, 10)
}

export default function parseMetadata(metadata) {
  let blocks = []
  const titleBlock = {
    id: generateBlockId(),
    type: 'header',
    data: {
      text: metadata.title,
      level: 1,
    },
  }
  blocks.push(titleBlock)

  if (metadata.ogImage !== '') {
    let ogImageBLock = {
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
