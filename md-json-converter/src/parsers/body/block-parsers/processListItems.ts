import { BlockType, ListBlock } from '../../../../../types/Block'

const processListItems = (listItems: string[]): ListBlock | null => {
  if (listItems.length) {
    return {
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
