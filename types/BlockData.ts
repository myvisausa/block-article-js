import { AnyBlock } from './Block'

export interface BlockData {
  time: number
  blocks: AnyBlock[]
  version: string
}
