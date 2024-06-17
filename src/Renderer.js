import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import TableOfContents from './components/toc-renderer/TableOfContents';
import parser from '../editorjs-renderer/src/app.ts';
import styles from './styles.module.css';
import {
  parseTitle,
  parseBody,
} from '../md-json-converter/src/core/misc/json2cleanjson';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const myParser = parser();

export default function Renderer({
  data,
  scrollOffset = 100,
  tocTitle = 'In this article',
  onArticleLoaded = () => {},
  locale = 'en',
}) {
  if (!data) {
    return <div className={styles.textCenter}>Article is Empty</div>;
  }

  const [isLoaded, setIsLoaded] = useState(false);
  const [body_html, setBodyHtml] = useState('');
  const [tocData, setTocData] = useState({ blocks: [] });

  useEffect(() => {
    const bodyBlocks = parseBody(data);
    setTocData(bodyBlocks);
    setBodyHtml(myParser.parse(bodyBlocks));
    setIsLoaded(true);
  }, [data]);

  useEffect(() => {
    if (isLoaded) {
      onArticleLoaded();
    }
  }, [isLoaded]);

  let titleBlocks = parseTitle(data);
  const imageBlock = { blocks: titleBlocks.blocks.slice(-1) };
  titleBlocks.blocks = titleBlocks.blocks.slice(0, -1);
  const title_html = myParser.parse(titleBlocks);
  const image_html = myParser.parse(imageBlock);

  // Determine if the locale is Arabic to apply the RTL class
  const rtlClass = locale === 'ar' ? styles.rtl : '';

  return (
    <>
      <div className='mb-2 mb-lg-5'>
        <div className={`${styles.title} ${rtlClass}`}>
          {parse(title_html.join(''))}
        </div>
        <p className={`${styles.published_date} d-lg-none`}>
          {data.metadata.author} • {data.metadata.modifiedTime.slice(0, 10)}{' '}
        </p>
      </div>
      <div className={`${styles.image} ${rtlClass} mb-lg-4`}>
        {parse(image_html.join(''))}
      </div>
      <div className={`row ${styles.contentWrapper} ${rtlClass}`}>
        <div className={`col-12 col-lg-4 ${styles.tableOfContents}`}>
          <TableOfContents
            data={tocData}
            title={tocTitle}
            scrollOffset={scrollOffset}
          />
        </div>
        <div className={`col-12 col-lg-8 ${styles.content} mt-3 mt-lg-0`}>
          <div className='d-flex justify-content-between align-items-center'>
            <div className={styles.blog_post_grp}>
              <p className={styles.immigrants_btn}>{data.metadata?.tags[0]}</p>{' '} {/* // ASSUMING ONLY 2 TAGS */}
              <p className={styles.finding_btn}>{data.metadata?.tags[1]}</p>{' '}
            </div>
            <p className={`${styles.published_date} d-none d-lg-block`}>
              {data.metadata.author} • {data.metadata.modifiedTime.slice(0, 10)}{' '}
              {/* replace it with dynamic data */}
            </p>
          </div>

          {isLoaded && (
            <div className={`${styles.body} ${rtlClass}`}>
              {parse(body_html.join(''))}
            </div>
          )}

          {/* <SocialComp text="Like what you see? Share with a friend." /> */}
        </div>
      </div>
    </>
  );
}

export function renderArticle(data) {
  if (!data) {
    return '<div>Article is Empty</div>';
  }

  let titleBlocks = parseTitle(data);
  const bodyBlocks = parseBody(data);

  // Assuming the last block of the title is the image
  const imageBlock = { blocks: titleBlocks.blocks.slice(-1) };
  titleBlocks.blocks = titleBlocks.blocks.slice(0, -1);

  const title_html = myParser.parse(titleBlocks);
  const image_html = myParser.parse(imageBlock);
  const body_html = myParser.parse(bodyBlocks);

  return {
    titleHtml: title_html.join(''),
    imageHtml: image_html.join(''),
    bodyHtml: body_html.join(''),
    bodyBlocks,
  };
}

const SocialComp = ({ text, className }) => {
  return (
    <div
      className={`${className} ${styles.share_content} d-flex justify-content-between flex-column flex-lg-row gap-2 gap-lg-0 my-4`}
    >
      <p className='text-white m-0'>{text}</p>
      <div className='d-flex gap-3 align-items-center'>
        <a href='https://www.instagram.com' target='_blank'>
          <InstagramIcon className='text-white' />
        </a>
        <a href='https://www.facebook.com' target='_blank'>
          <FacebookRoundedIcon className='text-white' />
        </a>
        <a href='https://www.whatsapp.com' target='_blank'>
          <WhatsAppIcon className='text-white' />
        </a>
      </div>
    </div>
  );
};