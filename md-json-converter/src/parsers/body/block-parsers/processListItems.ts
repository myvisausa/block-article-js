import { BlockType, ListBlock } from '../../../../../types/Block'
import { generateBlockId } from '../../../../../src/generateBlockId'

const processListItems = (listItems: string[]): ListBlock | null => {
  if (listItems.length) {
    return {
      id: generateBlockId(),
      type: BlockType.List,
      data: {
        items: listItems.slice(),
        style: 'bullet',
      },
    }
  }
  return null
}

export default processListItems
