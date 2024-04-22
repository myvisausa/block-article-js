import blocksToMarkdown from "./blocksToMarkdown.js";
import convertFromJSON from "./convertFromJson.js";

export default function cleanjson2md(data) {
    const blocks = convertFromJSON(data)
    const markdown = blocksToMarkdown(blocks)
    return markdown
}
