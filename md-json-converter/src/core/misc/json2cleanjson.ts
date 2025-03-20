import json2md from './json2md'
import md2cleanjson from './md2cleanjson'
import parseMetadata from '../../parsers/parseMetadata'

function json2cleanjson(data: any) {
  const titleBlocks = {
    time: Date.now(),
    blocks: parseMetadata(data.metadata),
    version: '2.28.2',
  }
  const markdown = json2md(data)
  const bodyBlocks = JSON.parse(md2cleanjson(markdown))
  return { titleBlocks, bodyBlocks }
}

export default json2cleanjson

export function parseTitle(data: any) {
  const titleBlocks = {
    time: Date.now(),
    blocks: parseMetadata(data.metadata),
    version: '2.28.2',
  }
  return titleBlocks
}

export function parseBody(data: any) {
  const markdown = json2md(data)
  const bodyBlocks = JSON.parse(md2cleanjson(markdown))
  return bodyBlocks
}
