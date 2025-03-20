const processListItems = (listItems: string[]) => {
  if (listItems.length) {
    return {
      type: 'list',
      items: listItems.slice(),
    }
  }
}

export default processListItems
