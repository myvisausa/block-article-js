import { OutputData, OutputBlockData } from '@editorjs/editorjs'
import transforms from './transforms'

type IParser = {
  parse(OutputData: OutputData): Array<string>
  parseStrict(OutputData: OutputData): Array<string>
  parseBlock(block: OutputBlockData): string 
  validate(OutputData: OutputData): Array<string>
}

const parser = (plugins = {}): IParser => {
  const parsers = Object.assign({}, transforms, plugins)

  return {
    parse: ({ blocks }) => {
      return blocks
        .filter((block: OutputBlockData) => parsers[block.type])
        .map((block: OutputBlockData) => parsers[block.type](block))
    },

    parseBlock: (block: OutputBlockData) => {
      return parsers[block.type]
        ? parsers[block.type](block)
        : ''
    },

    parseStrict: ({ blocks }) => {
      const parserFreeBlocks = parser(parsers).validate({ blocks })

      if (parserFreeBlocks.length) {
        throw new Error(
          `Parser Functions missing for blocks: ${parserFreeBlocks.toString()}`,
        )
      }

      const parsed = []

      for (let i = 0; i < blocks.length; i++) {
        if (!parsers[blocks[i].type]) continue;

        parsed.push(parsers[blocks[i].type](blocks[i]))
      }

      return parsed
    },

    validate: ({ blocks }) => {
      const types = blocks
        .map((item: OutputBlockData) => item.type)
        .filter(
          (item: string, index: number, blocksArr: Array<string>) =>
            blocksArr.indexOf(item) === index,
        )

      const parser_keys = Object.keys(parsers)

      return types.filter((type) => !parser_keys.includes(type))
    },
  }
}

export default parser
