import cloneDeep from 'lodash/cloneDeep'

export function blocksSplitter(data) {
  let blocks = data.blocks
  // Clone the original array to avoid mutating the input
  let clonedBlocks = [...blocks]
  let titleBlocks = []

  // Check if the first block meets the conditions
  if (clonedBlocks[0].type === 'header' && clonedBlocks[0].data.level === 1) {
    titleBlocks.push(clonedBlocks.shift())
  }

  let title = cloneDeep(data)
  title.blocks = titleBlocks

  let body = cloneDeep(data)
  body.blocks = clonedBlocks

  return {
    titleBlocks: title,
    bodyBlocks: body,
  }
}
