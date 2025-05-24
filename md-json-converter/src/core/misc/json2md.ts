import { ArticleData } from '../../../../types/ArticleData'

export default function json2md(data: ArticleData) {
  let markdown = ''

  for (const section of data.content) {
    if (section.type === 'default') {
      markdown += `## ${section.header}\n${section.text}\n`
    } else if (section.type === 'faq') {
      markdown += `## ${section.header}\n`
      if (section.questions && section.answers) {
        for (let i = 0; i < section.questions.length; i++) {
          markdown += `<question>\n${section.questions[i]}\n</question>\n`
          markdown += `<answer>\n${section.answers[i]}\n</answer>\n`
        }
      }
    }
  }

  return markdown
}
