// Renderer.js
import React, { useState } from 'react'
import parse from 'html-react-parser'
import TableOfContents from './components/toc-renderer/TableOfContents'
import { blocksSplitter } from './components/utils/blocksSplitter'
import { useEffect } from 'react'
import parser from '../editorjs-renderer/src/app.ts'

const myParser = parser()

import styles from './styles.module.css'

import {
  parseTitle,
  parseBody,
} from '../md-json-converter/src/core/misc/json2cleanjson'

export default function Renderer({
  data,
  scrollOffset = 100,
  tocTitle = 'Table of Contents',
  onArticleLoaded,
}) {
  if (!data) {
    return <div className={styles.textCenter}>Article is Empty</div>
  }

  const [isLoaded, setIsLoaded] = useState(false)
  const [body_html, setBodyHtml] = useState('')
  const [tocData, setTocData] = useState({ blocks: [] })

  useEffect(() => {
    onArticleLoaded && onArticleLoaded()
    const bodyBlocks = parseBody(data)
    setTocData(bodyBlocks)
    setBodyHtml(myParser.parse(bodyBlocks))
    setIsLoaded(true)
  }, [data])

  let titleBlocks = parseTitle(data)
  const imageBlock = { blocks: titleBlocks.blocks.slice(-1) }
  titleBlocks.blocks = titleBlocks.blocks.slice(0, -1)
  const title_html = myParser.parse(titleBlocks)
  const image_html = myParser.parse(imageBlock)

  return (
    <>
      <div className={styles.title}>{parse(title_html.join(''))}</div>
      <div className={styles.contentWrapper}>
        <div className={`col-md-9 ${styles.content}`}>
          {parse(image_html.join(''))}
          {isLoaded && (
            <div className={styles.body}>{parse(body_html.join(''))}</div>
          )}
        </div>
        <div className={`col-md-3 ${styles.tableOfContents}`}>
          <TableOfContents
            data={tocData}
            title={tocTitle}
            scrollOffset={scrollOffset}
          />
        </div>
      </div>
    </>
  )
}

export function renderArticle(data) {
  if (!data) {
    return '<div>Article is Empty</div>'
  }

  let titleBlocks = parseTitle(data)
  const bodyBlocks = parseBody(data)

  // Assuming the last block of the title is the image
  const imageBlock = { blocks: titleBlocks.blocks.slice(-1) }
  titleBlocks.blocks = titleBlocks.blocks.slice(0, -1)

  const title_html = myParser.parse(titleBlocks)
  const image_html = myParser.parse(imageBlock)
  const body_html = myParser.parse(bodyBlocks)

  return {
    titleHtml: title_html.join(''),
    imageHtml: image_html.join(''),
    bodyHtml: body_html.join(''),
    bodyBlocks,
  }
}
