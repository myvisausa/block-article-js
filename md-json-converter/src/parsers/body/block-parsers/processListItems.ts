import { BlockType, ListBlock } from '../../../../../types/Block'

const processListItems = (listItems: string[]): ListBlock | null => {
  if (listItems.length) {
    return {
      type: BlockType.List,
      items: listItems.slice(),
    }
  }
  return null
}

export default processListItems
