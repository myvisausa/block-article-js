import { useState, useEffect, useMemo } from 'react'
import parse from 'html-react-parser'
import TableOfContents from './components/toc-renderer/TableOfContents'
import parser from '../editorjs-renderer/src/app'
import styles from './styles.module.css'
import {
  parseTitle,
  parseBody,
} from '../md-json-converter/src/core/misc/json2cleanjson'
import { ResourceArticle } from '../types/ResourceArticle.type'
import dynamic from 'next/dynamic'

const CommentSection = dynamic(() => import('./components/Comment/CommentSection'), { ssr: false })
const SocialComp = dynamic(() => import('./components/SocialComp/SocialCompSection'), { ssr: false })

const myParser = parser()

interface RendererProps {
  otherText: {
    articleNotFound: string
    socialShare: string
    toc: string
  }
  data: ResourceArticle
  scrollOffset?: number
  onArticleLoaded?: () => void
  locale?: string
  alignRow?: boolean
}

export default function Renderer({
  otherText,
  data,
  scrollOffset = 15,
  onArticleLoaded = () => {},
  locale = 'en',
  alignRow = true,
}: RendererProps) {
  if (!data) {
    return <div className={styles.textCenter}>{otherText.articleNotFound}</div>
  }

  // Synchronously parse title, image, and TOC using useMemo
  const { titleHtml, imageHtml, tocData } = useMemo(() => {
    // Parse title blocks
    let parsedTitle = parseTitle(data)
    const imageBlock = { blocks: parsedTitle.blocks.slice(-1) }
    const titleBlocks = { blocks: parsedTitle.blocks.slice(0, -1) }

    // Convert parsed blocks to HTML
    const title_html = myParser.parse(titleBlocks).join('')
    const image_html = myParser.parse(imageBlock).join('')

    // Parse TOC data
    const toc_blocks = parseBody(data) // Assuming parseBody returns TOC-related blocks
    return {
      titleHtml: title_html,
      imageHtml: image_html,
      tocData: toc_blocks,
    }
  }, [data])

  // State for body content
  const [bodyHtml, setBodyHtml] = useState('')
  const [isBodyLoaded, setIsBodyLoaded] = useState(false)
  // Asynchronously parse body content using tocData instead of parsing again
  useEffect(() => {
    const parseBodyContent = async () => {
      const body_html = myParser.parse(tocData).join('')
      setBodyHtml(body_html)
      setIsBodyLoaded(true)
      onArticleLoaded()
    }

    parseBodyContent()
  }, [tocData, onArticleLoaded]) // Updated dependency array to include tocData

  // Determine if the locale is Arabic to apply the RTL class
  const rtlClass = locale === 'ar' ? styles.rtl : ''

  const formattedDescription = () => {
    if (data.metadata.description) {
      return data.metadata.description
    }

    let description = data.content?.[0]?.text?.slice(0, 350) ?? ''
    // Remove HTML tags
    description = description.replace(/<[^>]*>?/g, '')
    // Remove newlines
    description = description.replace(/\n/g, '')
    // Remove extra spaces
    description = description.replace(/\s+/g, ' ')
    // Replace '&nbsp;' with ' '
    description = description.replace(/&nbsp;/g, ' ')
    // Remove (url) from MD links
    description = description.replace(/\(.*?\)/g, '')
    // Remove brackets
    description = description.replace('[', '').replace(']', '')
    // Remove asterisks
    description = description.replace(/\*/g, '')
    return description
  }

  return (
    <>
      {/* Title and Metadata */}
      <div className='mb-2 mb-lg-5'>
        <div className={`${styles.title} ${rtlClass}`}>{parse(titleHtml)}</div>
        <p className={`${styles.published_date} d-lg-none`}>
          {data.metadata.author} •{' '}
          {data.metadata.modifiedTime.slice(0, 10)}{' '}
        </p>
      </div>

      {/* Content Wrapper */}
      <div className={styles.outerContainer}>
        {alignRow ? (
          /* Aligned Row Layout */
          <div className={`row ${styles.contentWrapper} ${rtlClass}`}>
            {/* Table of Contents */}
            <div className={`col-12 col-lg-3 ${styles.tableOfContents}`}>
              <TableOfContents
                data={tocData}
                title={otherText.toc}
                scrollOffset={scrollOffset}
              />
            </div>

            {/* Image, Metadata, and Body Column */}
            <div className={`col-12 col-lg-9 ${styles.content} mt-0 mt-lg-0`}>
              {/* Image and Metadata Row */}
              <div className={`row mb-4`}>
                {/* Image Column */}
                <div className={`col-12 col-lg-auto d-flex justify-content-center`}>
                  <div className={`${styles.imageAligned} ${rtlClass}`}>
                    <div className={styles.imageWrapper}>{parse(imageHtml)}</div>
                  </div>
                </div>
                
                {/* Metadata Column */}
                <div className={`col-12 col-lg ${styles.metadataColumn}`}>
                  {/* Article Description Placeholder */}
                  <p className={styles.articleDescription}>
                    {formattedDescription()}... {/*... // TODO: fix this */}
                  </p>
                  
                  {/* Tags and Author in single row */}
                  <div className={styles.tagsRow}>
                    <div className={styles.blog_post_grp}>
                      <p className={styles.immigrants_btn}>{data.metadata?.tags[0]}</p>
                      <p className={styles.finding_btn}>
                        {data.metadata?.tags[1]}
                      </p>
                    </div>
                    <p className={`${styles.published_date}`}>
                      {data.metadata.author} •{' '}
                      {data.metadata.modifiedTime.slice(0, 10)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Body Content */}
              {isBodyLoaded ? (
                <div className={`${styles.body} ${rtlClass}`}>
                  {parse(bodyHtml)}
                </div>
              ) : (
                <div className={styles.bodyPlaceholder}>Loading content...</div>
              )}

              {/* Social Sharing */}
              <SocialComp
                text={otherText.socialShare}
                className={styles.share_content}
              />

              {/* Comment Section */}
              <CommentSection articleId={data.postId} otherText={otherText} />
            </div>
          </div>
        ) : (
          /* Original Layout */
          <>
            {/* Image */}
            <div className={`${styles.image} ${rtlClass} mb-lg-4`}>
              <div className={styles.imageWrapper}>{parse(imageHtml)}</div>
            </div>
            
            <div className={`row ${styles.contentWrapper} ${rtlClass}`}>
              {/* Table of Contents */}
              <div className={`col-12 col-lg-3 ${styles.tableOfContents}`}>
                <TableOfContents
                  data={tocData}
                  title={otherText.toc}
                  scrollOffset={scrollOffset}
                />
              </div>

              {/* Main Content */}
              <div className={`col-12 col-lg-9 ${styles.content} mt-3 mt-lg-0`}>
                {!alignRow && (
                  /* Tags and Metadata for original layout */
                  <div className='d-flex justify-content-between align-items-center'>
                    <div className={styles.blog_post_grp}>
                      <p className={styles.immigrants_btn}>{data.metadata?.tags[0]}</p>{' '}
                      {/* Assuming only 2 tags */}
                      <p className={styles.finding_btn}>
                        {data.metadata?.tags[1]}
                      </p>{' '}
                    </div>
                    <p className={`${styles.published_date} d-none d-lg-block`}>
                      {data.metadata.author} •{' '}
                      {data.metadata.modifiedTime.slice(0, 10)}{' '}
                    </p>
                  </div>
                )}

                {/* Body Content */}
                {isBodyLoaded ? (
                  <div className={`${styles.body} ${rtlClass}`}>
                    {parse(bodyHtml)}
                  </div>
                ) : (
                  <div className={styles.bodyPlaceholder}>Loading content...</div>
                )}

                {/* Social Sharing */}
                <SocialComp
                  text={otherText.socialShare}
                  className={styles.share_content}
                />

                {/* Comment Section */}
                <CommentSection articleId={data.postId} otherText={otherText} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export function renderArticle(data: any) {
  if (!data) {
    return '<div>Article is Empty</div>'
  }

  let titleBlocks = parseTitle(data)
  const bodyBlocks = parseBody(data)

  // Assuming the last block of the title is the image
  const imageBlock = { blocks: titleBlocks.blocks.slice(-1) }
  titleBlocks.blocks = titleBlocks.blocks.slice(0, -1)

  const title_html = myParser.parse(titleBlocks).join('')
  const image_html = myParser.parse(imageBlock).join('')
  const body_html = myParser.parse(bodyBlocks).join('')

  return {
    titleHtml: title_html,
    imageHtml: image_html,
    bodyHtml: body_html,
    bodyBlocks,
  }
}
