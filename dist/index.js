function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React$1 = require('react');
var React$1__default = _interopDefault(React$1);
var material = require('@mui/material');
var Box = _interopDefault(require('@mui/material/Box'));
var ButtonBase = _interopDefault(require('@mui/material/ButtonBase'));
var Typography = _interopDefault(require('@mui/material/Typography'));
var Embed = _interopDefault(require('@editorjs/embed'));
var Table = _interopDefault(require('@editorjs/table'));
var List = _interopDefault(require('@editorjs/list'));
var Warning = _interopDefault(require('@editorjs/warning'));
var Code = _interopDefault(require('@editorjs/code'));
var LinkTool = _interopDefault(require('@editorjs/link'));
var Raw = _interopDefault(require('@editorjs/raw'));
var Header = _interopDefault(require('@editorjs/header'));
var Quote = _interopDefault(require('@editorjs/quote'));
var Marker = _interopDefault(require('@editorjs/marker'));
var CheckList = _interopDefault(require('@editorjs/checklist'));
var Delimiter = _interopDefault(require('@editorjs/delimiter'));
var InlineCode = _interopDefault(require('@editorjs/inline-code'));
var SimpleImage = _interopDefault(require('@editorjs/simple-image'));
var reactEditorJs = require('react-editor-js');
var mdJsonConverter = require('md-json-converter');
var parse = _interopDefault(require('html-react-parser'));
var edjsHTML = _interopDefault(require('editorjs-renderer'));

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

// A type of promise-like that resolves synchronously and supports only one observer
const _Pact = /*#__PURE__*/(function() {
	function _Pact() {}
	_Pact.prototype.then = function(onFulfilled, onRejected) {
		const result = new _Pact();
		const state = this.s;
		if (state) {
			const callback = state & 1 ? onFulfilled : onRejected;
			if (callback) {
				try {
					_settle(result, 1, callback(this.v));
				} catch (e) {
					_settle(result, 2, e);
				}
				return result;
			} else {
				return this;
			}
		}
		this.o = function(_this) {
			try {
				const value = _this.v;
				if (_this.s & 1) {
					_settle(result, 1, onFulfilled ? onFulfilled(value) : value);
				} else if (onRejected) {
					_settle(result, 1, onRejected(value));
				} else {
					_settle(result, 2, value);
				}
			} catch (e) {
				_settle(result, 2, e);
			}
		};
		return result;
	};
	return _Pact;
})();

// Settles a pact synchronously
function _settle(pact, state, value) {
	if (!pact.s) {
		if (value instanceof _Pact) {
			if (value.s) {
				if (state & 1) {
					state = value.s;
				}
				value = value.v;
			} else {
				value.o = _settle.bind(null, pact, state);
				return;
			}
		}
		if (value && value.then) {
			value.then(_settle.bind(null, pact, state), _settle.bind(null, pact, 2));
			return;
		}
		pact.s = state;
		pact.v = value;
		const observer = pact.o;
		if (observer) {
			observer(pact);
		}
	}
}

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously implement a switch statement
function _switch(discriminant, cases) {
	var dispatchIndex = -1;
	var awaitBody;
	outer: {
		for (var i = 0; i < cases.length; i++) {
			var test = cases[i][0];
			if (test) {
				var testValue = test();
				if (testValue && testValue.then) {
					break outer;
				}
				if (testValue === discriminant) {
					dispatchIndex = i;
					break;
				}
			} else {
				// Found the default case, set it as the pending dispatch case
				dispatchIndex = i;
			}
		}
		if (dispatchIndex !== -1) {
			do {
				var body = cases[dispatchIndex][1];
				while (!body) {
					dispatchIndex++;
					body = cases[dispatchIndex][1];
				}
				var result = body();
				if (result && result.then) {
					awaitBody = true;
					break outer;
				}
				var fallthroughCheck = cases[dispatchIndex][2];
				dispatchIndex++;
			} while (fallthroughCheck && !fallthroughCheck());
			return result;
		}
	}
	const pact = new _Pact();
	const reject = _settle.bind(null, pact, 2);
	(awaitBody ? result.then(_resumeAfterBody) : testValue.then(_resumeAfterTest)).then(void 0, reject);
	return pact;
	function _resumeAfterTest(value) {
		for (;;) {
			if (value === discriminant) {
				dispatchIndex = i;
				break;
			}
			if (++i === cases.length) {
				if (dispatchIndex !== -1) {
					break;
				} else {
					_settle(pact, 1, result);
					return;
				}
			}
			test = cases[i][0];
			if (test) {
				value = test();
				if (value && value.then) {
					value.then(_resumeAfterTest).then(void 0, reject);
					return;
				}
			} else {
				dispatchIndex = i;
			}
		}
		do {
			var body = cases[dispatchIndex][1];
			while (!body) {
				dispatchIndex++;
				body = cases[dispatchIndex][1];
			}
			var result = body();
			if (result && result.then) {
				result.then(_resumeAfterBody).then(void 0, reject);
				return;
			}
			var fallthroughCheck = cases[dispatchIndex][2];
			dispatchIndex++;
		} while (fallthroughCheck && !fallthroughCheck());
		_settle(pact, 1, result);
	}
	function _resumeAfterBody(result) {
		for (;;) {
			var fallthroughCheck = cases[dispatchIndex][2];
			if (!fallthroughCheck || fallthroughCheck()) {
				break;
			}
			dispatchIndex++;
			var body = cases[dispatchIndex][1];
			while (!body) {
				dispatchIndex++;
				body = cases[dispatchIndex][1];
			}
			result = body();
			if (result && result.then) {
				result.then(_resumeAfterBody).then(void 0, reject);
				return;
			}
		}
		_settle(pact, 1, result);
	}
}

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var EditableTitle = function EditableTitle(_ref) {
  var title = _ref.title,
    setTitle = _ref.setTitle;
  var titleRef = React$1.useRef(null);
  var handleBlur = function handleBlur() {
    setTitle(titleRef.current.innerText);
  };
  React$1.useEffect(function () {
    var el = titleRef.current;
    if (el) {
      var range = document.createRange();
      var sel = window.getSelection();
      range.setStart(el.childNodes[0], title.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }, [title]);
  return /*#__PURE__*/React$1__default.createElement("h1", {
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
    onFocus: function onFocus() {
      titleRef.current.style.border = '1px dashed #ccc';
    }
  }, title);
};

var EditableDiv = function EditableDiv(_ref) {
  var label = _ref.label,
    content = _ref.content,
    setContent = _ref.setContent;
  var handleChange = function handleChange(event) {
    setContent(event.target.value);
  };
  return /*#__PURE__*/React$1__default.createElement(material.Grid, {
    container: true,
    alignItems: "center",
    spacing: 1
  }, /*#__PURE__*/React$1__default.createElement(material.Grid, {
    item: true,
    xs: 3
  }, /*#__PURE__*/React$1__default.createElement("label", null, label)), /*#__PURE__*/React$1__default.createElement(material.Grid, {
    item: true,
    xs: 9
  }, /*#__PURE__*/React$1__default.createElement(material.TextField, {
    fullWidth: true,
    multiline: true,
    variant: "outlined",
    value: content,
    onChange: handleChange,
    onBlur: function onBlur() {
      return setContent(content.trim());
    }
  })));
};

var EditableImage = function EditableImage(_ref) {
  var url = _ref.url,
    uploadEndPoint = _ref.uploadEndPoint,
    onImageChange = _ref.onImageChange,
    caption = _ref.caption,
    setCaption = _ref.setCaption,
    altDescription = _ref.altDescription,
    setAltDescription = _ref.setAltDescription;
  var fileInputRef = React$1.useRef(null);
  var uploadImage = function uploadImage(file) {
    try {
      var formData = new FormData();
      formData.append('image', file);
      var _temp = _catch(function () {
        return Promise.resolve(fetch(uploadEndPoint, {
          method: 'POST',
          body: formData
        })).then(function (response) {
          return Promise.resolve(response.json()).then(function (data) {
            if (data.success === 1) {
              onImageChange(data.file.url);
            } else {
              console.error('Failed to upload image:', data);
            }
          });
        });
      }, function (err) {
        console.error('Error uploading the image:', err);
      });
      return Promise.resolve(_temp && _temp.then ? _temp.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var handleFileChange = function handleFileChange(e) {
    var file = e.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };
  var handleDrop = function handleDrop(e) {
    e.preventDefault();
    var file = e.dataTransfer.files[0];
    if (file) {
      uploadImage(file);
    }
  };
  var handleClick = function handleClick() {
    fileInputRef.current.click();
  };
  return /*#__PURE__*/React$1__default.createElement(Box, {
    className: "container",
    style: {
      maxWidth: '650px'
    }
  }, url ? /*#__PURE__*/React$1__default.createElement(Box, {
    display: "flex",
    justifyContent: "center"
  }, /*#__PURE__*/React$1__default.createElement(ButtonBase, {
    onClick: handleClick,
    onDrop: handleDrop,
    onDragOver: function onDragOver(e) {
      return e.preventDefault();
    },
    style: {
      display: 'flex',
      justifyContent: 'center',
      maxWidth: '100%',
      height: 'auto',
      border: '1px dashed #ccc',
      padding: '0px'
    }
  }, /*#__PURE__*/React$1__default.createElement("input", {
    type: "file",
    ref: fileInputRef,
    style: {
      display: 'none'
    },
    onChange: handleFileChange
  }), /*#__PURE__*/React$1__default.createElement("img", {
    src: url,
    alt: altDescription,
    style: {
      maxWidth: '100%',
      maxHeight: '300px'
    }
  }))) : /*#__PURE__*/React$1__default.createElement(Box, null, /*#__PURE__*/React$1__default.createElement(ButtonBase, {
    onClick: handleClick,
    onDrop: handleDrop,
    onDragOver: function onDragOver(e) {
      return e.preventDefault();
    },
    style: {
      display: 'flex',
      justifyContent: 'center',
      maxWidth: '100%',
      height: 'auto',
      border: '1px dashed #ccc',
      padding: '10px'
    }
  }, /*#__PURE__*/React$1__default.createElement("input", {
    type: "file",
    ref: fileInputRef,
    style: {
      display: 'none'
    },
    onChange: handleFileChange
  }), /*#__PURE__*/React$1__default.createElement(Box, {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'auto'
    }
  }, /*#__PURE__*/React$1__default.createElement(Typography, {
    variant: "body1"
  }, "Click or Drag & Drop Image")))), /*#__PURE__*/React$1__default.createElement(Box, {
    sx: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      margin: 5
    }
  }, /*#__PURE__*/React$1__default.createElement(EditableDiv, {
    label: "Caption:",
    content: caption,
    setContent: setCaption
  }), /*#__PURE__*/React$1__default.createElement(EditableDiv, {
    label: "Alt description:",
    content: altDescription,
    setContent: setAltDescription
  })));
};

var HeaderEditor = function HeaderEditor(_ref) {
  var uploadEndPoint = _ref.uploadEndPoint,
    title = _ref.title,
    setTitle = _ref.setTitle,
    imageUrl = _ref.imageUrl,
    setImageUrl = _ref.setImageUrl,
    caption = _ref.caption,
    setCaption = _ref.setCaption,
    altDescription = _ref.altDescription,
    setAltDescription = _ref.setAltDescription;
  return /*#__PURE__*/React$1__default.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React$1__default.createElement(EditableTitle, {
    title: title,
    setTitle: setTitle
  }), /*#__PURE__*/React$1__default.createElement(EditableImage, {
    url: imageUrl,
    uploadEndPoint: uploadEndPoint,
    onImageChange: function onImageChange(newUrl) {
      return setImageUrl(newUrl);
    },
    caption: caption,
    setCaption: setCaption,
    altDescription: altDescription,
    setAltDescription: setAltDescription
  }));
};

var i = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19V19C9.13623 19 8.20435 19 7.46927 18.6955C6.48915 18.2895 5.71046 17.5108 5.30448 16.5307C5 15.7956 5 14.8638 5 13V12C5 9.19108 5 7.78661 5.67412 6.77772C5.96596 6.34096 6.34096 5.96596 6.77772 5.67412C7.78661 5 9.19108 5 12 5H13.5C14.8956 5 15.5933 5 16.1611 5.17224C17.4395 5.56004 18.44 6.56046 18.8278 7.83886C19 8.40666 19 9.10444 19 10.5V10.5"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 13V16M16 19V16M19 16H16M16 16H13"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6.5 17.5L17.5 6.5"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.9919 10.5H19.0015"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.9919 19H11.0015"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13L13 5"/></svg>',
  h = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.9919 9.5H19.0015"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.5 5H14.5096"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M14.625 5H15C17.2091 5 19 6.79086 19 9V9.375"/><path stroke="currentColor" stroke-width="2" d="M9.375 5L9 5C6.79086 5 5 6.79086 5 9V9.375"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.3725 5H9.38207"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 9.5H5.00957"/><path stroke="currentColor" stroke-width="2" d="M9.375 19H9C6.79086 19 5 17.2091 5 15V14.625"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.3725 19H9.38207"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 14.55H5.00957"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 13V16M16 19V16M19 16H16M16 16H13"/></svg>',
  z = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="14" height="14" x="5" y="5" stroke="currentColor" stroke-width="2" rx="4"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.13968 15.32L8.69058 11.5661C9.02934 11.2036 9.48873 11 9.96774 11C10.4467 11 10.9061 11.2036 11.2449 11.5661L15.3871 16M13.5806 14.0664L15.0132 12.533C15.3519 12.1705 15.8113 11.9668 16.2903 11.9668C16.7693 11.9668 17.2287 12.1705 17.5675 12.533L18.841 13.9634"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.7778 9.33331H13.7867"/></svg>',
  e1 = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9L20 12L17 15"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 12H20"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 9L4 12L7 15"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12H10"/></svg>';

function make(tagName, classNames, attributes) {
  if (classNames === void 0) {
    classNames = null;
  }
  if (attributes === void 0) {
    attributes = {};
  }
  var el = document.createElement(tagName);
  if (Array.isArray(classNames)) {
    var _el$classList;
    (_el$classList = el.classList).add.apply(_el$classList, classNames);
  } else if (classNames) {
    el.classList.add(classNames);
  }
  for (var attrName in attributes) {
    el[attrName] = attributes[attrName];
  }
  return el;
}

var Ui = /*#__PURE__*/function () {
  function Ui(_ref) {
    var api = _ref.api,
      config = _ref.config,
      onSelectFile = _ref.onSelectFile,
      readOnly = _ref.readOnly;
    this.api = api;
    this.config = config;
    this.onSelectFile = onSelectFile;
    this.readOnly = readOnly;
    this.nodes = {
      wrapper: make('div', [this.CSS.baseClass, this.CSS.wrapper]),
      imageContainer: make('div', [this.CSS.imageContainer]),
      fileButton: this.createFileButton(),
      imageEl: undefined,
      imagePreloader: make('div', this.CSS.imagePreloader),
      caption: make('div', [this.CSS.input, this.CSS.caption], {
        contentEditable: !this.readOnly
      })
    };
    this.nodes.caption.dataset.placeholder = this.config.captionPlaceholder;
    this.nodes.imageContainer.appendChild(this.nodes.imagePreloader);
    this.nodes.wrapper.appendChild(this.nodes.imageContainer);
    this.nodes.wrapper.appendChild(this.nodes.caption);
    this.nodes.wrapper.appendChild(this.nodes.fileButton);
  }
  var _proto = Ui.prototype;
  _proto.render = function render(toolData) {
    if (!toolData.file || Object.keys(toolData.file).length === 0) {
      this.toggleStatus(Ui.status.EMPTY);
    } else {
      this.toggleStatus(Ui.status.UPLOADING);
    }
    return this.nodes.wrapper;
  };
  _proto.createFileButton = function createFileButton() {
    var _this = this;
    var button = make('div', [this.CSS.button]);
    button.innerHTML = this.config.buttonContent || z + " " + this.api.i18n.t('Select an Image');
    button.addEventListener('click', function () {
      _this.onSelectFile();
    });
    return button;
  };
  _proto.showPreloader = function showPreloader(src) {
    this.nodes.imagePreloader.style.backgroundImage = "url(" + src + ")";
    this.toggleStatus(Ui.status.UPLOADING);
  };
  _proto.hidePreloader = function hidePreloader() {
    this.nodes.imagePreloader.style.backgroundImage = '';
    this.toggleStatus(Ui.status.EMPTY);
  };
  _proto.fillImage = function fillImage(url) {
    var _this2 = this;
    var tag = /\.mp4$/.test(url) ? 'VIDEO' : 'IMG';
    var attributes = {
      src: url
    };
    var eventName = 'load';
    if (tag === 'VIDEO') {
      attributes.autoplay = true;
      attributes.loop = true;
      attributes.muted = true;
      attributes.playsinline = true;
      eventName = 'loadeddata';
    }
    this.nodes.imageEl = make(tag, this.CSS.imageEl, attributes);
    this.nodes.imageEl.addEventListener(eventName, function () {
      _this2.toggleStatus(Ui.status.FILLED);
      if (_this2.nodes.imagePreloader) {
        _this2.nodes.imagePreloader.style.backgroundImage = '';
      }
    });
    this.nodes.imageContainer.appendChild(this.nodes.imageEl);
  };
  _proto.fillCaption = function fillCaption(text) {
    if (this.nodes.caption) {
      this.nodes.caption.innerHTML = text;
    }
  };
  _proto.toggleStatus = function toggleStatus(status) {
    for (var statusType in Ui.status) {
      if (Object.prototype.hasOwnProperty.call(Ui.status, statusType)) {
        this.nodes.wrapper.classList.toggle(this.CSS.wrapper + "--" + Ui.status[statusType], status === Ui.status[statusType]);
      }
    }
  };
  _proto.applyTune = function applyTune(tuneName, status) {
    this.nodes.wrapper.classList.toggle(this.CSS.wrapper + "--" + tuneName, status);
  };
  _createClass(Ui, [{
    key: "CSS",
    get: function get() {
      return {
        baseClass: this.api.styles.block,
        loading: this.api.styles.loader,
        input: this.api.styles.input,
        button: this.api.styles.button,
        wrapper: 'image-tool',
        imageContainer: 'image-tool__image',
        imagePreloader: 'image-tool__image-preloader',
        imageEl: 'image-tool__image-picture',
        caption: 'image-tool__caption'
      };
    }
  }], [{
    key: "status",
    get: function get() {
      return {
        EMPTY: 'empty',
        UPLOADING: 'loading',
        FILLED: 'filled'
      };
    }
  }]);
  return Ui;
}();

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var main = createCommonjsModule(function (module, exports) {
  !function (e, t) {
     module.exports = t() ;
  }(window, function () {
    return function (e) {
      var t = {};
      function n(r) {
        if (t[r]) return t[r].exports;
        var o = t[r] = {
          i: r,
          l: !1,
          exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
      }
      return n.m = e, n.c = t, n.d = function (e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
          enumerable: !0,
          get: r
        });
      }, n.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
          value: "Module"
        }), Object.defineProperty(e, "__esModule", {
          value: !0
        });
      }, n.t = function (e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
          enumerable: !0,
          value: e
        }), 2 & t && "string" != typeof e) for (var o in e) n.d(r, o, function (t) {
          return e[t];
        }.bind(null, o));
        return r;
      }, n.n = function (e) {
        var t = e && e.__esModule ? function () {
          return e["default"];
        } : function () {
          return e;
        };
        return n.d(t, "a", t), t;
      }, n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }, n.p = "", n(n.s = 3);
    }([function (e, t) {
      var n;
      n = function () {
        return this;
      }();
      try {
        n = n || new Function("return this")();
      } catch (e) {
        "object" == typeof window && (n = window);
      }
      e.exports = n;
    }, function (e, t, n) {

      (function (e) {
        var r = n(2),
          o = setTimeout;
        function i() {}
        function a(e) {
          if (!(this instanceof a)) throw new TypeError("Promises must be constructed via new");
          if ("function" != typeof e) throw new TypeError("not a function");
          this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], d(e, this);
        }
        function u(e, t) {
          for (; 3 === e._state;) e = e._value;
          0 !== e._state ? (e._handled = !0, a._immediateFn(function () {
            var n = 1 === e._state ? t.onFulfilled : t.onRejected;
            if (null !== n) {
              var r;
              try {
                r = n(e._value);
              } catch (e) {
                return void s(t.promise, e);
              }
              c(t.promise, r);
            } else (1 === e._state ? c : s)(t.promise, e._value);
          })) : e._deferreds.push(t);
        }
        function c(e, t) {
          try {
            if (t === e) throw new TypeError("A promise cannot be resolved with itself.");
            if (t && ("object" == typeof t || "function" == typeof t)) {
              var n = t.then;
              if (t instanceof a) return e._state = 3, e._value = t, void f(e);
              if ("function" == typeof n) return void d((r = n, o = t, function () {
                r.apply(o, arguments);
              }), e);
            }
            e._state = 1, e._value = t, f(e);
          } catch (t) {
            s(e, t);
          }
          var r, o;
        }
        function s(e, t) {
          e._state = 2, e._value = t, f(e);
        }
        function f(e) {
          2 === e._state && 0 === e._deferreds.length && a._immediateFn(function () {
            e._handled || a._unhandledRejectionFn(e._value);
          });
          for (var t = 0, n = e._deferreds.length; t < n; t++) u(e, e._deferreds[t]);
          e._deferreds = null;
        }
        function l(e, t, n) {
          this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.promise = n;
        }
        function d(e, t) {
          var n = !1;
          try {
            e(function (e) {
              n || (n = !0, c(t, e));
            }, function (e) {
              n || (n = !0, s(t, e));
            });
          } catch (e) {
            if (n) return;
            n = !0, s(t, e);
          }
        }
        a.prototype["catch"] = function (e) {
          return this.then(null, e);
        }, a.prototype.then = function (e, t) {
          var n = new this.constructor(i);
          return u(this, new l(e, t, n)), n;
        }, a.prototype["finally"] = r.a, a.all = function (e) {
          return new a(function (t, n) {
            if (!e || void 0 === e.length) throw new TypeError("Promise.all accepts an array");
            var r = Array.prototype.slice.call(e);
            if (0 === r.length) return t([]);
            var o = r.length;
            function i(e, a) {
              try {
                if (a && ("object" == typeof a || "function" == typeof a)) {
                  var u = a.then;
                  if ("function" == typeof u) return void u.call(a, function (t) {
                    i(e, t);
                  }, n);
                }
                r[e] = a, 0 == --o && t(r);
              } catch (e) {
                n(e);
              }
            }
            for (var a = 0; a < r.length; a++) i(a, r[a]);
          });
        }, a.resolve = function (e) {
          return e && "object" == typeof e && e.constructor === a ? e : new a(function (t) {
            t(e);
          });
        }, a.reject = function (e) {
          return new a(function (t, n) {
            n(e);
          });
        }, a.race = function (e) {
          return new a(function (t, n) {
            for (var r = 0, o = e.length; r < o; r++) e[r].then(t, n);
          });
        }, a._immediateFn = "function" == typeof e && function (t) {
          e(t);
        } || function (e) {
          o(e, 0);
        }, a._unhandledRejectionFn = function (e) {
          "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e);
        }, t.a = a;
      }).call(this, n(5).setImmediate);
    }, function (e, t, n) {

      t.a = function (e) {
        var t = this.constructor;
        return this.then(function (n) {
          return t.resolve(e()).then(function () {
            return n;
          });
        }, function (n) {
          return t.resolve(e()).then(function () {
            return t.reject(n);
          });
        });
      };
    }, function (e, t, n) {

      function r(e) {
        return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
          return typeof e;
        } : function (e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        })(e);
      }
      n(4);
      var o,
        i,
        a,
        u,
        c,
        s,
        f,
        l = n(8),
        d = (i = function i(e) {
          return new Promise(function (t, n) {
            e = u(e), (e = c(e)).beforeSend && e.beforeSend();
            var r = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject("Microsoft.XMLHTTP");
            r.open(e.method, e.url), r.setRequestHeader("X-Requested-With", "XMLHttpRequest"), Object.keys(e.headers).forEach(function (t) {
              var n = e.headers[t];
              r.setRequestHeader(t, n);
            });
            var o = e.ratio;
            r.upload.addEventListener("progress", function (t) {
              var n = Math.round(t.loaded / t.total * 100),
                r = Math.ceil(n * o / 100);
              e.progress(Math.min(r, 100));
            }, !1), r.addEventListener("progress", function (t) {
              var n = Math.round(t.loaded / t.total * 100),
                r = Math.ceil(n * (100 - o) / 100) + o;
              e.progress(Math.min(r, 100));
            }, !1), r.onreadystatechange = function () {
              if (4 === r.readyState) {
                var e = r.response;
                try {
                  e = JSON.parse(e);
                } catch (e) {}
                var o = l.parseHeaders(r.getAllResponseHeaders()),
                  i = {
                    body: e,
                    code: r.status,
                    headers: o
                  };
                f(r.status) ? t(i) : n(i);
              }
            }, r.send(e.data);
          });
        }, a = function a(e) {
          return e.method = "POST", i(e);
        }, u = function u() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if (e.url && "string" != typeof e.url) throw new Error("Url must be a string");
          if (e.url = e.url || "", e.method && "string" != typeof e.method) throw new Error("`method` must be a string or null");
          if (e.method = e.method ? e.method.toUpperCase() : "GET", e.headers && "object" !== r(e.headers)) throw new Error("`headers` must be an object or null");
          if (e.headers = e.headers || {}, e.type && ("string" != typeof e.type || !Object.values(o).includes(e.type))) throw new Error("`type` must be taken from module's «contentType» library");
          if (e.progress && "function" != typeof e.progress) throw new Error("`progress` must be a function or null");
          if (e.progress = e.progress || function (e) {}, e.beforeSend = e.beforeSend || function (e) {}, e.ratio && "number" != typeof e.ratio) throw new Error("`ratio` must be a number");
          if (e.ratio < 0 || e.ratio > 100) throw new Error("`ratio` must be in a 0-100 interval");
          if (e.ratio = e.ratio || 90, e.accept && "string" != typeof e.accept) throw new Error("`accept` must be a string with a list of allowed mime-types");
          if (e.accept = e.accept || "*/*", e.multiple && "boolean" != typeof e.multiple) throw new Error("`multiple` must be a true or false");
          if (e.multiple = e.multiple || !1, e.fieldName && "string" != typeof e.fieldName) throw new Error("`fieldName` must be a string");
          return e.fieldName = e.fieldName || "files", e;
        }, c = function c(e) {
          switch (e.method) {
            case "GET":
              var t = s(e.data, o.URLENCODED);
              delete e.data, e.url = /\?/.test(e.url) ? e.url + "&" + t : e.url + "?" + t;
              break;
            case "POST":
            case "PUT":
            case "DELETE":
            case "UPDATE":
              var n = function () {
                return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).type || o.JSON;
              }(e);
              (l.isFormData(e.data) || l.isFormElement(e.data)) && (n = o.FORM), e.data = s(e.data, n), n !== d.contentType.FORM && (e.headers["content-type"] = n);
          }
          return e;
        }, s = function s() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          switch (arguments.length > 1 ? arguments[1] : void 0) {
            case o.URLENCODED:
              return l.urlEncode(e);
            case o.JSON:
              return l.jsonEncode(e);
            case o.FORM:
              return l.formEncode(e);
            default:
              return e;
          }
        }, f = function f(e) {
          return e >= 200 && e < 300;
        }, {
          contentType: o = {
            URLENCODED: "application/x-www-form-urlencoded; charset=utf-8",
            FORM: "multipart/form-data",
            JSON: "application/json; charset=utf-8"
          },
          request: i,
          get: function get(e) {
            return e.method = "GET", i(e);
          },
          post: a,
          transport: function transport(e) {
            return e = u(e), l.selectFiles(e).then(function (t) {
              for (var n = new FormData(), r = 0; r < t.length; r++) n.append(e.fieldName, t[r], t[r].name);
              l.isObject(e.data) && Object.keys(e.data).forEach(function (t) {
                var r = e.data[t];
                n.append(t, r);
              });
              var o = e.beforeSend;
              return e.beforeSend = function () {
                return o(t);
              }, e.data = n, a(e);
            });
          },
          selectFiles: function selectFiles(e) {
            return delete (e = u(e)).beforeSend, l.selectFiles(e);
          }
        });
      e.exports = d;
    }, function (e, t, n) {

      n.r(t);
      var r = n(1);
      window.Promise = window.Promise || r.a;
    }, function (e, t, n) {
      (function (e) {
        var r = void 0 !== e && e || "undefined" != typeof self && self || window,
          o = Function.prototype.apply;
        function i(e, t) {
          this._id = e, this._clearFn = t;
        }
        t.setTimeout = function () {
          return new i(o.call(setTimeout, r, arguments), clearTimeout);
        }, t.setInterval = function () {
          return new i(o.call(setInterval, r, arguments), clearInterval);
        }, t.clearTimeout = t.clearInterval = function (e) {
          e && e.close();
        }, i.prototype.unref = i.prototype.ref = function () {}, i.prototype.close = function () {
          this._clearFn.call(r, this._id);
        }, t.enroll = function (e, t) {
          clearTimeout(e._idleTimeoutId), e._idleTimeout = t;
        }, t.unenroll = function (e) {
          clearTimeout(e._idleTimeoutId), e._idleTimeout = -1;
        }, t._unrefActive = t.active = function (e) {
          clearTimeout(e._idleTimeoutId);
          var t = e._idleTimeout;
          t >= 0 && (e._idleTimeoutId = setTimeout(function () {
            e._onTimeout && e._onTimeout();
          }, t));
        }, n(6), t.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== e && e.setImmediate || this && this.setImmediate, t.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== e && e.clearImmediate || this && this.clearImmediate;
      }).call(this, n(0));
    }, function (e, t, n) {
      (function (e, t) {
        !function (e, n) {

          if (!e.setImmediate) {
            var r,
              o,
              i,
              a,
              u,
              c = 1,
              s = {},
              f = !1,
              l = e.document,
              d = Object.getPrototypeOf && Object.getPrototypeOf(e);
            d = d && d.setTimeout ? d : e, "[object process]" === {}.toString.call(e.process) ? r = function r(e) {
              t.nextTick(function () {
                m(e);
              });
            } : !function () {
              if (e.postMessage && !e.importScripts) {
                var t = !0,
                  n = e.onmessage;
                return e.onmessage = function () {
                  t = !1;
                }, e.postMessage("", "*"), e.onmessage = n, t;
              }
            }() ? e.MessageChannel ? ((i = new MessageChannel()).port1.onmessage = function (e) {
              m(e.data);
            }, r = function r(e) {
              i.port2.postMessage(e);
            }) : l && "onreadystatechange" in l.createElement("script") ? (o = l.documentElement, r = function r(e) {
              var t = l.createElement("script");
              t.onreadystatechange = function () {
                m(e), t.onreadystatechange = null, o.removeChild(t), t = null;
              }, o.appendChild(t);
            }) : r = function r(e) {
              setTimeout(m, 0, e);
            } : (a = "setImmediate$" + Math.random() + "$", u = function u(t) {
              t.source === e && "string" == typeof t.data && 0 === t.data.indexOf(a) && m(+t.data.slice(a.length));
            }, e.addEventListener ? e.addEventListener("message", u, !1) : e.attachEvent("onmessage", u), r = function r(t) {
              e.postMessage(a + t, "*");
            }), d.setImmediate = function (e) {
              "function" != typeof e && (e = new Function("" + e));
              for (var t = new Array(arguments.length - 1), n = 0; n < t.length; n++) t[n] = arguments[n + 1];
              var o = {
                callback: e,
                args: t
              };
              return s[c] = o, r(c), c++;
            }, d.clearImmediate = p;
          }
          function p(e) {
            delete s[e];
          }
          function m(e) {
            if (f) setTimeout(m, 0, e);else {
              var t = s[e];
              if (t) {
                f = !0;
                try {
                  !function (e) {
                    var t = e.callback,
                      r = e.args;
                    switch (r.length) {
                      case 0:
                        t();
                        break;
                      case 1:
                        t(r[0]);
                        break;
                      case 2:
                        t(r[0], r[1]);
                        break;
                      case 3:
                        t(r[0], r[1], r[2]);
                        break;
                      default:
                        t.apply(n, r);
                    }
                  }(t);
                } finally {
                  p(e), f = !1;
                }
              }
            }
          }
        }("undefined" == typeof self ? void 0 === e ? this : e : self);
      }).call(this, n(0), n(7));
    }, function (e, t) {
      var n,
        r,
        o = e.exports = {};
      function i() {
        throw new Error("setTimeout has not been defined");
      }
      function a() {
        throw new Error("clearTimeout has not been defined");
      }
      function u(e) {
        if (n === setTimeout) return setTimeout(e, 0);
        if ((n === i || !n) && setTimeout) return n = setTimeout, setTimeout(e, 0);
        try {
          return n(e, 0);
        } catch (t) {
          try {
            return n.call(null, e, 0);
          } catch (t) {
            return n.call(this, e, 0);
          }
        }
      }
      !function () {
        try {
          n = "function" == typeof setTimeout ? setTimeout : i;
        } catch (e) {
          n = i;
        }
        try {
          r = "function" == typeof clearTimeout ? clearTimeout : a;
        } catch (e) {
          r = a;
        }
      }();
      var c,
        s = [],
        f = !1,
        l = -1;
      function d() {
        f && c && (f = !1, c.length ? s = c.concat(s) : l = -1, s.length && p());
      }
      function p() {
        if (!f) {
          var e = u(d);
          f = !0;
          for (var t = s.length; t;) {
            for (c = s, s = []; ++l < t;) c && c[l].run();
            l = -1, t = s.length;
          }
          c = null, f = !1, function (e) {
            if (r === clearTimeout) return clearTimeout(e);
            if ((r === a || !r) && clearTimeout) return r = clearTimeout, clearTimeout(e);
            try {
              r(e);
            } catch (t) {
              try {
                return r.call(null, e);
              } catch (t) {
                return r.call(this, e);
              }
            }
          }(e);
        }
      }
      function m(e, t) {
        this.fun = e, this.array = t;
      }
      function h() {}
      o.nextTick = function (e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        s.push(new m(e, t)), 1 !== s.length || f || u(p);
      }, m.prototype.run = function () {
        this.fun.apply(null, this.array);
      }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = h, o.addListener = h, o.once = h, o.off = h, o.removeListener = h, o.removeAllListeners = h, o.emit = h, o.prependListener = h, o.prependOnceListener = h, o.listeners = function (e) {
        return [];
      }, o.binding = function (e) {
        throw new Error("process.binding is not supported");
      }, o.cwd = function () {
        return "/";
      }, o.chdir = function (e) {
        throw new Error("process.chdir is not supported");
      }, o.umask = function () {
        return 0;
      };
    }, function (e, t, n) {
      function r(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }
      var o = n(9);
      e.exports = function () {
        function e() {
          !function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, e);
        }
        var t, n, i;
        return t = e, i = [{
          key: "urlEncode",
          value: function value(e) {
            return o(e);
          }
        }, {
          key: "jsonEncode",
          value: function value(e) {
            return JSON.stringify(e);
          }
        }, {
          key: "formEncode",
          value: function value(e) {
            if (this.isFormData(e)) return e;
            if (this.isFormElement(e)) return new FormData(e);
            if (this.isObject(e)) {
              var t = new FormData();
              return Object.keys(e).forEach(function (n) {
                var r = e[n];
                t.append(n, r);
              }), t;
            }
            throw new Error("`data` must be an instance of Object, FormData or <FORM> HTMLElement");
          }
        }, {
          key: "isObject",
          value: function value(e) {
            return "[object Object]" === Object.prototype.toString.call(e);
          }
        }, {
          key: "isFormData",
          value: function value(e) {
            return e instanceof FormData;
          }
        }, {
          key: "isFormElement",
          value: function value(e) {
            return e instanceof HTMLFormElement;
          }
        }, {
          key: "selectFiles",
          value: function value() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return new Promise(function (t, n) {
              var r = document.createElement("INPUT");
              r.type = "file", e.multiple && r.setAttribute("multiple", "multiple"), e.accept && r.setAttribute("accept", e.accept), r.style.display = "none", document.body.appendChild(r), r.addEventListener("change", function (e) {
                var n = e.target.files;
                t(n), document.body.removeChild(r);
              }, !1), r.click();
            });
          }
        }, {
          key: "parseHeaders",
          value: function value(e) {
            var t = e.trim().split(/[\r\n]+/),
              n = {};
            return t.forEach(function (e) {
              var t = e.split(": "),
                r = t.shift(),
                o = t.join(": ");
              r && (n[r] = o);
            }), n;
          }
        }], (n = null) && r(t.prototype, n), i && r(t, i), e;
      }();
    }, function (e, t) {
      var n = function n(e) {
          return encodeURIComponent(e).replace(/[!'()*]/g, escape).replace(/%20/g, "+");
        },
        r = function r(e, t, o, i) {
          return t = t || null, o = o || "&", i = i || null, e ? function (e) {
            for (var t = new Array(), n = 0; n < e.length; n++) e[n] && t.push(e[n]);
            return t;
          }(Object.keys(e).map(function (a) {
            var u,
              c,
              s = a;
            if (i && (s = i + "[" + s + "]"), "object" == typeof e[a] && null !== e[a]) u = r(e[a], null, o, s);else {
              t && (c = s, s = !isNaN(parseFloat(c)) && isFinite(c) ? t + Number(s) : s);
              var f = e[a];
              f = (f = 0 === (f = !1 === (f = !0 === f ? "1" : f) ? "0" : f) ? "0" : f) || "", u = n(s) + "=" + n(f);
            }
            return u;
          })).join(o).replace(/[!'()*]/g, "") : "";
        };
      e.exports = r;
    }]);
  });
});
var ajax = unwrapExports(main);

function isPromise(object) {
  return object && typeof object.then === 'function';
}

var Uploader = /*#__PURE__*/function () {
  function Uploader(_ref) {
    var config = _ref.config,
      onUpload = _ref.onUpload,
      onError = _ref.onError;
    this.config = config;
    this.onUpload = onUpload;
    this.onError = onError;
  }
  var _proto = Uploader.prototype;
  _proto.uploadSelectedFile = function uploadSelectedFile(_ref2) {
    var _this = this;
    var onPreview = _ref2.onPreview;
    var preparePreview = function preparePreview(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        onPreview(e.target.result);
      };
    };
    var upload;
    if (this.config.uploader && typeof this.config.uploader.uploadByFile === 'function') {
      upload = ajax.selectFiles({
        accept: this.config.types
      }).then(function (files) {
        preparePreview(files[0]);
        var customUpload = _this.config.uploader.uploadByFile(files[0]);
        if (!isPromise(customUpload)) {
          console.warn('Custom uploader method uploadByFile should return a Promise');
        }
        return customUpload;
      });
    } else {
      upload = ajax.transport({
        url: this.config.endpoints.byFile,
        data: this.config.additionalRequestData,
        accept: this.config.types,
        headers: this.config.additionalRequestHeaders,
        beforeSend: function beforeSend(files) {
          preparePreview(files[0]);
        },
        fieldName: this.config.field
      }).then(function (response) {
        return response.body;
      });
    }
    upload.then(function (response) {
      _this.onUpload(response);
    })["catch"](function (error) {
      _this.onError(error);
    });
  };
  _proto.uploadByUrl = function uploadByUrl(url) {
    var _this2 = this;
    var upload;
    if (this.config.uploader && typeof this.config.uploader.uploadByUrl === 'function') {
      upload = this.config.uploader.uploadByUrl(url);
      if (!isPromise(upload)) {
        console.warn('Custom uploader method uploadByUrl should return a Promise');
      }
    } else {
      upload = ajax.post({
        url: this.config.endpoints.byUrl,
        data: Object.assign({
          url: url
        }, this.config.additionalRequestData),
        type: ajax.contentType.JSON,
        headers: this.config.additionalRequestHeaders
      }).then(function (response) {
        return response.body;
      });
    }
    upload.then(function (response) {
      _this2.onUpload(response);
    })["catch"](function (error) {
      _this2.onError(error);
    });
  };
  _proto.uploadByFile = function uploadByFile(file, _ref3) {
    var _this3 = this;
    var onPreview = _ref3.onPreview;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      onPreview(e.target.result);
    };
    var upload;
    if (this.config.uploader && typeof this.config.uploader.uploadByFile === 'function') {
      upload = this.config.uploader.uploadByFile(file);
      if (!isPromise(upload)) {
        console.warn('Custom uploader method uploadByFile should return a Promise');
      }
    } else {
      var formData = new FormData();
      formData.append(this.config.field, file);
      if (this.config.additionalRequestData && Object.keys(this.config.additionalRequestData).length) {
        Object.entries(this.config.additionalRequestData).forEach(function (_ref4) {
          var name = _ref4[0],
            value = _ref4[1];
          formData.append(name, value);
        });
      }
      upload = ajax.post({
        url: this.config.endpoints.byFile,
        data: formData,
        type: ajax.contentType.JSON,
        headers: this.config.additionalRequestHeaders
      }).then(function (response) {
        return response.body;
      });
    }
    upload.then(function (response) {
      _this3.onUpload(response);
    })["catch"](function (error) {
      _this3.onError(error);
    });
  };
  return Uploader;
}();

var ImageTool = /*#__PURE__*/function () {
  function ImageTool(_ref) {
    var _this = this;
    var data = _ref.data,
      config = _ref.config,
      api = _ref.api,
      readOnly = _ref.readOnly,
      block = _ref.block;
    this.api = api;
    this.readOnly = readOnly;
    this.block = block;
    this.config = {
      endpoints: config.endpoints || '',
      additionalRequestData: config.additionalRequestData || {},
      additionalRequestHeaders: config.additionalRequestHeaders || {},
      field: config.field || 'image',
      types: config.types || 'image/*',
      captionPlaceholder: this.api.i18n.t(config.captionPlaceholder || 'Caption'),
      buttonContent: config.buttonContent || '',
      uploader: config.uploader || undefined,
      actions: config.actions || []
    };
    this.uploader = new Uploader({
      config: this.config,
      onUpload: function onUpload(response) {
        return _this.onUpload(response);
      },
      onError: function onError(error) {
        return _this.uploadingFailed(error);
      }
    });
    this.ui = new Ui({
      api: api,
      config: this.config,
      onSelectFile: function onSelectFile() {
        _this.uploader.uploadSelectedFile({
          onPreview: function onPreview(src) {
            _this.ui.showPreloader(src);
          }
        });
      },
      readOnly: readOnly
    });
    this._data = {};
    this.data = data;
  }
  var _proto = ImageTool.prototype;
  _proto.render = function render() {
    return this.ui.render(this.data);
  };
  _proto.validate = function validate(savedData) {
    return savedData.file && savedData.file.url;
  };
  _proto.save = function save() {
    var caption = this.ui.nodes.caption;
    this._data.caption = caption.innerHTML;
    return this.data;
  };
  _proto.renderSettings = function renderSettings() {
    var _this2 = this;
    var tunes = ImageTool.tunes.concat(this.config.actions);
    return tunes.map(function (tune) {
      return {
        icon: tune.icon,
        label: _this2.api.i18n.t(tune.title),
        name: tune.name,
        toggle: tune.toggle,
        isActive: _this2.data[tune.name],
        onActivate: function onActivate() {
          if (typeof tune.action === 'function') {
            tune.action(tune.name);
            return;
          }
          _this2.tuneToggled(tune.name);
        }
      };
    });
  };
  _proto.appendCallback = function appendCallback() {
    this.ui.nodes.fileButton.click();
  };
  _proto.onPaste = function onPaste(event) {
    try {
      var _interrupt = false;
      var _this3 = this;
      var _temp3 = _switch(event.type, [[function () {
        return 'tag';
      }, function () {
        {
          var _temp2 = function _temp2() {
            _this3.uploadUrl(image.src);
            _interrupt = true;
          };
          var image = event.detail.data;
          var _temp = function () {
            if (/^blob:/.test(image.src)) {
              return Promise.resolve(fetch(image.src)).then(function (response) {
                return Promise.resolve(response.blob()).then(function (file) {
                  _this3.uploadFile(file);
                  _interrupt = true;
                });
              });
            }
          }();
          return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
        }
      }, function () {
        return _interrupt || _interrupt;
      }], [function () {
        return 'pattern';
      }, function () {
        {
          var url = event.detail.data;
          _this3.uploadUrl(url);
          _interrupt = true;
          return;
        }
      }], [function () {
        return 'file';
      }, function () {
        {
          var file = event.detail.file;
          _this3.uploadFile(file);
          _interrupt = true;
          return;
        }
      }]]);
      return Promise.resolve(_temp3 && _temp3.then ? _temp3.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  _proto.onUpload = function onUpload(response) {
    if (response.success && response.file) {
      this.image = response.file;
    } else {
      this.uploadingFailed('incorrect response: ' + JSON.stringify(response));
    }
  };
  _proto.uploadingFailed = function uploadingFailed(errorText) {
    console.log('Image Tool: uploading failed because of', errorText);
    this.api.notifier.show({
      message: this.api.i18n.t('Couldn’t upload image. Please try another.'),
      style: 'error'
    });
    this.ui.hidePreloader();
  };
  _proto.tuneToggled = function tuneToggled(tuneName) {
    this.setTune(tuneName, !this._data[tuneName]);
  };
  _proto.setTune = function setTune(tuneName, value) {
    var _this4 = this;
    this._data[tuneName] = value;
    this.ui.applyTune(tuneName, value);
    if (tuneName === 'stretched') {
      Promise.resolve().then(function () {
        _this4.block.stretched = value;
      })["catch"](function (err) {
        console.error(err);
      });
    }
  };
  _proto.uploadFile = function uploadFile(file) {
    var _this5 = this;
    this.uploader.uploadByFile(file, {
      onPreview: function onPreview(src) {
        _this5.ui.showPreloader(src);
      }
    });
  };
  _proto.uploadUrl = function uploadUrl(url) {
    this.ui.showPreloader(url);
    this.uploader.uploadByUrl(url);
  };
  _createClass(ImageTool, [{
    key: "data",
    get: function get() {
      return this._data;
    },
    set: function set(data) {
      var _this6 = this;
      this.image = data.file;
      this._data.caption = data.caption || '';
      this.ui.fillCaption(this._data.caption);
      ImageTool.tunes.forEach(function (_ref2) {
        var tune = _ref2.name;
        var value = typeof data[tune] !== 'undefined' ? data[tune] === true || data[tune] === 'true' : false;
        _this6.setTune(tune, value);
      });
    }
  }, {
    key: "image",
    set: function set(file) {
      this._data.file = file || {};
      if (file && file.url) {
        this.ui.fillImage(file.url);
      }
    }
  }], [{
    key: "isReadOnlySupported",
    get: function get() {
      return true;
    }
  }, {
    key: "toolbox",
    get: function get() {
      return {
        icon: z,
        title: 'Image'
      };
    }
  }, {
    key: "tunes",
    get: function get() {
      return [{
        name: 'withBorder',
        icon: h,
        title: 'With border',
        toggle: true
      }, {
        name: 'stretched',
        icon: e1,
        title: 'Stretch image',
        toggle: true
      }, {
        name: 'withBackground',
        icon: i,
        title: 'With background',
        toggle: true
      }];
    }
  }, {
    key: "pasteConfig",
    get: function get() {
      return {
        tags: [{
          img: {
            src: true
          }
        }],
        patterns: {
          image: /https?:\/\/\S+\.(gif|jpe?g|tiff|png|svg|webp)(\?[a-z0-9=]*)?$/i
        },
        files: {
          mimeTypes: ['image/*']
        }
      };
    }
  }]);
  return ImageTool;
}();

var createEditorTools = function createEditorTools(uploadEndPoint) {
  return {
    embed: Embed,
    table: Table,
    list: List,
    warning: Warning,
    code: Code,
    linkTool: LinkTool,
    image: {
      "class": ImageTool,
      config: {
        endpoints: {
          byFile: uploadEndPoint || 'http://localhost:5252/api/uploadImage'
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
};

function EditorEditor(_ref) {
  var data = _ref.data,
    setData = _ref.setData,
    uploadEndPoint = _ref.uploadEndPoint;
  var _useState = React$1.useState(data.metadata.title),
    title = _useState[0],
    setTitle = _useState[1];
  var _useState2 = React$1.useState(data.metadata.ogImage),
    imageUrl = _useState2[0],
    setImageUrl = _useState2[1];
  var _useState3 = React$1.useState(data.metadata.ogImageCaption),
    caption = _useState3[0],
    setCaption = _useState3[1];
  var _useState4 = React$1.useState(data.metadata.ogImageAlt),
    altDescription = _useState4[0],
    setAltDescription = _useState4[1];
  var initialData = mdJsonConverter.json2cleanjson(data).bodyBlocks;
  var editorCore = React$1.useRef(null);
  var ReactEditorJS = reactEditorJs.createReactEditorJS();
  var handleInitialize = React$1.useCallback(function (instance) {
    try {
      var _temp = _catch(function () {
        return Promise.resolve(instance._editorJS.isReady).then(function () {
          editorCore.current = instance;
        });
      }, function (err) {
        console.log("An error occurred", err);
      });
      return Promise.resolve(_temp && _temp.then ? _temp.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  }, []);
  var handleSave = React$1.useCallback(function () {
    try {
      return Promise.resolve(editorCore.current.save()).then(function (savedData) {
        var markdown = mdJsonConverter.cleanjson2md(savedData);
        var content = mdJsonConverter.md2json(markdown);
        var newData = _extends({}, data, {
          content: content
        });
        setData(newData);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }, [setData]);
  React$1.useEffect(function () {
    var updateData = _extends({}, data, {
      metadata: _extends({}, data.metadata, {
        title: title,
        ogImage: imageUrl,
        ogImageCaption: caption,
        ogImageAlt: altDescription
      })
    });
    if (JSON.stringify(data) !== JSON.stringify(updateData)) {
      setData(updateData);
    }
  }, [title, imageUrl, caption, altDescription]);
  return /*#__PURE__*/React$1__default.createElement("div", {
    className: "editor-container"
  }, /*#__PURE__*/React$1__default.createElement("h4", {
    className: "edit-mode-alert"
  }, "! Edit Mode Enabled"), /*#__PURE__*/React$1__default.createElement(HeaderEditor, {
    uploadEndPoint: uploadEndPoint,
    title: title,
    setTitle: setTitle,
    imageUrl: imageUrl,
    setImageUrl: setImageUrl,
    caption: caption,
    setCaption: setCaption,
    altDescription: altDescription,
    setAltDescription: setAltDescription
  }), /*#__PURE__*/React$1__default.createElement(ReactEditorJS, {
    onInitialize: handleInitialize,
    tools: createEditorTools(uploadEndPoint),
    onChange: handleSave,
    defaultValue: initialData
  }));
}

function extractHeaders(blocks) {
  return blocks.filter(function (block) {
    return block.type === 'header' && block.data.level === 2;
  }).map(function (block) {
    return {
      text: block.data.text,
      id: block.id
    };
  });
}
var handleClick = function handleClick(e, id, scrollOffset) {
  e.preventDefault();
  var headerElement = document.getElementById(id);
  if (headerElement) {
    var offsetPosition = headerElement.offsetTop - scrollOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};
function TableOfContents(_ref) {
  var data = _ref.data,
    title = _ref.title,
    scrollOffset = _ref.scrollOffset,
    _ref$bulletPoints = _ref.bulletPoints,
    bulletPoints = _ref$bulletPoints === void 0 ? true : _ref$bulletPoints;
  var headers = extractHeaders(data.blocks);
  if (headers.length === 0) {
    return /*#__PURE__*/React$1__default.createElement(Fragment, null);
  }
  if (bulletPoints) {
    return /*#__PURE__*/React$1__default.createElement("div", {
      className: "table-of-contents"
    }, /*#__PURE__*/React$1__default.createElement("h2", null, title), /*#__PURE__*/React$1__default.createElement("ul", null, headers.map(function (header) {
      return /*#__PURE__*/React$1__default.createElement("li", {
        key: header.id
      }, /*#__PURE__*/React$1__default.createElement("a", {
        href: "#" + header.id,
        className: "toc-item",
        onClick: function onClick(e) {
          return handleClick(e, header.id, scrollOffset);
        }
      }, header.text));
    })));
  } else {
    return /*#__PURE__*/React$1__default.createElement("div", {
      className: "table-of-contents"
    }, /*#__PURE__*/React$1__default.createElement("h2", null, title), headers.map(function (header) {
      return /*#__PURE__*/React$1__default.createElement("a", {
        key: header.id,
        href: "#" + header.id,
        className: "toc-item",
        style: {
          display: 'block',
          marginBottom: '10px'
        },
        onClick: function onClick(e) {
          return handleClick(e, header.id);
        }
      }, header.text);
    }));
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

var eq_1 = eq;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_1(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

var _assocIndexOf = assocIndexOf;

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return _assocIndexOf(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

var _listCacheSet = listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = _listCacheClear;
ListCache.prototype['delete'] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;

var _ListCache = ListCache;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new _ListCache;
  this.size = 0;
}

var _stackClear = stackClear;

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

var _stackDelete = stackDelete;

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

var _stackGet = stackGet;

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

var _stackHas = stackHas;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

var _root = root;

/** Built-in value references. */
var Symbol$1 = _root.Symbol;

var _Symbol = Symbol$1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag$1 && symToStringTag$1 in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject_1(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = _baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction;

/** Used to detect overreaching core-js shims. */
var coreJsData = _root['__core-js_shared__'];

var _coreJsData = coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

var _isMasked = isMasked;

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

var _toSource = toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype,
    objectProto$2 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject_1(value) || _isMasked(value)) {
    return false;
  }
  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(_toSource(value));
}

var _baseIsNative = baseIsNative;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = _getValue(object, key);
  return _baseIsNative(value) ? value : undefined;
}

var _getNative = getNative;

/* Built-in method references that are verified to be native. */
var Map = _getNative(_root, 'Map');

var _Map = Map;

/* Built-in method references that are verified to be native. */
var nativeCreate = _getNative(Object, 'create');

var _nativeCreate = nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}

var _hashClear = hashClear;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet;

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$3.call(data, key);
}

var _hashHas = hashHas;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

var _hashSet = hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = _hashClear;
Hash.prototype['delete'] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;

var _Hash = Hash;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new _Hash,
    'map': new (_Map || _ListCache),
    'string': new _Hash
  };
}

var _mapCacheClear = mapCacheClear;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

var _isKeyable = isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return _isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

var _getMapData = getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = _getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return _getMapData(this, key).get(key);
}

var _mapCacheGet = mapCacheGet;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return _getMapData(this, key).has(key);
}

var _mapCacheHas = mapCacheHas;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = _getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype['delete'] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;

var _MapCache = MapCache;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof _ListCache) {
    var pairs = data.__data__;
    if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new _MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

var _stackSet = stackSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new _ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = _stackClear;
Stack.prototype['delete'] = _stackDelete;
Stack.prototype.get = _stackGet;
Stack.prototype.has = _stackHas;
Stack.prototype.set = _stackSet;

var _Stack = Stack;

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

var _arrayEach = arrayEach;

var defineProperty = (function() {
  try {
    var func = _getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

var _defineProperty = defineProperty;

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && _defineProperty) {
    _defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

var _baseAssignValue = baseAssignValue;

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$4.call(object, key) && eq_1(objValue, value)) ||
      (value === undefined && !(key in object))) {
    _baseAssignValue(object, key, value);
  }
}

var _assignValue = assignValue;

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      _baseAssignValue(object, key, newValue);
    } else {
      _assignValue(object, key, newValue);
    }
  }
  return object;
}

var _copyObject = copyObject;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

var _baseTimes = baseTimes;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
}

var _baseIsArguments = baseIsArguments;

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$6.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
  return isObjectLike_1(value) && hasOwnProperty$5.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

var isArguments_1 = isArguments;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

var isArray_1 = isArray;

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;

var isBuffer_1 = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports =  exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? _root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse_1;

module.exports = isBuffer;
});

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

var _isIndex = isIndex;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}

var isLength_1 = isLength;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag$1 = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike_1(value) &&
    isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
}

var _baseIsTypedArray = baseIsTypedArray;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

var _baseUnary = baseUnary;

var _nodeUtil = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports =  exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && _freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;
});

/* Node.js helper references. */
var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

var isTypedArray_1 = isTypedArray;

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_1(value),
      isArg = !isArr && isArguments_1(value),
      isBuff = !isArr && !isArg && isBuffer_1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? _baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$6.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           _isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

var _arrayLikeKeys = arrayLikeKeys;

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$8;

  return value === proto;
}

var _isPrototype = isPrototype;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = _overArg(Object.keys, Object);

var _nativeKeys = nativeKeys;

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!_isPrototype(object)) {
    return _nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$7.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

var _baseKeys = baseKeys;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength_1(value.length) && !isFunction_1(value);
}

var isArrayLike_1 = isArrayLike;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
}

var keys_1 = keys;

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && _copyObject(source, keys_1(source), object);
}

var _baseAssign = baseAssign;

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

var _nativeKeysIn = nativeKeysIn;

/** Used for built-in method references. */
var objectProto$a = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject_1(object)) {
    return _nativeKeysIn(object);
  }
  var isProto = _isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$8.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

var _baseKeysIn = baseKeysIn;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
}

var keysIn_1 = keysIn;

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && _copyObject(source, keysIn_1(source), object);
}

var _baseAssignIn = baseAssignIn;

var _cloneBuffer = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports =  exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? _root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;
});

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

var _copyArray = copyArray;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

var _arrayFilter = arrayFilter;

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

var stubArray_1 = stubArray;

/** Used for built-in method references. */
var objectProto$b = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$b.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray_1 : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return _arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable$1.call(object, symbol);
  });
};

var _getSymbols = getSymbols;

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return _copyObject(source, _getSymbols(source), object);
}

var _copySymbols = copySymbols;

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

var _arrayPush = arrayPush;

/** Built-in value references. */
var getPrototype = _overArg(Object.getPrototypeOf, Object);

var _getPrototype = getPrototype;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols$1 ? stubArray_1 : function(object) {
  var result = [];
  while (object) {
    _arrayPush(result, _getSymbols(object));
    object = _getPrototype(object);
  }
  return result;
};

var _getSymbolsIn = getSymbolsIn;

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return _copyObject(source, _getSymbolsIn(source), object);
}

var _copySymbolsIn = copySymbolsIn;

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
}

var _baseGetAllKeys = baseGetAllKeys;

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return _baseGetAllKeys(object, keys_1, _getSymbols);
}

var _getAllKeys = getAllKeys;

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return _baseGetAllKeys(object, keysIn_1, _getSymbolsIn);
}

var _getAllKeysIn = getAllKeysIn;

/* Built-in method references that are verified to be native. */
var DataView = _getNative(_root, 'DataView');

var _DataView = DataView;

/* Built-in method references that are verified to be native. */
var Promise$1 = _getNative(_root, 'Promise');

var _Promise = Promise$1;

/* Built-in method references that are verified to be native. */
var Set = _getNative(_root, 'Set');

var _Set = Set;

/* Built-in method references that are verified to be native. */
var WeakMap = _getNative(_root, 'WeakMap');

var _WeakMap = WeakMap;

/** `Object#toString` result references. */
var mapTag$1 = '[object Map]',
    objectTag$1 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$1 = '[object Set]',
    weakMapTag$1 = '[object WeakMap]';

var dataViewTag$1 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = _toSource(_DataView),
    mapCtorString = _toSource(_Map),
    promiseCtorString = _toSource(_Promise),
    setCtorString = _toSource(_Set),
    weakMapCtorString = _toSource(_WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = _baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$1) ||
    (_Map && getTag(new _Map) != mapTag$1) ||
    (_Promise && getTag(_Promise.resolve()) != promiseTag) ||
    (_Set && getTag(new _Set) != setTag$1) ||
    (_WeakMap && getTag(new _WeakMap) != weakMapTag$1)) {
  getTag = function(value) {
    var result = _baseGetTag(value),
        Ctor = result == objectTag$1 ? value.constructor : undefined,
        ctorString = Ctor ? _toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag$1;
        case mapCtorString: return mapTag$1;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag$1;
        case weakMapCtorString: return weakMapTag$1;
      }
    }
    return result;
  };
}

var _getTag = getTag;

/** Used for built-in method references. */
var objectProto$c = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$c.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty$9.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

var _initCloneArray = initCloneArray;

/** Built-in value references. */
var Uint8Array = _root.Uint8Array;

var _Uint8Array = Uint8Array;

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
  return result;
}

var _cloneArrayBuffer = cloneArrayBuffer;

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? _cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

var _cloneDataView = cloneDataView;

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

var _cloneRegExp = cloneRegExp;

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

var _cloneSymbol = cloneSymbol;

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

var _cloneTypedArray = cloneTypedArray;

/** `Object#toString` result references. */
var boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    mapTag$2 = '[object Map]',
    numberTag$1 = '[object Number]',
    regexpTag$1 = '[object RegExp]',
    setTag$2 = '[object Set]',
    stringTag$1 = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$2 = '[object DataView]',
    float32Tag$1 = '[object Float32Array]',
    float64Tag$1 = '[object Float64Array]',
    int8Tag$1 = '[object Int8Array]',
    int16Tag$1 = '[object Int16Array]',
    int32Tag$1 = '[object Int32Array]',
    uint8Tag$1 = '[object Uint8Array]',
    uint8ClampedTag$1 = '[object Uint8ClampedArray]',
    uint16Tag$1 = '[object Uint16Array]',
    uint32Tag$1 = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return _cloneArrayBuffer(object);

    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);

    case dataViewTag$2:
      return _cloneDataView(object, isDeep);

    case float32Tag$1: case float64Tag$1:
    case int8Tag$1: case int16Tag$1: case int32Tag$1:
    case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
      return _cloneTypedArray(object, isDeep);

    case mapTag$2:
      return new Ctor;

    case numberTag$1:
    case stringTag$1:
      return new Ctor(object);

    case regexpTag$1:
      return _cloneRegExp(object);

    case setTag$2:
      return new Ctor;

    case symbolTag:
      return _cloneSymbol(object);
  }
}

var _initCloneByTag = initCloneByTag;

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject_1(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

var _baseCreate = baseCreate;

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !_isPrototype(object))
    ? _baseCreate(_getPrototype(object))
    : {};
}

var _initCloneObject = initCloneObject;

/** `Object#toString` result references. */
var mapTag$3 = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike_1(value) && _getTag(value) == mapTag$3;
}

var _baseIsMap = baseIsMap;

/* Node.js helper references. */
var nodeIsMap = _nodeUtil && _nodeUtil.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? _baseUnary(nodeIsMap) : _baseIsMap;

var isMap_1 = isMap;

/** `Object#toString` result references. */
var setTag$3 = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike_1(value) && _getTag(value) == setTag$3;
}

var _baseIsSet = baseIsSet;

/* Node.js helper references. */
var nodeIsSet = _nodeUtil && _nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? _baseUnary(nodeIsSet) : _baseIsSet;

var isSet_1 = isSet;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    boolTag$2 = '[object Boolean]',
    dateTag$2 = '[object Date]',
    errorTag$1 = '[object Error]',
    funcTag$2 = '[object Function]',
    genTag$1 = '[object GeneratorFunction]',
    mapTag$4 = '[object Map]',
    numberTag$2 = '[object Number]',
    objectTag$2 = '[object Object]',
    regexpTag$2 = '[object RegExp]',
    setTag$4 = '[object Set]',
    stringTag$2 = '[object String]',
    symbolTag$1 = '[object Symbol]',
    weakMapTag$2 = '[object WeakMap]';

var arrayBufferTag$2 = '[object ArrayBuffer]',
    dataViewTag$3 = '[object DataView]',
    float32Tag$2 = '[object Float32Array]',
    float64Tag$2 = '[object Float64Array]',
    int8Tag$2 = '[object Int8Array]',
    int16Tag$2 = '[object Int16Array]',
    int32Tag$2 = '[object Int32Array]',
    uint8Tag$2 = '[object Uint8Array]',
    uint8ClampedTag$2 = '[object Uint8ClampedArray]',
    uint16Tag$2 = '[object Uint16Array]',
    uint32Tag$2 = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag$2] = cloneableTags[arrayTag$1] =
cloneableTags[arrayBufferTag$2] = cloneableTags[dataViewTag$3] =
cloneableTags[boolTag$2] = cloneableTags[dateTag$2] =
cloneableTags[float32Tag$2] = cloneableTags[float64Tag$2] =
cloneableTags[int8Tag$2] = cloneableTags[int16Tag$2] =
cloneableTags[int32Tag$2] = cloneableTags[mapTag$4] =
cloneableTags[numberTag$2] = cloneableTags[objectTag$2] =
cloneableTags[regexpTag$2] = cloneableTags[setTag$4] =
cloneableTags[stringTag$2] = cloneableTags[symbolTag$1] =
cloneableTags[uint8Tag$2] = cloneableTags[uint8ClampedTag$2] =
cloneableTags[uint16Tag$2] = cloneableTags[uint32Tag$2] = true;
cloneableTags[errorTag$1] = cloneableTags[funcTag$2] =
cloneableTags[weakMapTag$2] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject_1(value)) {
    return value;
  }
  var isArr = isArray_1(value);
  if (isArr) {
    result = _initCloneArray(value);
    if (!isDeep) {
      return _copyArray(value, result);
    }
  } else {
    var tag = _getTag(value),
        isFunc = tag == funcTag$2 || tag == genTag$1;

    if (isBuffer_1(value)) {
      return _cloneBuffer(value, isDeep);
    }
    if (tag == objectTag$2 || tag == argsTag$2 || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : _initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? _copySymbolsIn(value, _baseAssignIn(result, value))
          : _copySymbols(value, _baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = _initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new _Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet_1(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap_1(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
  }

  var keysFunc = isFull
    ? (isFlat ? _getAllKeysIn : _getAllKeys)
    : (isFlat ? keysIn_1 : keys_1);

  var props = isArr ? undefined : keysFunc(value);
  _arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    _assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

var _baseClone = baseClone;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG$1 = 1,
    CLONE_SYMBOLS_FLAG$1 = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return _baseClone(value, CLONE_DEEP_FLAG$1 | CLONE_SYMBOLS_FLAG$1);
}

var cloneDeep_1 = cloneDeep;

function blocksSplitter(data) {
  var blocks = data.blocks;
  var clonedBlocks = [].concat(blocks);
  var titleBlocks = [];
  if (clonedBlocks[0].type === 'header' && clonedBlocks[0].data.level === 1) {
    titleBlocks.push(clonedBlocks.shift());
  }
  var title = cloneDeep_1(data);
  title.blocks = titleBlocks;
  var body = cloneDeep_1(data);
  body.blocks = clonedBlocks;
  return {
    titleBlocks: title,
    bodyBlocks: body
  };
}

var json2cleanjson;
try {
  json2cleanjson = require("md-json-converter").json2cleanjson;
} catch (e) {
  json2cleanjson = require("../../md-json-converter/src/json2cleanjson")["default"];
}
function Renderer(_ref) {
  var data = _ref.data,
    _ref$scrollOffset = _ref.scrollOffset,
    scrollOffset = _ref$scrollOffset === void 0 ? 50 : _ref$scrollOffset,
    _ref$tocTitle = _ref.tocTitle,
    tocTitle = _ref$tocTitle === void 0 ? 'Table of Contents' : _ref$tocTitle;
  if (!data) {
    return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "text-center"
    }, "Article is Empty"));
  }
  var titleBlocks;
  var bodyBlocks;
  var res;
  var tocData;
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
  var edjsParser = edjsHTML();
  var title_html = edjsParser.parse(titleBlocks);
  var body_html = edjsParser.parse(bodyBlocks);
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "text-container"
  }, parse(title_html.join(""))), /*#__PURE__*/React.createElement("div", {
    className: "pt-3 pb-3"
  }, /*#__PURE__*/React.createElement(TableOfContents, {
    data: tocData,
    title: tocTitle,
    scrollOffset: scrollOffset
  })), /*#__PURE__*/React.createElement("div", {
    className: "text-container"
  }, parse(body_html.join(""))));
}

function Editor(_ref) {
  var onDataChange = _ref.onDataChange,
    data = _ref.data,
    setData = _ref.setData,
    uploadEndPoint = _ref.uploadEndPoint,
    lastUploadedEndPoint = _ref.lastUploadedEndPoint,
    isEditMode = _ref.isEditMode;
  var handleDataChange = function handleDataChange(updatedData) {
    setData(updatedData);
    if (onDataChange) {
      onDataChange(updatedData);
    }
  };
  var outerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '0.25rem',
    margin: '1.5rem'
  };
  var innerStyle = {
    marginTop: '0rem',
    maxWidth: '1000px',
    width: '100%'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: outerStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: innerStyle
  }, isEditMode ? /*#__PURE__*/React.createElement(EditorEditor, {
    data: data,
    setData: handleDataChange,
    uploadEndPoint: uploadEndPoint,
    lastUploadedEndPoint: lastUploadedEndPoint
  }) : /*#__PURE__*/React.createElement(Renderer, {
    data: data
  })));
}

exports.Editor = Editor;
exports.Renderer = Renderer;
//# sourceMappingURL=index.js.map
