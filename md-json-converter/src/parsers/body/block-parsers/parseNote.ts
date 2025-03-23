import { BlockType, NoteBlock } from '../../../../../types/Block'
import { generateBlockId } from '../../../../../src/generateBlockId'

const parseNote = (line: string): NoteBlock | null => {
  const noteMatch = line.match(/\|NOTE title=(.+)\s+message=(.+)\s+NOTE\|/)
  if (noteMatch) {
    return {
      id: generateBlockId(),
      type: BlockType.Note,
      data: {
        title: noteMatch[1],
        message: noteMatch[2],
      },
    }
  }
  return null
}

export default parseNote
