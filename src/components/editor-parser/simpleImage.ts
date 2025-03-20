const simpleImage = ({ block }: { block: any }) => {
  const { url, caption } = block

  return `<img src="${url}" alt="${caption}" />`
}

export default simpleImage
