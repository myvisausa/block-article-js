// tools.js
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
// import LinkTool from '@editorjs/link'
// import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
// import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
// import Delimiter from '@editorjs/delimiter'
// import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import ImageTool from '@editorjs/image'
import RelatedArticle from '../../../../custom-blocks/related-article/src'
import Note from '../../../../custom-blocks/note/src'
import Checklist from '../../../../custom-blocks/checklist/src'
import Steps from '../../../../custom-blocks/steps/src'

// import NestedList from "./NestedList";

// Add a type import for the type assertion
import type { ToolConstructable } from '@editorjs/editorjs'

export const createEditorTools = (uploadEndPoint?: string) => ({
  // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
  // paragraph: Paragraph,
  embed: {
    class: Embed,
    inlineToolbar: true,
  } as unknown as ToolConstructable,
  table: {
    class: Table,
    inlineToolbar: true,
    config: {
      rows: 2,
      cols: 2,
    },
  } as unknown as ToolConstructable,
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: 'unordered',
    },
  } as unknown as ToolConstructable,
  warning: {
    class: Warning,
    inlineToolbar: true,
    config: {
      titlePlaceholder: 'Title',
      messagePlaceholder: 'Message',
    },
  } as unknown as ToolConstructable,
  code: {
    class: Code,
  } as unknown as ToolConstructable,
  // linkTool: LinkTool,  // not in editorjs-renderer transforms
  image: {
    class: ImageTool,
    config: {
      endpoints: {
        byFile:
          uploadEndPoint || 'http://localhost:5252/api/media/images/upload',
      },
    },
  } as unknown as ToolConstructable,
  // raw: Raw,  // not in editorjs-renderer transforms
  header: {
    class: Header,
  } as unknown as ToolConstructable,
  // quote: Quote,  // not in editorjs-renderer transforms
  marker: {
    class: Marker,
  } as unknown as ToolConstructable,
  // delimiter: Delimiter,  // not in editorjs-renderer transforms
  // inlineCode: InlineCode,  // not in editorjs-renderer transforms
  simpleImage: {
    class: SimpleImage,
  } as unknown as ToolConstructable,
  article: {
    class: RelatedArticle,
    inlineToolbar: true,
    config: {
      titlePlaceholder: 'Title',
      textPlaceholder: 'Text',
      hrefPlaceholder: 'Hyperlink',
    },
  } as unknown as ToolConstructable,
  note: {
    class: Note,
    inlineToolbar: true,
    config: {
      titlePlaceholder: 'Title',
      messagePlaceholder: 'Message',
    },
  } as unknown as ToolConstructable,
  checklist: {
    class: Checklist,
    inlineToolbar: true,
    config: {
      titlePlaceholder: 'Title',
    },
  } as unknown as ToolConstructable,
  steps: {
    class: Steps,
    inlineToolbar: true,
    config: {
      titlePlaceholder: 'Title',
    },
  } as unknown as ToolConstructable,
})
