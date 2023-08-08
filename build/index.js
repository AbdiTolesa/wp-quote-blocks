/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _variations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./variations */ "./src/variations.js");










/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
function Edit(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const isVariationSelected = attributes.class !== '';
  const Component = isVariationSelected ? EditContainer // display the inner blocks
  : Placeholder; // or the variation picker

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Component, {
    ...props
  });
}
function Placeholder({
  clientId,
  setAttributes
}) {
  const {
    replaceInnerBlocks
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useDispatch)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.store);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)();
  const variations = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.getBlockVariations)('create-block/wp-quote-blocks');
  const defaultVariation = variations[0];
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.__experimentalBlockVariationPicker, {
    label: "Choose style",
    variations: variations,
    onSelect: (variation = defaultVariation) => {
      if (variation.attributes) {
        setAttributes(variation.attributes);
      }
      if (false) {}
    }
  }));
}
function EditContainer(props) {
  const {
    attributes,
    setAttributes
  } = props;
  let right_icon = null;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)();
  const innerBlocksProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useInnerBlocksProps)(blockProps, {
    allowedBlocks: ["core/image"],
    orientation: 'horizontal',
    renderAppender: false
  });
  const {
    iconSize,
    iconColor
  } = attributes;
  const onChangeIconSize = val => {
    setAttributes({
      iconSize: val + 'px'
    });
  };
  const iconStyles = {
    width: iconSize,
    height: iconSize,
    fill: iconColor
  };
  const onChangeIconColor = val => {
    setAttributes({
      iconColor: val
    });
  };
  const colorSettingsDropDown = [{
    value: iconColor,
    onChange: onChangeIconColor,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Icon color', 'wp-quote-blocks')
  }];
  const [checked, setChecked] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('25');
  const onChangeIcon = val => {
    setChecked(val);
    setAttributes({
      icon: val
    });
  };
  const icons = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M10.3 24.8V26H20v16.9H0V26.2C0 13.4 6.6 7.1 19.9 7.1v7.1c-3.4.5-5.9 1.6-7.4 3.3-1.5 1.7-2.2 4.1-2.2 7.3zm30 0V26H50v16.9H30.1V26.2c0-12.7 6.6-19.1 19.9-19.1v7.1c-6.4.7-9.7 4.3-9.7 10.6z"></path></svg>', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M12.5 9.2H19c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H20c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H3c-1.1 0-1.8-.2-2.3-.7-.5-.4-.7-1.2-.7-2.2V21.9c0-4.3 1.1-7.4 3.4-9.6 2.3-2 5.3-3.1 9.1-3.1zm26.9 0h6.5c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H47c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H30c-1.1 0-1.8-.2-2.3-.7-.5-.5-.7-1.2-.7-2.3V21.9c0-4.3 1.1-7.4 3.4-9.6 2.2-2 5.2-3.1 9-3.1z"></path></svg>', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" size="24"><path d="M20.8 44.5H0V23.7L9.3 5.5h7.3L12 23.7h8.8v20.8zm29.2 0H29.2V23.7l9.3-18.1h7.3l-4.6 18.1H50v20.8z"></path></svg>', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" size="24"><path d="M19.8 9.3C10.5 11.8 4.6 17 2.1 24.8c2.3-3.6 5.6-5.4 9.9-5.4 3.3 0 6 1.1 8.3 3.3 2.2 2.2 3.4 5 3.4 8.3 0 3.2-1.1 5.8-3.3 8-2.2 2.2-5.1 3.2-8.7 3.2-3.7 0-6.5-1.2-8.6-3.5C1 36.3 0 33.1 0 29 0 18.3 6.5 11.2 19.6 7.9l.2 1.4zm26.4 0C36.9 11.9 31 17 28.5 24.8c2.2-3.6 5.5-5.4 9.8-5.4 3.2 0 6 1.1 8.3 3.2 2.3 2.2 3.4 4.9 3.4 8.3 0 3.1-1.1 5.8-3.3 7.9-2.2 2.2-5.1 3.3-8.6 3.3-3.7 0-6.6-1.1-8.6-3.4-2.1-2.3-3.1-5.5-3.1-9.7 0-10.7 6.6-17.8 19.7-21.1l.1 1.4z"></path></svg>', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" size="24"><path d="M12.5 9.2H19c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H20c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H3c-1.1 0-1.8-.2-2.3-.7-.5-.4-.7-1.2-.7-2.2V21.9c0-4.3 1.1-7.4 3.4-9.6 2.3-2 5.3-3.1 9.1-3.1zm26.9 0h6.5c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H47c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H30c-1.1 0-1.8-.2-2.3-.7-.5-.5-.7-1.2-.7-2.3V21.9c0-4.3 1.1-7.4 3.4-9.6 2.2-2 5.2-3.1 9-3.1z"></path></svg>'];
  const svgElementFromString = str => {
    const div = document.createElement('DIV');
    div.innerHTML = str;
    const svg = div.querySelector('svg');
    if (!svg) {
      throw Error('<svg> tag not found');
    }
    return svg;
  };
  const onChangeAlignment = newAlignment => {
    setAttributes({
      alignment: newAlignment === undefined ? 'none' : newAlignment
    });
  };
  if (attributes.class.includes('closed')) {
    right_icon = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "quote-icon quote-right-icon"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      xlmns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 50 50",
      ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)({
        style: {
          ...iconStyles,
          transform: 'rotate(180deg)'
        }
      }),
      dangerouslySetInnerHTML: {
        __html: svgElementFromString(attributes.icon).innerHTML
      }
    }));
  }
  const onChangeQuoteFontSize = val => {
    setAttributes({
      quoteFontSize: val
    });
  };
  const onChangeCitationFontSize = val => {
    setAttributes({
      citationFontSize: val
    });
  };
  const resetFontSizes = () => {
    setAttributes({
      quoteFontSize: '1rem',
      citationFontSize: '0.75rem'
    });
  };
  const fetchGoogleFonts = async () => {
    const KEY = 'AIzaSyBE3Q6dX73OWOiG4IatUgNBHur6BYxIXE0';
    const url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${KEY}`;
    const response = await fetch(url);
    const fonts = await response.json();
    return fonts;
  };
  const [fontOptions, setFontOptions] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const getFontOptions = () => {
    if (fontOptions) {
      return;
    }
    let options = [];
    fetchGoogleFonts().then(fonts => {
      fonts.items.forEach(font => {
        options.push({
          label: font.family,
          value: font.family
        });
      });
      setFontOptions(options);
      // return options;
    });
  };

  const onChangeFontFamily = newFont => {
    setAttributes({
      fontFamily: newFont
    });
    loadFontCss(newFont);
  };
  const loadFontCss = async font => {
    const linkId = font.replace(/ /g, '+');
    if (!font || document.getElementById(`google-font-${linkId}`)) {
      return;
    }
    const url = `https://fonts.googleapis.com/css?family=${font}`;
    document.body.insertAdjacentHTML('beforebegin', `<link rel='stylesheet' id="google-font-${linkId}" href='${url}' type='text/css' media='all' />`);
  };
  loadFontCss(attributes.fontFamily);
  getFontOptions();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Icon Settings', 'wp-quote-blocks')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Icon size', 'wp-quote-blocks'),
    value: parseInt(iconSize),
    onChange: onChangeIconSize,
    min: 1,
    max: 200
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalRadioGroup, {
    className: "quote-icons",
    label: "Width",
    onChange: onChangeIcon,
    checked: attributes.icon || checked
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalRadio, {
    value: icons[0]
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 50 50"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M10.3 24.8V26H20v16.9H0V26.2C0 13.4 6.6 7.1 19.9 7.1v7.1c-3.4.5-5.9 1.6-7.4 3.3-1.5 1.7-2.2 4.1-2.2 7.3zm30 0V26H50v16.9H30.1V26.2c0-12.7 6.6-19.1 19.9-19.1v7.1c-6.4.7-9.7 4.3-9.7 10.6z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalRadio, {
    value: icons[1]
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 50 50"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M12.5 9.2H19c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H20c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H3c-1.1 0-1.8-.2-2.3-.7-.5-.4-.7-1.2-.7-2.2V21.9c0-4.3 1.1-7.4 3.4-9.6 2.3-2 5.3-3.1 9.1-3.1zm26.9 0h6.5c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H47c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H30c-1.1 0-1.8-.2-2.3-.7-.5-.5-.7-1.2-.7-2.3V21.9c0-4.3 1.1-7.4 3.4-9.6 2.2-2 5.2-3.1 9-3.1z"
  })), "'"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalRadio, {
    value: icons[2]
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 50 50",
    size: "24"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M20.8 44.5H0V23.7L9.3 5.5h7.3L12 23.7h8.8v20.8zm29.2 0H29.2V23.7l9.3-18.1h7.3l-4.6 18.1H50v20.8z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalRadio, {
    value: icons[3]
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 50 50",
    size: "24"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M19.8 9.3C10.5 11.8 4.6 17 2.1 24.8c2.3-3.6 5.6-5.4 9.9-5.4 3.3 0 6 1.1 8.3 3.3 2.2 2.2 3.4 5 3.4 8.3 0 3.2-1.1 5.8-3.3 8-2.2 2.2-5.1 3.2-8.7 3.2-3.7 0-6.5-1.2-8.6-3.5C1 36.3 0 33.1 0 29 0 18.3 6.5 11.2 19.6 7.9l.2 1.4zm26.4 0C36.9 11.9 31 17 28.5 24.8c2.2-3.6 5.5-5.4 9.8-5.4 3.2 0 6 1.1 8.3 3.2 2.3 2.2 3.4 4.9 3.4 8.3 0 3.1-1.1 5.8-3.3 7.9-2.2 2.2-5.1 3.3-8.6 3.3-3.7 0-6.6-1.1-8.6-3.4-2.1-2.3-3.1-5.5-3.1-9.7 0-10.7 6.6-17.8 19.7-21.1l.1 1.4z"
  })), "'"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalRadio, {
    value: icons[4]
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 50 50",
    size: "24"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M12.5 9.2H19c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H20c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H3c-1.1 0-1.8-.2-2.3-.7-.5-.4-.7-1.2-.7-2.2V21.9c0-4.3 1.1-7.4 3.4-9.6 2.3-2 5.3-3.1 9.1-3.1zm26.9 0h6.5c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H47c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H30c-1.1 0-1.8-.2-2.3-.7-.5-.5-.7-1.2-.7-2.3V21.9c0-4.3 1.1-7.4 3.4-9.6 2.2-2 5.2-3.1 9-3.1z"
  })), "'"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.PanelColorSettings, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Color settings', 'wp-quote-blocks'),
    initialOpen: false,
    colorSettings: colorSettingsDropDown
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToolsPanel, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Typography')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToolsPanelItem, {
    hasValue: () => !!attributes.quoteFontSize || !!attributes.citationFontSize,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Font sizes'),
    onDeselect: () => resetFontSizes()
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Font sizes', 'wp-quote-blocks')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControl, {
    label: "quote font size",
    value: attributes.quoteFontSize,
    onChange: onChangeQuoteFontSize,
    isBlock: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControlOption, {
    value: "0.75rem",
    label: "S"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControlOption, {
    value: "1rem",
    label: "M"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControlOption, {
    value: "1.5rem",
    label: "L"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControlOption, {
    value: "2rem",
    label: "XL"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControlOption, {
    value: "2.5rem",
    label: "XXL"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControl, {
    label: "citation font size",
    value: attributes.citationFontSize,
    onChange: onChangeCitationFontSize,
    isBlock: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControlOption, {
    value: "0.75rem",
    label: "S"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControlOption, {
    value: "1rem",
    label: "M"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControlOption, {
    value: "1.5rem",
    label: "L"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControlOption, {
    value: "2rem",
    label: "XL"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToggleGroupControlOption, {
    value: "2.5rem",
    label: "XXL"
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.__experimentalToolsPanelItem, {
    hasValue: () => true,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Font family'),
    onDeselect: () => resetFontSizes()
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Font family', 'wp-quote-blocks')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
    label: "Select font",
    value: attributes.fontFamily,
    options: fontOptions,
    onChange: newFont => onChangeFontFamily(newFont),
    __nextHasNoMarginBottom: true
  }))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps,
    className: `wp-quote-blocks quote-variation-${attributes.class}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.BlockControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.AlignmentToolbar, {
    value: attributes.alignment,
    onChange: onChangeAlignment
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "quote-icon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xlmns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 50 50",
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)({
      style: iconStyles
    }),
    dangerouslySetInnerHTML: {
      __html: svgElementFromString(attributes.icon).innerHTML
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "quote-wrapper"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, {
    tagName: "p",
    className: "quote",
    style: {
      textAlign: attributes.alignment,
      fontSize: attributes.quoteFontSize,
      fontFamily: attributes.fontFamily
    },
    value: attributes.quote,
    onChange: quote => setAttributes({
      quote
    }),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add quote...')
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, {
    tagName: "p",
    className: "citation",
    style: {
      textAlign: attributes.alignment,
      fontSize: attributes.citationFontSize,
      fontFamily: attributes.fontFamily
    },
    value: attributes.citation,
    onChange: citation => setAttributes({
      citation
    }),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add citation...'),
    textAlign: "center"
  })), right_icon));
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./src/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/* harmony import */ var _variations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./variations */ "./src/variations.js");




/**
 * Internal dependencies
 */





/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_5__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_4__["default"],
  variations: _variations__WEBPACK_IMPORTED_MODULE_6__["default"]
});

// registerBlockVariation(
// 	'create-block/wp-quote-blocks',
// 	{
// 		name: 'newsletter',
// 		title: 'Newsletter',
// 		attributes: {
// 			"templateLock": "all",
// 			"allowedBlocks": [ "core/image" ],
// 		},
// 		templateLock: "all",
// 		allowedBlocks: [ "core/image" ],
// 		innerBlocks: [
// 			[ 'core/image', { content: 'Subscribe to our Newsletter', allowedBlocks: 'core/image' } ],
// 			[ 'core/paragraph', { content: 'Get a 10% discount on your first order.' } ],
// 			[ 'core/button', { text: 'Subscribe' } ],
// 		]
// 	}
// );

/***/ }),

/***/ "./src/save.js":
/*!*********************!*\
  !*** ./src/save.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
function save(props) {
  const {
    attributes
  } = props;
  let rightIcon;
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save();
  const {
    iconSize,
    iconColor
  } = attributes;
  const iconStyles = {
    width: iconSize,
    height: iconSize,
    fill: iconColor
  };
  const svgElementFromString = str => {
    const div = document.createElement('DIV');
    div.innerHTML = str;
    const svg = div.querySelector('svg');
    if (!svg) {
      throw Error('<svg> tag not found');
    }
    return svg;
  };
  if (attributes.class.includes('closed')) {
    rightIcon = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "quote-icon quote-right-icon"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      xlmns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 50 50",
      ..._wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
        style: {
          ...iconStyles,
          transform: 'rotate(180deg)'
        }
      }),
      dangerouslySetInnerHTML: {
        __html: svgElementFromString(attributes.icon).innerHTML
      }
    }));
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps,
    ..._wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: `quote-variation-${attributes.class}`
    })
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "quote-icon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xlmns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 50 50",
    ..._wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      style: iconStyles
    }),
    dangerouslySetInnerHTML: {
      __html: svgElementFromString(attributes.icon).innerHTML
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "quote-wrapper"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText.Content, {
    ...blockProps,
    ..._wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      style: {
        textAlign: attributes.alignment,
        fontSize: attributes.quoteFontSize,
        fontFamily: attributes.fontFamily
      }
    }),
    tagName: "p",
    className: "quote",
    value: attributes.quote
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText.Content, {
    ...blockProps,
    ..._wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      style: {
        textAlign: attributes.alignment,
        fontSize: attributes.citationFontSize,
        fontFamily: attributes.fontFamily
      }
    }),
    tagName: "p",
    className: "citation",
    value: attributes.citation
  })), rightIcon);
}

/***/ }),

/***/ "./src/variations.js":
/*!***************************!*\
  !*** ./src/variations.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const variations = [{
  name: 'default',
  title: 'Default',
  attributes: {
    class: 'default'
  }
}, {
  name: 'simple',
  title: 'Simple',
  attributes: {
    class: 'simple'
  }
}, {
  name: 'centred',
  title: 'Centered',
  attributes: {
    class: 'centred'
  }
}, {
  name: 'closed',
  title: 'Closed',
  attributes: {
    class: 'closed'
  }
}, {
  name: 'block-quotation',
  title: 'Block quotation',
  attributes: {
    class: 'block-quotation'
  }
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (variations);

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"create-block/wp-quote-blocks","version":"0.1.0","title":"WP Quote Blocks","category":"widgets","icon":"format-quote","description":"Collection of a load of Quote styles.","attributes":{"align":{"type":"string","default":"left"},"class":{"type":"string","default":""},"quote":{"type":"string","default":""},"citation":{"type":"string","default":""},"iconSize":{"type":"string","default":"30px"},"iconColor":{"type":"string","default":"#000000"},"icon":{"type":"string","default":"<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 50 50\\"><path d=\\"M10.3 24.8V26H20v16.9H0V26.2C0 13.4 6.6 7.1 19.9 7.1v7.1c-3.4.5-5.9 1.6-7.4 3.3-1.5 1.7-2.2 4.1-2.2 7.3zm30 0V26H50v16.9H30.1V26.2c0-12.7 6.6-19.1 19.9-19.1v7.1c-6.4.7-9.7 4.3-9.7 10.6z\\"></path></svg>"},"alignment":{"type":"string","default":""},"quoteFontSize":{"type":"string","default":"1rem"},"citationFontSize":{"type":"string","default":"0.75rem"},"fontFamily":{"type":"string","default":""}},"supports":{"html":false,"align":["wide","full"],"typography":{"lineHeight":true}},"textdomain":"wp-quote-blocks","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkwp_quote_blocks"] = self["webpackChunkwp_quote_blocks"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map