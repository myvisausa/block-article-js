import parseListItem from "./block-parsers/parseListItem.js";
import parseWarning from "./block-parsers/parseWarning.js";
import parseImage from "./block-parsers/parseImage.js";
import parseHeader from "./block-parsers/parseHeader.js";
import parseParagraph from "./block-parsers/parseParagraph.js";
import parseCodeBlock from "./block-parsers/parseCode.js";
import parseTable from "./block-parsers/parseTable.js";
import parseArticle from "./block-parsers/parseArticle.js";
import parseNote from "./block-parsers/parseNote.js";

import convertMdtoHtml from "./utils/convertMdToHtml.js";
import processListItems from "./block-parsers/processListItems.js";

const parseNotFaq = (mdContent) => {
    const blocks = [];
    let listItems = [];
    const lines = mdContent.split("\n");

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let block;

        // Check for code block first
        const codeBlockResult = parseCodeBlock(lines, i);
        if (codeBlockResult) {
            blocks.push(codeBlockResult.block);
            i = codeBlockResult.newIndex - 1;  // Update the index to after the code block, -1 since the loop will increment
            continue;
        }
        
        // Check for listItem and **listBlock** before header, otherwise header could be appended before list items, which is out of order
        const listItem = parseListItem(line);
        if (listItem) {
            listItems.push(convertMdtoHtml(listItem));
            continue;
        }
        const listBlock = processListItems(listItems);

        if (listBlock) {
            blocks.push(listBlock);
            listItems = [];
        }


        if (block = parseHeader(line)) {
            blocks.push(block);
            continue;
        }

        if (block = parseImage(line)) {
            blocks.push(block);
            continue;
        }

        if (block = parseWarning(line)) {
            blocks.push(block);
            continue;
        }

        if (block = parseTable(line)) {
            blocks.push(block);
            continue;
        }

        if (block = parseArticle(line)) {
            blocks.push(block);
            continue;
        }

        if (block = parseNote(line)) {
            blocks.push(block);
            continue;
        }

        if (line[0] === ">") {
            continue;
        }

        if (block = parseParagraph(line)) {
            blocks.push(block);
        }
    }

    const listBlock = processListItems(listItems);
    if (listBlock) {
        blocks.push(listBlock);
    }

    return blocks;
}

export default parseNotFaq;