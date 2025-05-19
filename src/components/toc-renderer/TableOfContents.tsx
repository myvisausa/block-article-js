import React, { useState } from 'react'
import styles from './tableOfContents.module.css'

import { AnyBlock, BlockType, HeaderBlock } from '../../../types/Block'
import { BlockData } from '../../../types/BlockData'

function extractHeaders(blocks: AnyBlock[]) {
  return blocks
    .filter(
      (block) =>
        block.type === BlockType.Header &&
        block.data.level === 2 &&
        block.data.text !== 'omit',
    )
    .map((block) => ({ text: (block as HeaderBlock).data.text, id: block.id }))
}

const handleClick = (
  id: string,
  scrollOffset: number,
  setSelectedHeader: (id: string) => void,
) => {
  const headerElement = document.getElementById(id)
  if (headerElement) {
    const offsetPosition = headerElement.offsetTop - scrollOffset
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
    setSelectedHeader(id)
  }
}

export default function TableOfContents({
  data,
  title,
  scrollOffset,
}: {
  data: BlockData
  title: string
  scrollOffset: number
}) {
  const headers = extractHeaders(data.blocks)
  const [selectedHeader, setSelectedHeader] = useState<string | null>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={styles.container}>
      <div
        className={styles.header}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {title}
        <span className={styles.toggleButton}>{isCollapsed ? '▲' : '▼'}</span>
      </div>
      <ul className={`${styles.list} ${!isCollapsed ? styles.expanded : ''}`}>
        {headers.map((header) => (
          <li
            key={header.id}
            className={`${styles.listItem} ${selectedHeader === header.id ? styles.selected : ''}`}
            onClick={() =>
              handleClick(header.id, scrollOffset, setSelectedHeader)
            }
          >
            {header.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
