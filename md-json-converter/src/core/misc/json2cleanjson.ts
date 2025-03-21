import json2md from './json2md'
import md2cleanjson from './md2cleanjson'
import parseMetadata from '../../parsers/parseMetadata'
import { ArticleData } from '../../../../types/ArticleData'

export default function json2cleanjson(data: ArticleData) {
  const titleBlocks = parseTitle(data)
  const markdown = json2md(data)
  const bodyBlocks = md2cleanjson(markdown)
  return { titleBlocks, bodyBlocks }
}

export function parseTitle(data: ArticleData) {
  const titleBlocks = {
    time: Date.now(),
    blocks: parseMetadata(data.metadata),
    version: '2.28.2',
  }
  return titleBlocks
}

export function parseBody(data: ArticleData) {
  const markdown = json2md(data)
  const bodyBlocks = md2cleanjson(markdown)
  return bodyBlocks
}
