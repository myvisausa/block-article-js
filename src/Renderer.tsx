import React, { useState, useEffect, useMemo } from 'react'
import parse from 'html-react-parser'
import TableOfContents from './components/toc-renderer/TableOfContents'
import parser from '../editorjs-renderer/src/app'
import styles from './styles.module.css'
import {
  parseTitle,
  parseBody,
} from '../md-json-converter/src/core/misc/json2cleanjson'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import CommentSection from './components/Comment/CommentSection'
import { ResourceJsonType } from '../../../src/types/resource-types/ResourceJsonType'

const myParser = parser()

interface RendererProps {
  otherText: {
    articleNotFound: string
    socialShare: string
    toc: string
  }
  data: ResourceJsonType
  scrollOffset?: number
  onArticleLoaded?: () => void
  locale?: string
}

export default function Renderer({
  otherText,
  data,
  scrollOffset = 15,
  onArticleLoaded = () => {},
  locale = 'en',
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

      {/* Image */}
      <div className={`${styles.image} ${rtlClass} mb-lg-4`}>
        <div className={styles.imageWrapper}>{parse(imageHtml)}</div>
      </div>

      {/* Content Wrapper */}
      <div className={`row ${styles.contentWrapper} ${rtlClass}`}>
        {/* Table of Contents */}
        <div className={`col-12 col-lg-4 ${styles.tableOfContents}`}>
          <TableOfContents
            data={tocData}
            title={otherText.toc}
            scrollOffset={scrollOffset}
          />
        </div>

        {/* Main Content */}
        <div className={`col-12 col-lg-8 ${styles.content} mt-3 mt-lg-0`}>
          {/* Tags and Metadata */}
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

          {/* Body Content */}
          {isBodyLoaded ? (
            <div className={`${styles.body} ${rtlClass}`}>
              {parse(bodyHtml)}
            </div>
          ) : (
            // Optional: Add a loading placeholder for the body
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

const SocialComp = ({
  text,
  className,
}: {
  text: string
  className: string
}) => {
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  return (
    <div
      className={`${className} ${styles.share_content} d-flex justify-content-between flex-column flex-lg-row gap-2 gap-lg-0 my-4`}
    >
      <p className='text-white m-0'>{text}</p>
      <div className='d-flex gap-3 align-items-center'>
        <a
          href={`https://www.instagram.com`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <InstagramIcon className='text-white' />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <FacebookRoundedIcon className='text-white' />
        </a>
        <a
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <WhatsAppIcon className='text-white' />
        </a>
      </div>
    </div>
  )
}
