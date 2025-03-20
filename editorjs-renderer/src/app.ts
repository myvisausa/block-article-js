import { v4 as uuidv4 } from 'uuid'
import { OutputData } from '@editorjs/editorjs'
import transforms from './transforms'
import { ParseFunctionError } from './errors'
import { AnyBlock } from '../../types/Block'

type IParser = {
  parse(OutputData: OutputData): Array<string>
  parseStrict(OutputData: OutputData): Array<string> | Error
  parseBlock(block: AnyBlock): string
  validate(OutputData: OutputData): Array<string>
}

const parser = (plugins = {}): IParser => {
  const parsers = Object.assign({}, transforms, plugins)

  return {
    parse: ({ blocks }) => {
      return blocks.map((block) => {
        return parsers[block.type]
          ? parsers[block.type]({ data: block, id: uuidv4() })
          : ParseFunctionError(block.type)
      })
    },

    parseBlock: (block: AnyBlock) => {
      return parsers[block.type]
        ? parsers[block.type]({ data: block, id: uuidv4() })
        : ParseFunctionError(block.type)
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
        if (!parsers[blocks[i].type]) throw ParseFunctionError(blocks[i].type)

        parsed.push(parsers[blocks[i].type](blocks[i]))
      }

      return parsed
    },

    validate: ({ blocks }) => {
      const types = blocks
        .map((item: AnyBlock) => item.type)
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
