import parseListItem from './block-parsers/parseListItem'
import parseWarning from './block-parsers/parseWarning'
import parseImage from './block-parsers/parseImage'
import parseHeader from './block-parsers/parseHeader'
import parseParagraph from './block-parsers/parseParagraph'
import parseCodeBlock from './block-parsers/parseCode'
import parseTable from './block-parsers/parseTable'
import parseArticle from './block-parsers/parseArticle'
import parseNote from './block-parsers/parseNote'
import parseChecklist from './block-parsers/parseChecklist'
import parseSteps from './block-parsers/parseSteps'

import convertMdtoHtml from './utils/convertMdToHtml'
import processListItems from './block-parsers/processListItems'
import {
  SimpleImageBlock,
  HeaderBlock,
  ImageBlock,
  ParagraphBlock,
  ListBlock,
  CodeBlock,
  WarningBlock,
  TableBlock,
  ArticleBlock,
  NoteBlock,
  ChecklistBlock,
  StepsBlock,
} from '../../../../types/Block.js'

const parseNotFaq = (
  mdContent: string,
): (
  | SimpleImageBlock
  | HeaderBlock
  | ImageBlock
  | ParagraphBlock
  | ListBlock
  | CodeBlock
  | WarningBlock
  | TableBlock
  | ArticleBlock
  | NoteBlock
  | ChecklistBlock
  | StepsBlock
)[] => {
  const blocks: (
    | SimpleImageBlock
    | HeaderBlock
    | ImageBlock
    | ParagraphBlock
    | ListBlock
    | CodeBlock
    | WarningBlock
    | TableBlock
    | ArticleBlock
    | NoteBlock
    | ChecklistBlock
    | StepsBlock
  )[] = []

  let listItems = []
  const lines = mdContent.split('\n')

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]
    let block

    // Check for code block first
    const codeBlockResult = parseCodeBlock(lines, i)
    if (codeBlockResult) {
      blocks.push(codeBlockResult.block)
      i = codeBlockResult.newIndex - 1 // Update the index to after the code block, -1 since the loop will increment
      continue
    }

    // Check for listItem and **listBlock** before header, otherwise header could be appended before list items, which is out of order
    const listItem = parseListItem(line)
    if (listItem) {
      listItems.push(convertMdtoHtml(listItem))
      continue
    }
    const listBlock = processListItems(listItems)

    if (listBlock) {
      blocks.push(listBlock)
      listItems = []
    }

    if ((block = parseHeader(line))) {
      blocks.push(block)
      continue
    }

    if ((block = parseImage(line))) {
      blocks.push(block)
      continue
    }

    if ((block = parseWarning(line))) {
      blocks.push(block)
      continue
    }

    if ((block = parseTable(line))) {
      blocks.push(block)
      continue
    }

    if ((block = parseArticle(line))) {
      blocks.push(block)
      continue
    }

    if ((block = parseNote(line))) {
      blocks.push(block)
      continue
    }

    if ((block = parseChecklist(line))) {
      blocks.push(block)
      continue
    }

    if ((block = parseSteps(line))) {
      blocks.push(block)
      continue
    }

    if (line[0] === '>') {
      continue
    }

    if ((block = parseParagraph(line))) {
      blocks.push(block)
    }
  }

  const listBlock = processListItems(listItems)
  if (listBlock) {
    blocks.push(listBlock)
  }

  return blocks
}

export default parseNotFaq
