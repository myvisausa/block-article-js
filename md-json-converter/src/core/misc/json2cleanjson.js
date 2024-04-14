import json2md from "./json2md.js";
import md2cleanjson from "./md2cleanjson.js"
import parseMetadata from "../../parsers/parseMetadata.js";

function json2cleanjson(data) {
    const titleBlocks = {"time": Date.now(), "blocks": parseMetadata(data.metadata), "version": "2.28.2"}
    const markdown = json2md(data)
    const bodyBlocks = JSON.parse(md2cleanjson(markdown))
    return { titleBlocks, bodyBlocks }
}

export default json2cleanjson;
