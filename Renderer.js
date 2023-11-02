import parse from "html-react-parser";
import TableOfContents from "./components/toc-renderer/TableOfContents";
import { blocksSplitter } from "./components/utils/blocksSplitter";
import { json2cleanjson } from "../md-json-converter/src/json2cleanjson";
const edjsHTML = require("editorjs-renderer");

export default function Renderer({ data, title='Table of Contents' }) {
  if (!data) {
    return (
    <>
    <div className="text-center">
    Article is Empty
    </div>
    </>
    )
  }
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

  const edjsParser =  edjsHTML();
  const title_html = edjsParser.parse(titleBlocks)
  const body_html = edjsParser.parse(bodyBlocks)
  // array of html elements
  return ( 
    <>
      <div className="text-container">{parse(title_html.join(""))}</div>
      <div className="pt-3 pb-3">
        <TableOfContents data={tocData} title={title}/>
      </div>
      <div className="text-container">{parse(body_html.join(""))}</div>
    </>
  )
};
