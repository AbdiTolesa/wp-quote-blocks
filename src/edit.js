import { __ } from '@wordpress/i18n';
import {
    createBlocksFromInnerBlocksTemplate,
	getBlockVariations,
	store as blocksStore,
} from '@wordpress/blocks';

import {
    useBlockProps,
    useInnerBlocksProps,
    store as blockEditorStore,
    __experimentalBlockVariationPicker as BlockVariationPicker,
    AlignmentControl,
	AlignmentToolbar,
	RichText,
	BlockControls,
	InspectorControls,
    PanelColorSettings,
} from '@wordpress/block-editor';

import { useDispatch, useSelect } from '@wordpress/data';

import './editor.scss';

import { PanelBody, SelectControl, RangeControl, Button, ButtonGroup, __experimentalRadio as Radio, __experimentalRadioGroup as RadioGroup,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalBoxControl as BoxControl,
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem,
    __experimentalUnitControl as UnitControl,
} from '@wordpress/components';

import { useState } from '@wordpress/element';

import variations from './variations';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {

	const { attributes, setAttributes } = props;

	const isVariationSelected = attributes.class !== '';
    const Component = isVariationSelected
        ? EditContainer // display the inner blocks
        : Placeholder;  // or the variation picker

    return <Component { ...props } />;
}

function Placeholder( { clientId, setAttributes } ) {
    const { replaceInnerBlocks } = useDispatch( blockEditorStore );
    const blockProps = useBlockProps();

	const variations = getBlockVariations( 'create-block/wp-quote-blocks' );
    const defaultVariation = variations[0];

    return (
        <div { ...blockProps }>
            <BlockVariationPicker
                label="Choose style"
                variations={ variations }
                onSelect={ ( variation = defaultVariation ) => {
                    if ( variation.attributes ) {
                        setAttributes( variation.attributes );
                    }
                    if ( false && variation.innerBlocks ) {
						const blocks = [
							<RichText
							placeholder={
								// translators: placeholder text used for the quote
								__( 'Add quote' )
							} />
						];
                        replaceInnerBlocks(
                            clientId,
							createBlocksFromInnerBlocksTemplate( blocks ),
                            // createBlocksFromInnerBlocksTemplate(
                            //     variation.innerBlocks
                            // ),
                            true
                        );
                    }
                } }
            />
        </div>
    );
}

function EditContainer( props ) {
	const { attributes, setAttributes } = props;
	let right_icon = null;

    const blockProps = useBlockProps();

	const {
		iconSize,
		iconColor,
		backgroundColor,
	} = attributes;

	const onChangeIconSize = ( size ) => {
		setAttributes( { iconSize: size + 'px' } );
	};

	const iconStyles = {
		width: iconSize,
		height: iconSize,
		fill: iconColor,
	};

	const onChangeIconColor = ( color ) => {
		setAttributes( { iconColor: color } );
	};

	const onChangeBackgroundColor = ( color ) => {
		setAttributes( { backgroundColor: color } );
	};

	const colorSettingsDropDown = [
		{
			value: iconColor,
			onChange: onChangeIconColor,
			label: __( 'Icon color', 'wp-quote-blocks' ),
		},
		{
			value: backgroundColor,
			onChange: onChangeBackgroundColor,
			label: __( 'Backgroundcolor', 'wp-quote-blocks' ),
		}
	];
    const [ checked, setChecked ] = useState( '25' );

	const onChangeIcon = ( val ) => {
		console.log(val);

		setChecked( val );
		setAttributes( { icon: val } );
	};

	const icons = [
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M10.3 24.8V26H20v16.9H0V26.2C0 13.4 6.6 7.1 19.9 7.1v7.1c-3.4.5-5.9 1.6-7.4 3.3-1.5 1.7-2.2 4.1-2.2 7.3zm30 0V26H50v16.9H30.1V26.2c0-12.7 6.6-19.1 19.9-19.1v7.1c-6.4.7-9.7 4.3-9.7 10.6z"></path></svg>',
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M12.5 9.2H19c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H20c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H3c-1.1 0-1.8-.2-2.3-.7-.5-.4-.7-1.2-.7-2.2V21.9c0-4.3 1.1-7.4 3.4-9.6 2.3-2 5.3-3.1 9.1-3.1zm26.9 0h6.5c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H47c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H30c-1.1 0-1.8-.2-2.3-.7-.5-.5-.7-1.2-.7-2.3V21.9c0-4.3 1.1-7.4 3.4-9.6 2.2-2 5.2-3.1 9-3.1z"></path></svg>',
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M20.8 44.5H0V23.7L9.3 5.5h7.3L12 23.7h8.8v20.8zm29.2 0H29.2V23.7l9.3-18.1h7.3l-4.6 18.1H50v20.8z"></path></svg>',
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M19.8 9.3C10.5 11.8 4.6 17 2.1 24.8c2.3-3.6 5.6-5.4 9.9-5.4 3.3 0 6 1.1 8.3 3.3 2.2 2.2 3.4 5 3.4 8.3 0 3.2-1.1 5.8-3.3 8-2.2 2.2-5.1 3.2-8.7 3.2-3.7 0-6.5-1.2-8.6-3.5C1 36.3 0 33.1 0 29 0 18.3 6.5 11.2 19.6 7.9l.2 1.4zm26.4 0C36.9 11.9 31 17 28.5 24.8c2.2-3.6 5.5-5.4 9.8-5.4 3.2 0 6 1.1 8.3 3.2 2.3 2.2 3.4 4.9 3.4 8.3 0 3.1-1.1 5.8-3.3 7.9-2.2 2.2-5.1 3.3-8.6 3.3-3.7 0-6.6-1.1-8.6-3.4-2.1-2.3-3.1-5.5-3.1-9.7 0-10.7 6.6-17.8 19.7-21.1l.1 1.4z"></path></svg>',
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M12.5 9.2H19c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H20c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H3c-1.1 0-1.8-.2-2.3-.7-.5-.4-.7-1.2-.7-2.2V21.9c0-4.3 1.1-7.4 3.4-9.6 2.3-2 5.3-3.1 9.1-3.1zm26.9 0h6.5c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H47c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H30c-1.1 0-1.8-.2-2.3-.7-.5-.5-.7-1.2-.7-2.3V21.9c0-4.3 1.1-7.4 3.4-9.6 2.2-2 5.2-3.1 9-3.1z"></path></svg>',
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M9.4 14.6c-2.4 2.9-3.6 5.9-3.6 8.9 0 1.3.2 2.4.5 3.3 1.8-1.4 3.8-2.1 6-2.1 2.9 0 5.3.9 7.3 2.7 2 1.8 3 4.2 3 7.3 0 1.9-.5 3.6-1.4 5.1-.9 1.5-2.2 2.7-3.8 3.6s-3.3 1.3-5.1 1.3c-4.1 0-7.3-1.6-9.5-4.9C.9 36.9 0 33.5 0 29.4c0-5.2 1.4-9.9 4.1-14 2.8-4.1 6.9-7.5 12.5-10l1.5 2.8c-3.3 1.3-6.2 3.5-8.7 6.4zm27.5 0c-2.4 2.9-3.6 5.9-3.6 8.9 0 1.3.2 2.4.5 3.3 1.8-1.4 3.8-2.1 6-2.1 2.9 0 5.4.9 7.4 2.7 2 1.8 3 4.2 3 7.3 0 2.8-1 5.2-3 7.1-2 1.9-4.4 2.9-7.3 2.9-4.1 0-7.3-1.6-9.5-4.9-1.8-2.7-2.8-6.2-2.8-10.3 0-5.2 1.4-9.9 4.1-14 2.8-4.1 6.9-7.5 12.5-10l1.5 2.8c-3.5 1.2-6.4 3.4-8.8 6.3z"></path></svg>',
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M22.6 12.8c-1.9.5-3.7 1.2-5.3 2.1-1.6.9-3.1 1.9-4.3 3-1.2 1.1-2.2 2.4-2.9 3.7-.7 1.3-1.1 2.7-1.1 4 0 1.2.1 1.8.3 1.8.8 0 1.5-.3 2.4-.9.8-.6 1.9-.9 3.3-.9 2.1 0 3.9.8 5.4 2.4 1.5 1.6 2.3 3.7 2.3 6.2s-1 4.6-2.9 6.4c-1.9 1.8-4.3 2.6-7.3 2.6-1.8 0-3.4-.4-4.9-1.1-1.5-.8-2.8-1.8-3.9-3.1s-2-2.8-2.6-4.6C.3 32.5 0 30.6 0 28.6c0-3 .6-5.8 1.8-8.3 1.2-2.5 2.8-4.8 4.9-6.7 2-1.9 4.4-3.5 7.2-4.6 2.8-1.2 5.6-1.8 8.6-2v5.8zm27.4 0c-1.9.5-3.7 1.2-5.4 2.1-1.7.9-3.1 1.9-4.3 3-1.2 1.1-2.2 2.4-2.9 3.7-.7 1.3-1.1 2.7-1.1 4 0 1.2.1 1.8.4 1.8.8 0 1.5-.3 2.3-.9.8-.6 1.9-.9 3.3-.9 2 0 3.8.8 5.3 2.4 1.5 1.6 2.3 3.7 2.3 6.2s-1 4.6-2.9 6.4c-2 1.8-4.4 2.6-7.3 2.6-1.7 0-3.3-.4-4.8-1.1-1.5-.8-2.8-1.8-3.9-3.1s-2-2.8-2.7-4.6c-.7-1.8-1-3.7-1-5.7 0-3 .6-5.8 1.8-8.3 1.2-2.5 2.8-4.8 4.9-6.7 2-1.9 4.4-3.5 7.2-4.6 2.8-1.2 5.7-1.8 8.8-2v5.7z"></path></svg>',
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M14.7 45.9H0V31.3C0 17.6 8.6 6.6 21.6 4.1v4.7c-10 2.6-16.7 10.9-16.7 22.6h9.8v14.5zm28.1 0H28.4V31.3C28.4 17.6 37 6.6 50 4.1v4.7c-9.8 2.6-16.7 10.9-16.7 22.6h9.5v14.5z"></path></svg>',
	];

	const svgElementFromString = ( str ) => {
		const div = document.createElement('DIV');
		div.innerHTML = str;
		const svg = div.querySelector('svg');

		if (!svg) {
		  throw Error('<svg> tag not found');
		}
	
		return svg;
	}

	const onChangeAlignment = ( newAlignment ) => {
		setAttributes( {
			alignment: newAlignment === undefined ? 'none' : newAlignment,
		} );
	};

	if ( attributes.class.includes( 'closed' ) ) {
		right_icon = (
			<div className="quote-icon quote-right-icon">
				<svg xlmns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" { ...useBlockProps( { style: { ...iconStyles, transform: 'rotate(180deg)' }  } ) } dangerouslySetInnerHTML={{__html: svgElementFromString( attributes.icon ).innerHTML}} />
			</div>
		);
	}

	const onChangeQuoteFontSize = ( val ) => {
		setAttributes( { quoteFontSize: val } );
	};

	const onChangeCitationFontSize = ( val ) => {
		setAttributes( { citationFontSize: val } );
	};

	const resetFontSizes = () => {
		setAttributes( { quoteFontSize: '1rem', citationFontSize: '0.75rem' } );
	};

	const fetchGoogleFonts = async () => {
		const KEY = 'AIzaSyBE3Q6dX73OWOiG4IatUgNBHur6BYxIXE0';
		const url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${KEY}`;
		const response = await fetch( url );
		const fonts = await response.json();

		return fonts;
	};

	const [ fontOptions, setFontOptions ] = useState('');

	const getFontOptions = () => {
		if ( fontOptions ) {
			return;
		}
		let options = [];
		fetchGoogleFonts().then( ( fonts ) => {
			fonts.items.forEach( font => {
				options.push( { label: font.family, value: font.family } );
			});
			setFontOptions( options );
		});

	};

	const onChangeFontFamily = ( newFont ) => {
		setAttributes( { fontFamily: newFont } );
		loadFontCss( newFont );
	};

	const loadFontCss = async ( font ) => {
		const linkId = font.replace(/ /g, '+');
		if ( ! font || document.getElementById( `google-font-${linkId}` ) ) {
			return;
		}
		const url = `https://fonts.googleapis.com/css?family=${font}`;
		document.body.insertAdjacentHTML( 'beforebegin', `<link rel='stylesheet' id="google-font-${linkId}" href='${url}' type='text/css' media='all' />`);
	}

	loadFontCss( attributes.fontFamily );

	getFontOptions();
    return (
		<>
		    <InspectorControls>
				<PanelBody title={ __( 'General', 'wp-quote-blocks' ) }>
				</PanelBody>
                <PanelBody title={ __( 'Icon Settings', 'wp-quote-blocks' ) }>
                    <RangeControl
                        label={ __( 'Icon size', 'wp-quote-blocks' ) }
                        value={ parseInt( iconSize ) }
                        onChange={ onChangeIconSize }
                        min={ 1 }
                        max={ 200 }
                    />
					<ButtonGroup className="wp-quote-icons__options">
						<Button variant={ attributes.icon === icons[0] ? 'primary': 'secondary' } onClick={() => setAttributes({ icon: icons[0]})}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M10.3 24.8V26H20v16.9H0V26.2C0 13.4 6.6 7.1 19.9 7.1v7.1c-3.4.5-5.9 1.6-7.4 3.3-1.5 1.7-2.2 4.1-2.2 7.3zm30 0V26H50v16.9H30.1V26.2c0-12.7 6.6-19.1 19.9-19.1v7.1c-6.4.7-9.7 4.3-9.7 10.6z"></path></svg>
						</Button>
						<Button variant={ attributes.icon === icons[1] ? 'primary': 'secondary' } onClick={() => setAttributes({ icon: icons[1]})}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M12.5 9.2H19c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H20c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H3c-1.1 0-1.8-.2-2.3-.7-.5-.4-.7-1.2-.7-2.2V21.9c0-4.3 1.1-7.4 3.4-9.6 2.3-2 5.3-3.1 9.1-3.1zm26.9 0h6.5c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H47c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H30c-1.1 0-1.8-.2-2.3-.7-.5-.5-.7-1.2-.7-2.3V21.9c0-4.3 1.1-7.4 3.4-9.6 2.2-2 5.2-3.1 9-3.1z"></path></svg>
						</Button>
						<Button variant={ attributes.icon === icons[2] ? 'primary': 'secondary' } onClick={() => setAttributes({ icon: icons[2]})}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" size="24"><path d="M20.8 44.5H0V23.7L9.3 5.5h7.3L12 23.7h8.8v20.8zm29.2 0H29.2V23.7l9.3-18.1h7.3l-4.6 18.1H50v20.8z"></path></svg>
						</Button>
						<Button variant={ attributes.icon === icons[3] ? 'primary': 'secondary' } onClick={() => setAttributes({ icon: icons[3]})}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" size="24"><path d="M19.8 9.3C10.5 11.8 4.6 17 2.1 24.8c2.3-3.6 5.6-5.4 9.9-5.4 3.3 0 6 1.1 8.3 3.3 2.2 2.2 3.4 5 3.4 8.3 0 3.2-1.1 5.8-3.3 8-2.2 2.2-5.1 3.2-8.7 3.2-3.7 0-6.5-1.2-8.6-3.5C1 36.3 0 33.1 0 29 0 18.3 6.5 11.2 19.6 7.9l.2 1.4zm26.4 0C36.9 11.9 31 17 28.5 24.8c2.2-3.6 5.5-5.4 9.8-5.4 3.2 0 6 1.1 8.3 3.2 2.3 2.2 3.4 4.9 3.4 8.3 0 3.1-1.1 5.8-3.3 7.9-2.2 2.2-5.1 3.3-8.6 3.3-3.7 0-6.6-1.1-8.6-3.4-2.1-2.3-3.1-5.5-3.1-9.7 0-10.7 6.6-17.8 19.7-21.1l.1 1.4z"></path></svg>'
						</Button>
						<Button variant={ attributes.icon === icons[4] ? 'primary': 'secondary' } onClick={() => setAttributes({ icon: icons[4]})}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" size="24"><path d="M12.5 9.2H19c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H20c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H3c-1.1 0-1.8-.2-2.3-.7-.5-.4-.7-1.2-.7-2.2V21.9c0-4.3 1.1-7.4 3.4-9.6 2.3-2 5.3-3.1 9.1-3.1zm26.9 0h6.5c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H47c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H30c-1.1 0-1.8-.2-2.3-.7-.5-.5-.7-1.2-.7-2.3V21.9c0-4.3 1.1-7.4 3.4-9.6 2.2-2 5.2-3.1 9-3.1z"></path></svg>'
						</Button>
						<Button variant={ attributes.icon === icons[5] ? 'primary': 'secondary' } onClick={() => setAttributes({ icon: icons[5]})}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M9.4 14.6c-2.4 2.9-3.6 5.9-3.6 8.9 0 1.3.2 2.4.5 3.3 1.8-1.4 3.8-2.1 6-2.1 2.9 0 5.3.9 7.3 2.7 2 1.8 3 4.2 3 7.3 0 1.9-.5 3.6-1.4 5.1-.9 1.5-2.2 2.7-3.8 3.6s-3.3 1.3-5.1 1.3c-4.1 0-7.3-1.6-9.5-4.9C.9 36.9 0 33.5 0 29.4c0-5.2 1.4-9.9 4.1-14 2.8-4.1 6.9-7.5 12.5-10l1.5 2.8c-3.3 1.3-6.2 3.5-8.7 6.4zm27.5 0c-2.4 2.9-3.6 5.9-3.6 8.9 0 1.3.2 2.4.5 3.3 1.8-1.4 3.8-2.1 6-2.1 2.9 0 5.4.9 7.4 2.7 2 1.8 3 4.2 3 7.3 0 2.8-1 5.2-3 7.1-2 1.9-4.4 2.9-7.3 2.9-4.1 0-7.3-1.6-9.5-4.9-1.8-2.7-2.8-6.2-2.8-10.3 0-5.2 1.4-9.9 4.1-14 2.8-4.1 6.9-7.5 12.5-10l1.5 2.8c-3.5 1.2-6.4 3.4-8.8 6.3z"></path></svg>
						</Button>
						<Button variant={ attributes.icon === icons[6] ? 'primary': 'secondary' } onClick={() => setAttributes({ icon: icons[6]})}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M22.6 12.8c-1.9.5-3.7 1.2-5.3 2.1-1.6.9-3.1 1.9-4.3 3-1.2 1.1-2.2 2.4-2.9 3.7-.7 1.3-1.1 2.7-1.1 4 0 1.2.1 1.8.3 1.8.8 0 1.5-.3 2.4-.9.8-.6 1.9-.9 3.3-.9 2.1 0 3.9.8 5.4 2.4 1.5 1.6 2.3 3.7 2.3 6.2s-1 4.6-2.9 6.4c-1.9 1.8-4.3 2.6-7.3 2.6-1.8 0-3.4-.4-4.9-1.1-1.5-.8-2.8-1.8-3.9-3.1s-2-2.8-2.6-4.6C.3 32.5 0 30.6 0 28.6c0-3 .6-5.8 1.8-8.3 1.2-2.5 2.8-4.8 4.9-6.7 2-1.9 4.4-3.5 7.2-4.6 2.8-1.2 5.6-1.8 8.6-2v5.8zm27.4 0c-1.9.5-3.7 1.2-5.4 2.1-1.7.9-3.1 1.9-4.3 3-1.2 1.1-2.2 2.4-2.9 3.7-.7 1.3-1.1 2.7-1.1 4 0 1.2.1 1.8.4 1.8.8 0 1.5-.3 2.3-.9.8-.6 1.9-.9 3.3-.9 2 0 3.8.8 5.3 2.4 1.5 1.6 2.3 3.7 2.3 6.2s-1 4.6-2.9 6.4c-2 1.8-4.4 2.6-7.3 2.6-1.7 0-3.3-.4-4.8-1.1-1.5-.8-2.8-1.8-3.9-3.1s-2-2.8-2.7-4.6c-.7-1.8-1-3.7-1-5.7 0-3 .6-5.8 1.8-8.3 1.2-2.5 2.8-4.8 4.9-6.7 2-1.9 4.4-3.5 7.2-4.6 2.8-1.2 5.7-1.8 8.8-2v5.7z"></path></svg>
						</Button>
						<Button variant={ attributes.icon === icons[7] ? 'primary': 'secondary' } onClick={() => setAttributes({ icon: icons[7]})}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M14.7 45.9H0V31.3C0 17.6 8.6 6.6 21.6 4.1v4.7c-10 2.6-16.7 10.9-16.7 22.6h9.8v14.5zm28.1 0H28.4V31.3C28.4 17.6 37 6.6 50 4.1v4.7c-9.8 2.6-16.7 10.9-16.7 22.6h9.5v14.5z"></path></svg>
						</Button>
					</ButtonGroup>
				</PanelBody>
				<PanelColorSettings
                    title={ __( 'Color settings', 'wp-quote-blocks' ) }
                    initialOpen={ false }
					colorSettings={ colorSettingsDropDown }
                ></PanelColorSettings>
				<ToolsPanel label={ __( 'Typography' ) }>
					<ToolsPanelItem
						hasValue={ () => !! attributes.quoteFontSize || !! attributes.citationFontSize }
						label={ __( 'Font sizes' ) }
						onDeselect={ () => resetFontSizes() }
					>
						<PanelBody title={ __( 'Font sizes', 'wp-quote-blocks' ) }>
							<ToggleGroupControl label="quote font size" value={attributes.quoteFontSize} onChange={ onChangeQuoteFontSize } isBlock>
								<ToggleGroupControlOption value="0.75rem" label="S" />
								<ToggleGroupControlOption value="1rem" label="M" />
								<ToggleGroupControlOption value="1.5rem" label="L" />
								<ToggleGroupControlOption value="2rem" label="XL" />
								<ToggleGroupControlOption value="2.5rem" label="XXL" />
							</ToggleGroupControl>
							<ToggleGroupControl label="citation font size" value={attributes.citationFontSize} onChange={ onChangeCitationFontSize } isBlock>
								<ToggleGroupControlOption value="0.75rem" label="S" />
								<ToggleGroupControlOption value="1rem" label="M" />
								<ToggleGroupControlOption value="1.5rem" label="L" />
								<ToggleGroupControlOption value="2rem" label="XL" />
								<ToggleGroupControlOption value="2.5rem" label="XXL" />
							</ToggleGroupControl>
						</PanelBody>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={ () => true }
						label={ __( 'Font family' ) }
						onDeselect={ () => resetFontSizes() }
					>
						<PanelBody title={ __( 'Font family', 'wp-quote-blocks' ) }>
							<SelectControl
								label="Select font"
								value={ attributes.fontFamily }
								options={ fontOptions }
								onChange={ ( newFont ) => onChangeFontFamily( newFont ) }
								__nextHasNoMarginBottom
							/>
						</PanelBody>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>
			<div {...blockProps} className={`wp-quote-blocks quote-variation-${attributes.class}`} { ...useBlockProps( { style: { backgroundColor } } ) }>
				{
                    <BlockControls>
                        <AlignmentToolbar
                            value={ attributes.alignment }
                            onChange={ onChangeAlignment }
                        />
                    </BlockControls>
                }

				<div className="quote-icon">
					<svg xlmns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" { ...useBlockProps( { style: iconStyles } ) } dangerouslySetInnerHTML={{__html: svgElementFromString( attributes.icon ).innerHTML}} />
				</div>
				<div className="quote-wrapper">
					<RichText
						tagName="p"
						className="quote"
						style={ { textAlign: attributes.alignment, fontSize: attributes.quoteFontSize, fontFamily: attributes.fontFamily } }
						value={ attributes.quote }
						onChange={ ( quote ) => setAttributes( { quote } ) }
						placeholder={ __( 'Add quote...' ) }
					/>
					<RichText
						tagName="p"
						className="citation"
						style={ { textAlign: attributes.alignment, fontSize: attributes.citationFontSize, fontFamily: attributes.fontFamily } }
						value={ attributes.citation }
						onChange={ ( citation ) => setAttributes( { citation } ) }
						placeholder={ __( 'Add citation...' ) }
						textAlign="center"
					/>
				</div>
				{ right_icon }
			</div>
		</>
	);
}