'use strict';

var React$1 = require('react');
var Embed = require('@editorjs/embed');
var Table = require('@editorjs/table');
var List = require('@editorjs/list');
var Warning = require('@editorjs/warning');
var Code = require('@editorjs/code');
var LinkTool = require('@editorjs/link');
var Raw = require('@editorjs/raw');
var Header = require('@editorjs/header');
var Quote = require('@editorjs/quote');
var Marker = require('@editorjs/marker');
var CheckList = require('@editorjs/checklist');
var Delimiter = require('@editorjs/delimiter');
var InlineCode = require('@editorjs/inline-code');
var SimpleImage = require('@editorjs/simple-image');
var ImageTool = require('@editorjs/image');
var reactEditorJs = require('react-editor-js');
var mdJsonConverter = require('md-json-converter');
var parse = require('html-react-parser');
var cloneDeep = require('lodash/cloneDeep');

const EditableTitle = ({
  title,
  setTitle
}) => {
  const titleRef = React$1.useRef(null);
  const handleBlur = () => {
    setTitle(titleRef.current.innerText);
  };
  React$1.useEffect(() => {
    const el = titleRef.current;
    if (el) {
      const range = document.createRange();
      const sel = window.getSelection();
      range.setStart(el.childNodes[0], title.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }, [title]);
  return /*#__PURE__*/React$1.createElement("h1", {
    ref: titleRef,
    contentEditable: true,
    onBlur: handleBlur,
    suppressContentEditableWarning: true,
    style: {
      cursor: 'text',
      outline: 'none',
      border: 'none',
      padding: '4px'
    },
    onFocus: () => {
      titleRef.current.style.border = '1px dashed #ccc';
    }
  }, title);
};

// EditableDiv.js

const EditableDiv = ({
  label,
  content,
  setContent
}) => {
  return /*#__PURE__*/React$1.createElement("label", {
    className: "d-flex align-items-center"
  }, /*#__PURE__*/React$1.createElement("p", {
    className: "pt-3"
  }, label), /*#__PURE__*/React$1.createElement("div", {
    contentEditable: true,
    onBlur: e => setContent(e.target.innerText),
    onFocus: () => {
      if (!content) {
        setContent('');
      }
    },
    suppressContentEditableWarning: true,
    style: {
      marginLeft: '5px',
      paddingRight: '5px',
      border: '1px solid #ccc',
      minWidth: '150px',
      maxWidth: '100%',
      display: 'inline-block',
      outline: 'none',
      wordWrap: 'break-word',
      maxHeight: '100px',
      overflowY: 'auto'
    }
  }, content));
};

const EditableImage = ({
  url,
  uploadEndPoint,
  onImageChange,
  caption,
  setCaption,
  altDescription,
  setAltDescription
}) => {
  const fileInputRef = React$1.useRef(null);
  const uploadImage = async file => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await fetch(uploadEndPoint, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.success === 1) {
        onImageChange(data.file.url);
      } else {
        console.error('Failed to upload image:', data);
      }
    } catch (err) {
      console.error('Error uploading the image:', err);
    }
  };
  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };
  const handleDrop = e => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      uploadImage(file);
    }
  };
  const handleClick = () => {
    fileInputRef.current.click();
  };
  return /*#__PURE__*/React$1.createElement("div", {
    className: "container",
    style: {
      maxWidth: '800px'
    }
  }, url ? /*#__PURE__*/React$1.createElement("div", null, /*#__PURE__*/React$1.createElement("div", {
    className: "d-flex justify-content-center",
    onClick: handleClick,
    onDrop: handleDrop,
    onDragOver: e => e.preventDefault(),
    style: {
      maxWidth: '100%',
      height: 'auto',
      border: '1px dashed #ccc',
      padding: '0px'
    }
  }, /*#__PURE__*/React$1.createElement("input", {
    type: "file",
    ref: fileInputRef,
    style: {
      display: 'none'
    },
    onChange: handleFileChange
  }), /*#__PURE__*/React$1.createElement("img", {
    src: url,
    alt: altDescription,
    style: {
      maxWidth: '100%',
      maxHeight: '300px'
    }
  }))) : /*#__PURE__*/React$1.createElement("div", null, /*#__PURE__*/React$1.createElement("div", {
    onClick: handleClick,
    onDrop: handleDrop,
    onDragOver: e => e.preventDefault(),
    style: {
      maxWidth: '100%',
      height: 'auto',
      border: '1px dashed #ccc',
      padding: '10px'
    }
  }, /*#__PURE__*/React$1.createElement("input", {
    type: "file",
    ref: fileInputRef,
    style: {
      display: 'none'
    },
    onChange: handleFileChange
  }), /*#__PURE__*/React$1.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'auto'
    }
  }, "Click or Drag & Drop Image"))), /*#__PURE__*/React$1.createElement("div", {
    className: "d-flex align-items-center justify-content-center flex-column"
  }, /*#__PURE__*/React$1.createElement(EditableDiv, {
    label: "Caption:",
    content: caption,
    setContent: setCaption
  }), /*#__PURE__*/React$1.createElement(EditableDiv, {
    label: "Alt description:",
    content: altDescription,
    setContent: setAltDescription
  })));
};

const HeaderEditor = ({
  uploadEndPoint,
  title,
  setTitle,
  imageUrl,
  setImageUrl,
  caption,
  setCaption,
  altDescription,
  setAltDescription
}) => {
  return /*#__PURE__*/React$1.createElement("div", {
    className: "d-flex justify-content-center align-items-center flex-column"
  }, /*#__PURE__*/React$1.createElement(EditableTitle, {
    title: title,
    setTitle: setTitle
  }), /*#__PURE__*/React$1.createElement(EditableImage, {
    url: imageUrl,
    uploadEndPoint: uploadEndPoint,
    onImageChange: newUrl => setImageUrl(newUrl),
    caption: caption,
    setCaption: setCaption,
    altDescription: altDescription,
    setAltDescription: setAltDescription
  }));
};

// tools.js
const EDITOR_JS_TOOLS = {
  // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
  // paragraph: Paragraph,
  embed: Embed,
  table: Table,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: {
    class: ImageTool,
    config: {
      endpoints: {
        byFile: 'http://localhost:5252/api/uploadImage'
      }
    }
  },
  raw: Raw,
  header: Header,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage
};

function EditorEditor({
  data,
  setData,
  uploadEndPoint
}) {
  const [title, setTitle] = React$1.useState(data.metadata.title);
  const [imageUrl, setImageUrl] = React$1.useState(data.metadata.ogImage);
  const [caption, setCaption] = React$1.useState(data.metadata.ogImageCaption);
  const [altDescription, setAltDescription] = React$1.useState(data.metadata.ogImageAlt);
  let initialData = mdJsonConverter.json2cleanjson(data).bodyBlocks;
  const editorCore = React$1.useRef(null);
  const ReactEditorJS = reactEditorJs.createReactEditorJS();
  const handleInitialize = React$1.useCallback(instance => {
    // await instance._editorJS.isReady;
    instance._editorJS.isReady.then(() => {
      // set reference to editor
      editorCore.current = instance;
    }).catch(err => console.log("An error occured", err));
  }, []);
  const handleSave = React$1.useCallback(async () => {
    // retrieve data inserted
    const savedData = await editorCore.current.save();
    const markdown = mdJsonConverter.cleanjson2md(savedData);
    const content = mdJsonConverter.md2json(markdown);
    const newData = {
      ...data,
      content: content
    };
    setData(newData);
  }, [setData]);
  React$1.useEffect(() => {
    const updateData = {
      ...data,
      metadata: {
        ...data.metadata,
        title: title,
        ogImage: imageUrl,
        ogImageCaption: caption,
        ogImageAlt: altDescription
      }
    };

    // Only update if the data has actually changed
    if (JSON.stringify(data) !== JSON.stringify(updateData)) {
      setData(updateData);
    }
  }, [title, imageUrl, caption, altDescription]);
  return /*#__PURE__*/React$1.createElement("div", {
    className: "editor-container"
  }, /*#__PURE__*/React$1.createElement("h4", {
    className: "edit-mode-alert"
  }, "! Edit Mode Enabled"), /*#__PURE__*/React$1.createElement(HeaderEditor, {
    uploadEndPoint: uploadEndPoint,
    title: title,
    setTitle: setTitle,
    imageUrl: imageUrl,
    setImageUrl: setImageUrl,
    caption: caption,
    setCaption: setCaption,
    altDescription: altDescription,
    setAltDescription: setAltDescription
  }), /*#__PURE__*/React$1.createElement(ReactEditorJS, {
    onInitialize: handleInitialize,
    tools: EDITOR_JS_TOOLS,
    onChange: handleSave,
    defaultValue: initialData
  }));
}

function extractHeaders(blocks) {
  return blocks.filter(block => block.type === 'header' && block.data.level === 2).map(block => ({
    text: block.data.text,
    id: block.id
  }));
}
function TableOfContents({
  data,
  title,
  bulletPoints = true
}) {
  const headers = extractHeaders(data.blocks);
  if (headers.length === 0) {
    return /*#__PURE__*/React.createElement(React.Fragment, null);
  }
  if (bulletPoints) {
    return /*#__PURE__*/React.createElement("div", {
      className: "table-of-contents"
    }, /*#__PURE__*/React.createElement("h2", null, title), /*#__PURE__*/React.createElement("ul", null, headers.map(header => /*#__PURE__*/React.createElement("li", {
      key: header.id
    }, /*#__PURE__*/React.createElement("a", {
      href: `#${header.id}`,
      className: "toc-item"
    }, header.text)))));
  } else {
    return /*#__PURE__*/React.createElement("div", {
      className: "table-of-contents"
    }, /*#__PURE__*/React.createElement("h2", null, title), headers.map(header => /*#__PURE__*/React.createElement("a", {
      key: header.id,
      href: `#${header.id}`,
      className: "toc-item",
      style: {
        display: 'block',
        marginBottom: '10px'
      }
    }, header.text)));
  }
}

function blocksSplitter(data) {
  let blocks = data.blocks;
  // Clone the original array to avoid mutating the input
  let clonedBlocks = [...blocks];
  let titleBlocks = [];

  // Check if the first block meets the conditions
  if (clonedBlocks[0].type === 'header' && clonedBlocks[0].data.level === 1) {
    titleBlocks.push(clonedBlocks.shift());
  }
  let title = cloneDeep(data);
  title.blocks = titleBlocks;
  let body = cloneDeep(data);
  body.blocks = clonedBlocks;
  return {
    titleBlocks: title,
    bodyBlocks: body
  };
}

const edjsHTML = require("editorjs-renderer");
function Renderer({
  data,
  title = 'Table of Contents'
}) {
  if (!data) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "text-center"
    }, "Article is Empty"));
  }
  let titleBlocks;
  let bodyBlocks;
  let res;
  let tocData;
  if (!("time" in data)) {
    res = mdJsonConverter.json2cleanjson(data);
    titleBlocks = res.titleBlocks;
    bodyBlocks = res.bodyBlocks;
    tocData = bodyBlocks;
  } else {
    res = blocksSplitter(data);
    titleBlocks = res.titleBlocks;
    bodyBlocks = res.bodyBlocks;
    tocData = data;
  }
  const edjsParser = edjsHTML();
  const title_html = edjsParser.parse(titleBlocks);
  const body_html = edjsParser.parse(bodyBlocks);
  // array of html elements
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "text-container"
  }, parse(title_html.join(""))), /*#__PURE__*/React.createElement("div", {
    className: "pt-3 pb-3"
  }, /*#__PURE__*/React.createElement(TableOfContents, {
    data: tocData,
    title: title
  })), /*#__PURE__*/React.createElement("div", {
    className: "text-container"
  }, parse(body_html.join(""))));
}

function Editor({
  onDataChange,
  data,
  setData,
  uploadEndPoint,
  isEditMode
}) {
  const handleDataChange = updatedData => {
    setData(updatedData);
    if (onDataChange) {
      onDataChange(updatedData);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "d-flex flex-column align-items-center justify-content-center mt-1 m-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-12 mt-4",
    style: {
      maxWidth: '1000px'
    }
  }, isEditMode ? /*#__PURE__*/React.createElement(EditorEditor, {
    data: data,
    setData: handleDataChange,
    uploadEndPoint: uploadEndPoint
  }) : /*#__PURE__*/React.createElement(Renderer, {
    data: data
  })));
}

exports.Editor = Editor;
exports.Renderer = Renderer;
