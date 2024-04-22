const parseListItem = (line) => {
    const listItemMatch = line.match(/-\s(.+)|\d\\s(.+)/);
    if (listItemMatch) {
        return listItemMatch[1] || listItemMatch[2];
    }
};

export default parseListItem;