import json2md from './json2md'
import md2cleanjson from './md2cleanjson'
import parseMetadata from '../../parsers/parseMetadata'
import { ResourceArticle } from '../../../../types/ResourceArticle.type'

export default function json2cleanjson(data: ResourceArticle) {
  const titleBlocks = parseTitle(data)
  const markdown = json2md(data)
  const bodyBlocks = md2cleanjson(markdown)
  return { titleBlocks, bodyBlocks }
}

export function parseTitle(data: ResourceArticle) {
  const titleBlocks = {
    time: Date.now(),
    blocks: parseMetadata(data.metadata),
    version: '2.28.2',
  }
  return titleBlocks
}

export function parseBody(data: ResourceArticle) {
  const markdown = json2md(data)
  const bodyBlocks = md2cleanjson(markdown)
  return bodyBlocks
}
