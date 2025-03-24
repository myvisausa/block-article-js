import { generateBlockId } from '../../../../src/generateBlockId'

function makeid(length: number) {
  // Create a deterministic ID based on the current content count and length
  // The hash function inside generateBlockId will ensure uniqueness
  return generateBlockId({ type: 'section', data: { length } })
}

interface ContentSection {
  sectionId: string
  type: string
  header: string
  text: string
  summary: string
  lastEdited: string
  questions?: string[]
  answers?: string[]
}

export default function md2json(md_text: string) {
  const createTime = new Date().toISOString()

  let content: ContentSection[] = []

  // Split by headers to extract sections
  if (!md_text.startsWith('\n')) {
    md_text = '\n' + md_text
  }
  const sections = md_text.split('\n## ').slice(1)

  sections.forEach((sec: string) => {
    const headerEndIndex = sec.indexOf('\n') // Find the end of the header
    const header = sec.substring(0, headerEndIndex) // Get the header
    const text = sec.substring(headerEndIndex + 1) // Get the text after the header

    let contentDict: ContentSection = {
      sectionId: makeid(5),
      type: 'default',
      header: header,
      text: text,
      summary: '',
      lastEdited: createTime,
    }

    // If it's FAQ section
    if (header.includes('<faq>')) {
      contentDict.header = contentDict.header
        .replace('<faq>', '')
        .replace('</faq>', '')
      contentDict.type = 'faq'

      const questionRegex = /<question>\n?(.*?)\n?<\/question>/gs
      const answerRegex = /<answer>\n?(.*?)\n?<\/answer>/gs

      contentDict.questions = [...text.matchAll(questionRegex)].map((match) =>
        match[1].trim(),
      )
      contentDict.answers = [...text.matchAll(answerRegex)].map((match) =>
        match[1].trim(),
      )
    }

    content.push(contentDict)
  })

  return content
}
