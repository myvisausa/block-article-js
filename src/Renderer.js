// Renderer.js
import parse from "html-react-parser" ;
import TableOfContents from "./components/toc-renderer/TableOfContents";
import { blocksSplitter } from "./components/utils/blocksSplitter";
import { useEffect } from "react";
import parser from "../editorjs-renderer/src/app.ts";

import styles from './styles.module.css';
let json2cleanjson;

json2cleanjson = require("../md-json-converter/src/json2cleanjson").default;

export default function Renderer({ data, scrollOffset=100, tocTitle='Table of Contents', onArticleLoaded }) {
  if (onArticleLoaded === undefined) {
    onArticleLoaded = () => {};
  }
  if (!data) {
    return (
      <div className={styles.textCenter}>Article is Empty</div>
    )
  }

  useEffect(() => {
    onArticleLoaded();
  }, []);

  let titleBlocks;
  let bodyBlocks;
  let res;
  let tocData;

  if (!("time" in data)) {
    res = json2cleanjson(data);
    titleBlocks = res.titleBlocks;
    bodyBlocks = res.bodyBlocks;
    tocData = bodyBlocks;
  } else {
    res = blocksSplitter(data);
    titleBlocks = res.titleBlocks;
    bodyBlocks = res.bodyBlocks;
    tocData = data;
  }

  // Separate image from title
  let imageBlock = JSON.parse(JSON.stringify(titleBlocks));
  imageBlock.blocks = imageBlock.blocks.slice(-1);
  titleBlocks.blocks = titleBlocks.blocks.slice(0, -1);
  
  const myParser = parser();

  const title_html = myParser.parse(titleBlocks)
  const image_html = myParser.parse(imageBlock)
  const body_html = myParser.parse(bodyBlocks)
  
  return ( 
    <>
      <div className={styles.title}>{parse(title_html.join(""))}</div>
      <div className={styles.contentWrapper}>
        <div className={`col-md-9 ${styles.content}`}>
          {image_html.length > 0 && parse(image_html.join(""))}
          <div className={styles.body}>{parse(body_html.join(""))}</div>
        </div>
        <div className={`col-md-3 ${styles.tableOfContents}`}>
          <TableOfContents data={tocData} title={tocTitle} scrollOffset={scrollOffset}/>
        </div>
      </div>
    </>
  )
};