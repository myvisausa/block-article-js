import { useState, useEffect, useMemo, useRef } from 'react'
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

const CommentSection = dynamic(
  () => import('./components/Comment/CommentSection'),
  { ssr: false },
)
const SocialComp = dynamic(
  () => import('./components/SocialComp/SocialCompSection'),
  { ssr: false },
)

const myParser = parser()

/** Fires `once` exactly once when its children have mounted. */
const OnMount: React.FC<{
  once: () => void
  children: React.ReactNode
}> = ({ once, children }) => {
  useEffect(() => {
    once()
  }, [once])
  return <>{children}</>
}

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

  /* ──────────────────────────────────────────────────────────
     1. Parse title, image & TOC synchronously via useMemo
     ────────────────────────────────────────────────────────── */
  const { titleHtml, imageHtml, tocData, imageUrl } = useMemo(() => {
    const parsedTitle = parseTitle(data)
    const imageBlock = { blocks: parsedTitle.blocks.slice(-1) }
    const titleBlocks = { blocks: parsedTitle.blocks.slice(0, -1) }

    const title_html = myParser.parse(titleBlocks).join('')
    const image_html = myParser.parse(imageBlock).join('')

    // grab LCP image URL
    let extracted_image_url = ''
    const srcMatch = image_html.match(/src="([^"]+)"/)
    if (srcMatch) extracted_image_url = srcMatch[1]

    return {
      titleHtml: title_html,
      imageHtml: image_html,
      tocData: parseBody(data),
      imageUrl: extracted_image_url,
    }
  }, [data])

  /* ──────────────────────────────────────────────────────────
     2. Preload the LCP image (one-off)
     ────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!imageUrl) return
    if (document.querySelector(`link[rel="preload"][href="${imageUrl}"]`)) {
      return
    }
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = imageUrl
    link.setAttribute('fetchpriority', 'high')
    document.head.appendChild(link)
    return () => {
      const l = document.querySelector(
        `link[rel="preload"][href="${imageUrl}"]`,
      )
      if (l) document.head.removeChild(l)
    }
  }, [imageUrl])

  /* ──────────────────────────────────────────────────────────
     3. Stage-by-stage render control
     ────────────────────────────────────────────────────────── */
  const [bodyHtml, setBodyHtml] = useState('')
  const [isBodyLoaded, setIsBodyLoaded] = useState(false)
  const [bodyPainted, setBodyPainted] = useState(false)
  const [socialMounted, setSocialMounted] = useState(false)
  const [commentMounted, setCommentMounted] = useState(false)

  // async parse body
  useEffect(() => {
    const run = async () => {
      const html = myParser.parse(tocData).join('')
      setBodyHtml(html)
      setIsBodyLoaded(true)
    }
    run()
  }, [tocData])

  // kick bodyPainted one frame *after* body HTML is in the tree
  useEffect(() => {
    if (!isBodyLoaded) return
    const id = requestAnimationFrame(() => setBodyPainted(true))
    return () => cancelAnimationFrame(id)
  }, [isBodyLoaded])

  // final finish-line callback
  const firedRef = useRef(false)
  useEffect(() => {
    if (socialMounted && commentMounted && !firedRef.current) {
      firedRef.current = true
      onArticleLoaded()
    }
  }, [socialMounted, commentMounted, onArticleLoaded])

  /* ──────────────────────────────────────────────────────────
     Helpers
     ────────────────────────────────────────────────────────── */
  const rtlClass = locale === 'ar' ? styles.rtl : ''

  const formattedDescription = () => {
    if (data.metadata.description) return data.metadata.description
    let description = data.content?.[0]?.text?.slice(0, 350) ?? ''
    description = description
      .replace(/<[^>]*>?/g, '')
      .replace(/\n/g, '')
      .replace(/\s+/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/\(.*?\)/g, '')
      .replace('[', '')
      .replace(']', '')
      .replace(/\*/g, '')
    return description
  }

  /* ──────────────────────────────────────────────────────────
     JSX
     ────────────────────────────────────────────────────────── */
  return (
    <>
      {/* Title & mobile metadata */}
      <div className='mb-2 mb-lg-5'>
        <div className={`${styles.title} ${rtlClass}`}>{parse(titleHtml)}</div>
        <p className={`${styles.published_date} d-lg-none`}>
          {data.metadata.author} • {data.metadata.modifiedTime.slice(0, 10)}
        </p>
      </div>

      {/* Content wrapper */}
      <div className={styles.outerContainer}>
        {alignRow ? (
          /* ───── Aligned Row Layout ───── */
          <div className={`row ${styles.contentWrapper} ${rtlClass}`}>
            {/* TOC */}
            <div className={`col-12 col-lg-3 ${styles.tableOfContents}`}>
              <TableOfContents
                data={tocData}
                title={otherText.toc}
                scrollOffset={scrollOffset}
              />
            </div>

            {/* Image / Metadata / Body */}
            <div className={`col-12 col-lg-9 ${styles.content} mt-0 mt-lg-0`}>
              {/* Image + metadata */}
              <div className='row mb-4'>
                <div className='col-12 col-lg-auto d-flex justify-content-center'>
                  <div className={`${styles.imageAligned} ${rtlClass}`}>
                    <div>{parse(imageHtml)}</div>
                  </div>
                </div>

                <div className={`col-12 col-lg ${styles.metadataColumn}`}>
                  <p className={styles.articleDescription}>
                    {formattedDescription()}…
                  </p>
                  <div className={styles.tagsRow}>
                    <div className={styles.blog_post_grp}>
                      <p className={styles.immigrants_btn}>
                        {data.metadata?.tags[0]}
                      </p>
                      <p className={styles.finding_btn}>
                        {data.metadata?.tags[1]}
                      </p>
                    </div>
                    <p className={styles.published_date}>
                      {data.metadata.author} •{' '}
                      {data.metadata.modifiedTime.slice(0, 10)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Body + extras */}
              {bodyPainted ? (
                <>
                  <div className={`${styles.body} ${rtlClass}`}>
                    {parse(bodyHtml)}
                  </div>

                  <OnMount once={() => setSocialMounted(true)}>
                    <div className={styles.socialComponentStaggered}>
                      <SocialComp
                        text={otherText.socialShare}
                        className={styles.share_content}
                      />
                    </div>
                  </OnMount>

                  <OnMount once={() => setCommentMounted(true)}>
                    <div className={styles.commentSectionStaggered}>
                      <CommentSection
                        articleId={data.postId}
                        otherText={otherText}
                      />
                    </div>
                  </OnMount>
                </>
              ) : (
                <div className={styles.bodyPlaceholder}>Loading content…</div>
              )}
            </div>
          </div>
        ) : (
          /* ───── Original Stacked Layout ───── */
          <>
            {/* Hero image */}
            <div className={`${rtlClass} mb-lg-4`}>
              <div>{parse(imageHtml)}</div>
            </div>

            <div className={`row ${styles.contentWrapper} ${rtlClass}`}>
              <div className={`col-12 col-lg-3 ${styles.tableOfContents}`}>
                <TableOfContents
                  data={tocData}
                  title={otherText.toc}
                  scrollOffset={scrollOffset}
                />
              </div>

              <div className={`col-12 col-lg-9 ${styles.content} mt-3 mt-lg-0`}>
                {!alignRow && (
                  <div className='d-flex justify-content-between align-items-center'>
                    <div className={styles.blog_post_grp}>
                      <p className={styles.immigrants_btn}>
                        {data.metadata?.tags[0]}
                      </p>
                      <p className={styles.finding_btn}>
                        {data.metadata?.tags[1]}
                      </p>
                    </div>
                    <p className={`${styles.published_date} d-none d-lg-block`}>
                      {data.metadata.author} •{' '}
                      {data.metadata.modifiedTime.slice(0, 10)}
                    </p>
                  </div>
                )}

                {bodyPainted ? (
                  <>
                    <div className={`${styles.body} ${rtlClass}`}>
                      {parse(bodyHtml)}
                    </div>

                    <OnMount once={() => setSocialMounted(true)}>
                      <div className={styles.socialComponentStaggered}>
                        <SocialComp
                          text={otherText.socialShare}
                          className={styles.share_content}
                        />
                      </div>
                    </OnMount>

                    <OnMount once={() => setCommentMounted(true)}>
                      <div className={styles.commentSectionStaggered}>
                        <CommentSection
                          articleId={data.postId}
                          otherText={otherText}
                        />
                      </div>
                    </OnMount>
                  </>
                ) : (
                  <div className={styles.bodyPlaceholder}>Loading content…</div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

/* ──────────────────────────────────────────────────────────
   Utility: SSR renderer
   ────────────────────────────────────────────────────────── */
export function renderArticle(data: any) {
  if (!data) return '<div>Article is Empty</div>'

  const titleBlocks = parseTitle(data)
  const bodyBlocks = parseBody(data)

  const imageBlock = { blocks: titleBlocks.blocks.slice(-1) }
  titleBlocks.blocks = titleBlocks.blocks.slice(0, -1)

  return {
    titleHtml: myParser.parse(titleBlocks).join(''),
    imageHtml: myParser.parse(imageBlock).join(''),
    bodyHtml: myParser.parse(bodyBlocks).join(''),
    bodyBlocks,
  }
}