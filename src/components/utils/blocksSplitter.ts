import cloneDeep from 'lodash/cloneDeep'
import { AnyBlock } from '../../../types/Block'

export function blocksSplitter(data: { blocks: AnyBlock[] }) {
  let blocks = data.blocks
  // Clone the original array to avoid mutating the input
  let clonedBlocks = [...blocks]
  let titleBlocks = []

  // Check if the first block meets the conditions
  if (clonedBlocks[0].type === 'header' && clonedBlocks[0].data.level === 1) {
    titleBlocks.push(clonedBlocks.shift())
  }

  let title = cloneDeep(data)
  title.blocks = titleBlocks as AnyBlock[]

  let body = cloneDeep(data)
  body.blocks = clonedBlocks as AnyBlock[]

  return {
    titleBlocks: title,
    bodyBlocks: body,
  }
}
