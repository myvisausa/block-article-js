import parse from "html-react-parser";
import TableOfContents from "./components/toc-renderer/TableOfContents";
import { blocksSplitter } from "./components/utils/blocksSplitter";
import edjsHTML from "editorjs-renderer";

// use submodule if md-json-converter not installed
let json2cleanjson;
try {
  json2cleanjson = require("md-json-converter").json2cleanjson;
} catch (e) {
  json2cleanjson = require("../../md-json-converter/src/json2cleanjson").default;
}

export default function Renderer({ data, scrollOffset=50, tocTitle='Table of Contents' }) {
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
        <TableOfContents data={tocData} title={tocTitle} scrollOffset={scrollOffset}/>
      </div>
      <div className="text-container">{parse(body_html.join(""))}</div>
    </>
  )
};
