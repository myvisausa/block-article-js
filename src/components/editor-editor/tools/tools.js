// tools.js
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";
import ImageTool from '@editorjs/image'
import RelatedArticle from "../../../../related-article/src";

// import NestedList from "./NestedList";

export const createEditorTools = (uploadEndPoint) => ({
  // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
  // paragraph: Paragraph,
  embed: Embed,
  table: {
    class: Table,
    inlineToolbar: true,
    config: {
      rows: 2,
      cols: 2,
    },
  },
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: 'unordered'
    }
  },
  warning: {
    class: Warning,
    inlineToolbar: true,
    config: {
      titlePlaceholder: 'Title',
      messagePlaceholder: 'Message',
    },
  },
  code: Code,
  // linkTool: LinkTool,  // not in editorjs-renderer transforms
  image: {
    class: ImageTool,
    config: {
      endpoints: {
        byFile: uploadEndPoint || 'http://localhost:5252/api/media/images/upload',
      },
    },
  },
  // raw: Raw,  // not in editorjs-renderer transforms
  header: Header,
  // quote: Quote,  // not in editorjs-renderer transforms
  marker: Marker,
  // checklist: CheckList,  // not in editorjs-renderer transforms
  // delimiter: Delimiter,  // not in editorjs-renderer transforms
  // inlineCode: InlineCode,  // not in editorjs-renderer transforms
  simpleImage: SimpleImage,
  article: {
    class: RelatedArticle,
    inlineToolbar: true,
    config: {
      titlePlaceholder: 'Title',
      textPlaceholder: 'Text',
      hrefPlaceholder: 'Hyperlink',
    },
  }
  
});
