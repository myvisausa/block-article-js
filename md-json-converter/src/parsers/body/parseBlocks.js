// BlockIdGenerator.js
export const generateBlockId = () => Math.random().toString(36).substr(2, 10);

// BlockFactory.js
class BlockFactory {
    static createBlock(block) {
        const baseBlock = {
            id: generateBlockId(),
            type: block.type,
            data: {}
        };

        switch (block.type) {
            case "header":
                return { ...baseBlock, data: { text: block.text, level: block.level } };
            case "image":
                return { ...baseBlock, data: { file: { url: block.url }, caption: block.caption, withBorder: false, stretched: false, withBackground: false } };
            case "paragraph":
                return { ...baseBlock, data: { text: block.text } };
            case "list":
                return { ...baseBlock, data: { style: "ordered", items: block.items } };
            case "code":
                return { ...baseBlock, data: { code: block.code } };
            case "warning":
                return { ...baseBlock, data: { title: block.title, message: block.message } };
            case "table":
                return { ...baseBlock, data: { withHeadings: block.withHeadings, content: block.content } };
            case "article":
                return { ...baseBlock, data: { title: block.title, text: block.text, href: block.href } };
            case "note":
                return { ...baseBlock, data: { title: block.title, message: block.message } };
            case "checklist":
                return { ...baseBlock, data: { title: block.title, items: block.items } };
            case "steps":
                return { ...baseBlock, data: { title: block.title, items: block.items } };
            default:
                throw new Error("Unsupported block type");
        }
    }
}

export default function parseBlocks(blocks) {
    const data = {
        time: Date.now(),
        blocks: blocks.map(block => BlockFactory.createBlock(block)),
        version: "2.28.2"
    };
    return data;
}