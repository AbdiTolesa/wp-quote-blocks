import { __ } from '@wordpress/i18n';
import { getBlockVariations } from '@wordpress/blocks';

import {
	useBlockProps,
	__experimentalBlockVariationPicker as BlockVariationPicker,
	AlignmentToolbar,
	RichText,
	BlockControls,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';

import './editor.scss';

import {
	PanelBody,
	SelectControl,
	RangeControl,
	Button,
	ButtonGroup,
	ToggleControl,
	Toolbar,
	FontSizePicker,
	__experimentalBoxControl as BoxControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useState, useEffect } from '@wordpress/element';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param  props
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {
	const { attributes } = props;

	const isVariationSelected = attributes.class !== '';
	const Component = isVariationSelected ? EditContainer : Placeholder;

	return <Component { ...props } />;
}

function Placeholder( { clientId, setAttributes } ) {
	const blockProps = useBlockProps();

	const variations = getBlockVariations( 'create-block/wp-quote-blocks' );
	const defaultVariation = variations[ 0 ];

	return (
		<div { ...blockProps }>
			<BlockVariationPicker
				label="Choose variation"
				instructions={ __( 'Select a variation to start with.' ) }
				variations={ variations }
				allowSkip={ true }
				onSelect={ ( variation = defaultVariation ) => {
					if ( variation.attributes ) {
						setAttributes( variation.attributes );
					}
				} }
			/>
		</div>
	);
}

function EditContainer( props ) {
	const { attributes, setAttributes } = props;
	const [ fontOptions, setFontOptions ] = useState( '' );
	const [ googleFonts, setGoogleFonts ] = useState( {} );
	const [ fontWeights, setFontWeights ] = useState( [] );
	const { fontWeight } = attributes;

	const getGooglApiKey = async function () {
		let apiKey = '';
		await wp.ajax
			.post( 'get_google_api_key', {
				_wpnonce: wpqbVars.nonce,
				action: 'get_google_api_key',
			} )
			.done( function ( response ) {
				apiKey = response;
			} );

		return apiKey;
	};

	const fetchSystemFonts = () => {
		const fontFaces = [ ...document.fonts.values() ];
		const families = fontFaces.map( ( font ) => font.family );
		return [ ...new Set( families ) ];
	};

	const loadFontCss = async ( gFonts, font ) => {
		const linkId = font.replace( / /g, '+' );
		if (
			fetchSystemFonts().includes( font ) ||
			! font ||
			document.getElementById( `google-font-${ linkId }` )
		) {
			return;
		}
		let url = `https://fonts.googleapis.com/css?family=${ font }`;

		const insertFontStylesheet = ( fontVariants ) => {
			url += `:${ fontVariants }&display=swap'`;
			document.body.insertAdjacentHTML(
				'beforebegin',
				`<link rel='stylesheet' id="google-font-${ linkId }" href='${ url }' type='text/css' media='all' />`
			);
		};

		let fontVariants;
		getWeightsForFontFamily( gFonts, font ).then( ( weights ) => {
			fontVariants = weights.join( ',' );
			insertFontStylesheet( fontVariants );
		} );
	};

	const fetchGoogleFonts = async () => {
		localStorage.removeItem( 'googleFonts' );
		let cachedGoogleFonts = localStorage.getItem( 'googleFonts' );
		if ( cachedGoogleFonts ) {
			cachedGoogleFonts = JSON.parse( cachedGoogleFonts );
			setGoogleFonts( cachedGoogleFonts );
			return cachedGoogleFonts;
		}

		const KEY = await getGooglApiKey();
		const url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${ KEY }`;
		const response = await fetch( url );
		const fonts = await response.json();
		localStorage.setItem( 'googleFonts', JSON.stringify( fonts ) );
		setGoogleFonts( fonts );

		return fonts;
	};

	const getFontOptions = ( googleFonts ) => {
		if ( fontOptions ) {
			return;
		}

		const options = { system: [], google: [] };
		const systemFonts = fetchSystemFonts();
		systemFonts.forEach( ( font ) => {
			options.system.push( { label: font, value: font } );
		} );

		googleFonts.items.forEach( ( font ) => {
			options.google.push( { label: font.family, value: font.family } );
		} );
		setFontOptions( { ...options } );
	};

	const updateFontWeightOptions = ( weights ) => {
		const options = [];
		weights.forEach( ( weight ) => {
			options.push( { label: weight, value: weight } );
		} );
		setFontWeights( options );
	};

	useEffect( () => {
		fetchGoogleFonts().then( ( googleFonts ) => {
			loadFontCss( googleFonts, attributes.fontFamily );
			getWeightsForFontFamily( googleFonts, attributes.fontFamily ).then(
				( weights ) => {
					updateFontWeightOptions( weights );
				}
			);
			getFontOptions( googleFonts );
		} );
	}, [] );

	const onChangeIconSize = ( size ) => {
		setAttributes( { iconSize: size + 'px' } );
	};

	const onChangeIconColor = ( color ) => {
		setAttributes( { iconColor: color } );
	};

	const onChangeBackgroundColor = ( newColor ) => {
		setAttributes( { backgroundColor: newColor } );
	};

	const onChangeLinesColor = ( newColor ) => {
		setAttributes( { linesColor: newColor } );
	};

	const onChangeAlignment = ( newAlignment ) => {
		setAttributes( {
			alignment: newAlignment === undefined ? 'none' : newAlignment,
		} );
	};

	const onChangeQuoteFontSize = ( val ) => {
		setAttributes( { quoteFontSize: val } );
	};

	const onChangeCitationFontSize = ( val ) => {
		setAttributes( { citationFontSize: val } );
	};

	const onChangeBoxShadow = ( newShadow ) => {
		setAttributes( { boxShadow: parseInt( newShadow ) } );
	};

	const iconStyles = {
		width: attributes.iconSize,
		height: attributes.iconSize,
		fill: attributes.iconColor,
	};

	const colorSettingsDropDown = [
		{
			value: attributes.iconColor,
			onChange: onChangeIconColor,
			label: __( 'Icon color', 'wp-quote-blocks' ),
		},
		{
			value: attributes.backgroundColor,
			onChange: onChangeBackgroundColor,
			label: __( 'Background color', 'wp-quote-blocks' ),
		},
		{
			value: attributes.linesColor,
			onChange: onChangeLinesColor,
			label: __( 'Lines color', 'wp-quote-blocks' ),
		},
	];

	const icons = [
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M10.3 24.8V26H20v16.9H0V26.2C0 13.4 6.6 7.1 19.9 7.1v7.1c-3.4.5-5.9 1.6-7.4 3.3-1.5 1.7-2.2 4.1-2.2 7.3zm30 0V26H50v16.9H30.1V26.2c0-12.7 6.6-19.1 19.9-19.1v7.1c-6.4.7-9.7 4.3-9.7 10.6z"></path></svg>',
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M12.5 9.2H19c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H20c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H3c-1.1 0-1.8-.2-2.3-.7-.5-.4-.7-1.2-.7-2.2V21.9c0-4.3 1.1-7.4 3.4-9.6 2.3-2 5.3-3.1 9.1-3.1zm26.9 0h6.5c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H47c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H30c-1.1 0-1.8-.2-2.3-.7-.5-.5-.7-1.2-.7-2.3V21.9c0-4.3 1.1-7.4 3.4-9.6 2.2-2 5.2-3.1 9-3.1z"></path></svg>',
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M20.8 44.5H0V23.7L9.3 5.5h7.3L12 23.7h8.8v20.8zm29.2 0H29.2V23.7l9.3-18.1h7.3l-4.6 18.1H50v20.8z"></path></svg>',
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M19.8 9.3C10.5 11.8 4.6 17 2.1 24.8c2.3-3.6 5.6-5.4 9.9-5.4 3.3 0 6 1.1 8.3 3.3 2.2 2.2 3.4 5 3.4 8.3 0 3.2-1.1 5.8-3.3 8-2.2 2.2-5.1 3.2-8.7 3.2-3.7 0-6.5-1.2-8.6-3.5C1 36.3 0 33.1 0 29 0 18.3 6.5 11.2 19.6 7.9l.2 1.4zm26.4 0C36.9 11.9 31 17 28.5 24.8c2.2-3.6 5.5-5.4 9.8-5.4 3.2 0 6 1.1 8.3 3.2 2.3 2.2 3.4 4.9 3.4 8.3 0 3.1-1.1 5.8-3.3 7.9-2.2 2.2-5.1 3.3-8.6 3.3-3.7 0-6.6-1.1-8.6-3.4-2.1-2.3-3.1-5.5-3.1-9.7 0-10.7 6.6-17.8 19.7-21.1l.1 1.4z"></path></svg>',
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M12.5 9.2H19c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H20c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H3c-1.1 0-1.8-.2-2.3-.7-.5-.4-.7-1.2-.7-2.2V21.9c0-4.3 1.1-7.4 3.4-9.6 2.3-2 5.3-3.1 9.1-3.1zm26.9 0h6.5c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H47c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H30c-1.1 0-1.8-.2-2.3-.7-.5-.5-.7-1.2-.7-2.3V21.9c0-4.3 1.1-7.4 3.4-9.6 2.2-2 5.2-3.1 9-3.1z"></path></svg>',
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M9.4 14.6c-2.4 2.9-3.6 5.9-3.6 8.9 0 1.3.2 2.4.5 3.3 1.8-1.4 3.8-2.1 6-2.1 2.9 0 5.3.9 7.3 2.7 2 1.8 3 4.2 3 7.3 0 1.9-.5 3.6-1.4 5.1-.9 1.5-2.2 2.7-3.8 3.6s-3.3 1.3-5.1 1.3c-4.1 0-7.3-1.6-9.5-4.9C.9 36.9 0 33.5 0 29.4c0-5.2 1.4-9.9 4.1-14 2.8-4.1 6.9-7.5 12.5-10l1.5 2.8c-3.3 1.3-6.2 3.5-8.7 6.4zm27.5 0c-2.4 2.9-3.6 5.9-3.6 8.9 0 1.3.2 2.4.5 3.3 1.8-1.4 3.8-2.1 6-2.1 2.9 0 5.4.9 7.4 2.7 2 1.8 3 4.2 3 7.3 0 2.8-1 5.2-3 7.1-2 1.9-4.4 2.9-7.3 2.9-4.1 0-7.3-1.6-9.5-4.9-1.8-2.7-2.8-6.2-2.8-10.3 0-5.2 1.4-9.9 4.1-14 2.8-4.1 6.9-7.5 12.5-10l1.5 2.8c-3.5 1.2-6.4 3.4-8.8 6.3z"></path></svg>',
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M22.6 12.8c-1.9.5-3.7 1.2-5.3 2.1-1.6.9-3.1 1.9-4.3 3-1.2 1.1-2.2 2.4-2.9 3.7-.7 1.3-1.1 2.7-1.1 4 0 1.2.1 1.8.3 1.8.8 0 1.5-.3 2.4-.9.8-.6 1.9-.9 3.3-.9 2.1 0 3.9.8 5.4 2.4 1.5 1.6 2.3 3.7 2.3 6.2s-1 4.6-2.9 6.4c-1.9 1.8-4.3 2.6-7.3 2.6-1.8 0-3.4-.4-4.9-1.1-1.5-.8-2.8-1.8-3.9-3.1s-2-2.8-2.6-4.6C.3 32.5 0 30.6 0 28.6c0-3 .6-5.8 1.8-8.3 1.2-2.5 2.8-4.8 4.9-6.7 2-1.9 4.4-3.5 7.2-4.6 2.8-1.2 5.6-1.8 8.6-2v5.8zm27.4 0c-1.9.5-3.7 1.2-5.4 2.1-1.7.9-3.1 1.9-4.3 3-1.2 1.1-2.2 2.4-2.9 3.7-.7 1.3-1.1 2.7-1.1 4 0 1.2.1 1.8.4 1.8.8 0 1.5-.3 2.3-.9.8-.6 1.9-.9 3.3-.9 2 0 3.8.8 5.3 2.4 1.5 1.6 2.3 3.7 2.3 6.2s-1 4.6-2.9 6.4c-2 1.8-4.4 2.6-7.3 2.6-1.7 0-3.3-.4-4.8-1.1-1.5-.8-2.8-1.8-3.9-3.1s-2-2.8-2.7-4.6c-.7-1.8-1-3.7-1-5.7 0-3 .6-5.8 1.8-8.3 1.2-2.5 2.8-4.8 4.9-6.7 2-1.9 4.4-3.5 7.2-4.6 2.8-1.2 5.7-1.8 8.8-2v5.7z"></path></svg>',
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M14.7 45.9H0V31.3C0 17.6 8.6 6.6 21.6 4.1v4.7c-10 2.6-16.7 10.9-16.7 22.6h9.8v14.5zm28.1 0H28.4V31.3C28.4 17.6 37 6.6 50 4.1v4.7c-9.8 2.6-16.7 10.9-16.7 22.6h9.5v14.5z"></path></svg>',
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310.284 310.284"><path d="M155.142,0C69.597,0,0,69.597,0,155.142s69.597,155.142,155.142,155.142s155.142-69.597,155.142-155.142  S240.688,0,155.142,0z M79.171,231.401c-1.746,1.182-6.129,2.222-8.693-0.625l-4.731-5.95c-2.288-3.869,0.483-7.457,2.277-8.945  c8.529-7.075,14.731-12.548,18.601-16.419c7.589-7.981,13.199-15.97,16.903-23.935c0.847-1.821-1.315-2.977-2.438-3.345  c-27.967-9.166-41.955-25.325-41.955-48.474c0-13.639,4.53-24.722,13.585-33.242c9.059-8.525,20.407-12.785,34.041-12.785  c12.146,0,22.909,5.539,32.283,16.621c9.165,10.438,13.744,21.735,13.744,33.881C152.789,163.78,128.251,198.185,79.171,231.401z   M185.61,231.401c-1.746,1.182-6.129,2.222-8.693-0.625l-4.731-5.95c-2.288-3.869,0.483-7.457,2.277-8.945  c8.528-7.075,14.731-12.548,18.601-16.419c7.589-7.981,13.199-15.97,16.904-23.935c0.847-1.821-1.315-2.977-2.438-3.345  c-27.967-9.166-41.955-25.325-41.955-48.474c0-13.639,4.53-24.722,13.585-33.242c9.06-8.525,20.407-12.785,34.041-12.785  c12.146,0,22.909,5.539,32.283,16.621c9.164,10.438,13.744,21.735,13.744,33.881C259.228,163.78,234.69,198.185,185.61,231.401z"/></svg>',
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.625 25.625"><path d="M12.812,0.435C5.736,0.435,0,5.499,0,11.747c0,3.168,1.479,6.028,3.855,8.082   c-0.521,3.01-3.883,4.23-3.652,5.059c2.84,1.175,8.529-1.412,9.918-2.083c0.869,0.164,1.768,0.255,2.691,0.255   c7.076,0,12.813-5.064,12.813-11.313S19.888,0.435,12.812,0.435z M11.904,12.218c0,3.076-1.361,4.802-4.043,5.129   c-0.006,0.001-0.01,0.001-0.016,0.001c-0.029,0-0.061-0.011-0.082-0.031c-0.027-0.023-0.043-0.058-0.043-0.094V15.66   c0-0.046,0.025-0.088,0.064-0.109c1.223-0.667,1.834-1.717,1.865-3.207H7.845c-0.068,0-0.125-0.056-0.125-0.125V8.286   c0-0.069,0.057-0.125,0.125-0.125h3.934c0.068,0,0.125,0.056,0.125,0.125V12.218z M18.869,12.218c0,3.029-1.205,4.563-4.033,5.128   c-0.008,0.001-0.016,0.002-0.024,0.002c-0.029,0-0.057-0.01-0.08-0.028c-0.029-0.023-0.045-0.06-0.045-0.097V15.66   c0-0.046,0.025-0.088,0.064-0.109c1.223-0.667,1.834-1.717,1.865-3.207h-1.804c-0.068,0-0.125-0.056-0.125-0.125V8.286   c0-0.069,0.057-0.125,0.125-0.125h3.932c0.07,0,0.125,0.056,0.125,0.125V12.218z"/></svg>',
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"/><path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"/></svg>',
	];

	const iconSetting = (
		<ButtonGroup className="wp-quote-icons__options">
			<Button
				variant={
					attributes.icon === icons[ 0 ] ? 'primary' : 'secondary'
				}
				onClick={ () => setAttributes( { icon: icons[ 0 ] } ) }
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
					<path d="M10.3 24.8V26H20v16.9H0V26.2C0 13.4 6.6 7.1 19.9 7.1v7.1c-3.4.5-5.9 1.6-7.4 3.3-1.5 1.7-2.2 4.1-2.2 7.3zm30 0V26H50v16.9H30.1V26.2c0-12.7 6.6-19.1 19.9-19.1v7.1c-6.4.7-9.7 4.3-9.7 10.6z"></path>
				</svg>
			</Button>
			<Button
				variant={
					attributes.icon === icons[ 1 ] ? 'primary' : 'secondary'
				}
				onClick={ () => setAttributes( { icon: icons[ 1 ] } ) }
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
					<path d="M12.5 9.2H19c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H20c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H3c-1.1 0-1.8-.2-2.3-.7-.5-.4-.7-1.2-.7-2.2V21.9c0-4.3 1.1-7.4 3.4-9.6 2.3-2 5.3-3.1 9.1-3.1zm26.9 0h6.5c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H47c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H30c-1.1 0-1.8-.2-2.3-.7-.5-.5-.7-1.2-.7-2.3V21.9c0-4.3 1.1-7.4 3.4-9.6 2.2-2 5.2-3.1 9-3.1z"></path>
				</svg>
			</Button>
			<Button
				variant={
					attributes.icon === icons[ 2 ] ? 'primary' : 'secondary'
				}
				onClick={ () => setAttributes( { icon: icons[ 2 ] } ) }
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 50 50"
					size="24"
				>
					<path d="M20.8 44.5H0V23.7L9.3 5.5h7.3L12 23.7h8.8v20.8zm29.2 0H29.2V23.7l9.3-18.1h7.3l-4.6 18.1H50v20.8z"></path>
				</svg>
			</Button>
			<Button
				variant={
					attributes.icon === icons[ 3 ] ? 'primary' : 'secondary'
				}
				onClick={ () => setAttributes( { icon: icons[ 3 ] } ) }
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 50 50"
					size="24"
				>
					<path d="M19.8 9.3C10.5 11.8 4.6 17 2.1 24.8c2.3-3.6 5.6-5.4 9.9-5.4 3.3 0 6 1.1 8.3 3.3 2.2 2.2 3.4 5 3.4 8.3 0 3.2-1.1 5.8-3.3 8-2.2 2.2-5.1 3.2-8.7 3.2-3.7 0-6.5-1.2-8.6-3.5C1 36.3 0 33.1 0 29 0 18.3 6.5 11.2 19.6 7.9l.2 1.4zm26.4 0C36.9 11.9 31 17 28.5 24.8c2.2-3.6 5.5-5.4 9.8-5.4 3.2 0 6 1.1 8.3 3.2 2.3 2.2 3.4 4.9 3.4 8.3 0 3.1-1.1 5.8-3.3 7.9-2.2 2.2-5.1 3.3-8.6 3.3-3.7 0-6.6-1.1-8.6-3.4-2.1-2.3-3.1-5.5-3.1-9.7 0-10.7 6.6-17.8 19.7-21.1l.1 1.4z"></path>
				</svg>
			</Button>
			<Button
				variant={
					attributes.icon === icons[ 4 ] ? 'primary' : 'secondary'
				}
				onClick={ () => setAttributes( { icon: icons[ 4 ] } ) }
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 50 50"
					size="24"
				>
					<path d="M12.5 9.2H19c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H20c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H3c-1.1 0-1.8-.2-2.3-.7-.5-.4-.7-1.2-.7-2.2V21.9c0-4.3 1.1-7.4 3.4-9.6 2.3-2 5.3-3.1 9.1-3.1zm26.9 0h6.5c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H47c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H30c-1.1 0-1.8-.2-2.3-.7-.5-.5-.7-1.2-.7-2.3V21.9c0-4.3 1.1-7.4 3.4-9.6 2.2-2 5.2-3.1 9-3.1z"></path>
				</svg>
			</Button>
			<Button
				variant={
					attributes.icon === icons[ 5 ] ? 'primary' : 'secondary'
				}
				onClick={ () => setAttributes( { icon: icons[ 5 ] } ) }
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
					<path d="M9.4 14.6c-2.4 2.9-3.6 5.9-3.6 8.9 0 1.3.2 2.4.5 3.3 1.8-1.4 3.8-2.1 6-2.1 2.9 0 5.3.9 7.3 2.7 2 1.8 3 4.2 3 7.3 0 1.9-.5 3.6-1.4 5.1-.9 1.5-2.2 2.7-3.8 3.6s-3.3 1.3-5.1 1.3c-4.1 0-7.3-1.6-9.5-4.9C.9 36.9 0 33.5 0 29.4c0-5.2 1.4-9.9 4.1-14 2.8-4.1 6.9-7.5 12.5-10l1.5 2.8c-3.3 1.3-6.2 3.5-8.7 6.4zm27.5 0c-2.4 2.9-3.6 5.9-3.6 8.9 0 1.3.2 2.4.5 3.3 1.8-1.4 3.8-2.1 6-2.1 2.9 0 5.4.9 7.4 2.7 2 1.8 3 4.2 3 7.3 0 2.8-1 5.2-3 7.1-2 1.9-4.4 2.9-7.3 2.9-4.1 0-7.3-1.6-9.5-4.9-1.8-2.7-2.8-6.2-2.8-10.3 0-5.2 1.4-9.9 4.1-14 2.8-4.1 6.9-7.5 12.5-10l1.5 2.8c-3.5 1.2-6.4 3.4-8.8 6.3z"></path>
				</svg>
			</Button>
			<Button
				variant={
					attributes.icon === icons[ 6 ] ? 'primary' : 'secondary'
				}
				onClick={ () => setAttributes( { icon: icons[ 6 ] } ) }
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
					<path d="M22.6 12.8c-1.9.5-3.7 1.2-5.3 2.1-1.6.9-3.1 1.9-4.3 3-1.2 1.1-2.2 2.4-2.9 3.7-.7 1.3-1.1 2.7-1.1 4 0 1.2.1 1.8.3 1.8.8 0 1.5-.3 2.4-.9.8-.6 1.9-.9 3.3-.9 2.1 0 3.9.8 5.4 2.4 1.5 1.6 2.3 3.7 2.3 6.2s-1 4.6-2.9 6.4c-1.9 1.8-4.3 2.6-7.3 2.6-1.8 0-3.4-.4-4.9-1.1-1.5-.8-2.8-1.8-3.9-3.1s-2-2.8-2.6-4.6C.3 32.5 0 30.6 0 28.6c0-3 .6-5.8 1.8-8.3 1.2-2.5 2.8-4.8 4.9-6.7 2-1.9 4.4-3.5 7.2-4.6 2.8-1.2 5.6-1.8 8.6-2v5.8zm27.4 0c-1.9.5-3.7 1.2-5.4 2.1-1.7.9-3.1 1.9-4.3 3-1.2 1.1-2.2 2.4-2.9 3.7-.7 1.3-1.1 2.7-1.1 4 0 1.2.1 1.8.4 1.8.8 0 1.5-.3 2.3-.9.8-.6 1.9-.9 3.3-.9 2 0 3.8.8 5.3 2.4 1.5 1.6 2.3 3.7 2.3 6.2s-1 4.6-2.9 6.4c-2 1.8-4.4 2.6-7.3 2.6-1.7 0-3.3-.4-4.8-1.1-1.5-.8-2.8-1.8-3.9-3.1s-2-2.8-2.7-4.6c-.7-1.8-1-3.7-1-5.7 0-3 .6-5.8 1.8-8.3 1.2-2.5 2.8-4.8 4.9-6.7 2-1.9 4.4-3.5 7.2-4.6 2.8-1.2 5.7-1.8 8.8-2v5.7z"></path>
				</svg>
			</Button>
			<Button
				variant={
					attributes.icon === icons[ 7 ] ? 'primary' : 'secondary'
				}
				onClick={ () => setAttributes( { icon: icons[ 7 ] } ) }
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
					<path d="M14.7 45.9H0V31.3C0 17.6 8.6 6.6 21.6 4.1v4.7c-10 2.6-16.7 10.9-16.7 22.6h9.8v14.5zm28.1 0H28.4V31.3C28.4 17.6 37 6.6 50 4.1v4.7c-9.8 2.6-16.7 10.9-16.7 22.6h9.5v14.5z"></path>
				</svg>
			</Button>
			<Button
				variant={
					attributes.icon === icons[ 8 ] ? 'primary' : 'secondary'
				}
				onClick={ () => setAttributes( { icon: icons[ 8 ] } ) }
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 310.284 310.284"
				>
					<path d="M155.142,0C69.597,0,0,69.597,0,155.142s69.597,155.142,155.142,155.142s155.142-69.597,155.142-155.142  S240.688,0,155.142,0z M79.171,231.401c-1.746,1.182-6.129,2.222-8.693-0.625l-4.731-5.95c-2.288-3.869,0.483-7.457,2.277-8.945  c8.529-7.075,14.731-12.548,18.601-16.419c7.589-7.981,13.199-15.97,16.903-23.935c0.847-1.821-1.315-2.977-2.438-3.345  c-27.967-9.166-41.955-25.325-41.955-48.474c0-13.639,4.53-24.722,13.585-33.242c9.059-8.525,20.407-12.785,34.041-12.785  c12.146,0,22.909,5.539,32.283,16.621c9.165,10.438,13.744,21.735,13.744,33.881C152.789,163.78,128.251,198.185,79.171,231.401z   M185.61,231.401c-1.746,1.182-6.129,2.222-8.693-0.625l-4.731-5.95c-2.288-3.869,0.483-7.457,2.277-8.945  c8.528-7.075,14.731-12.548,18.601-16.419c7.589-7.981,13.199-15.97,16.904-23.935c0.847-1.821-1.315-2.977-2.438-3.345  c-27.967-9.166-41.955-25.325-41.955-48.474c0-13.639,4.53-24.722,13.585-33.242c9.06-8.525,20.407-12.785,34.041-12.785  c12.146,0,22.909,5.539,32.283,16.621c9.164,10.438,13.744,21.735,13.744,33.881C259.228,163.78,234.69,198.185,185.61,231.401z" />
				</svg>
			</Button>
			<Button
				variant={
					attributes.icon === icons[ 9 ] ? 'primary' : 'secondary'
				}
				onClick={ () => setAttributes( { icon: icons[ 9 ] } ) }
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 25.625 25.625"
				>
					<path d="M12.812,0.435C5.736,0.435,0,5.499,0,11.747c0,3.168,1.479,6.028,3.855,8.082   c-0.521,3.01-3.883,4.23-3.652,5.059c2.84,1.175,8.529-1.412,9.918-2.083c0.869,0.164,1.768,0.255,2.691,0.255   c7.076,0,12.813-5.064,12.813-11.313S19.888,0.435,12.812,0.435z M11.904,12.218c0,3.076-1.361,4.802-4.043,5.129   c-0.006,0.001-0.01,0.001-0.016,0.001c-0.029,0-0.061-0.011-0.082-0.031c-0.027-0.023-0.043-0.058-0.043-0.094V15.66   c0-0.046,0.025-0.088,0.064-0.109c1.223-0.667,1.834-1.717,1.865-3.207H7.845c-0.068,0-0.125-0.056-0.125-0.125V8.286   c0-0.069,0.057-0.125,0.125-0.125h3.934c0.068,0,0.125,0.056,0.125,0.125V12.218z M18.869,12.218c0,3.029-1.205,4.563-4.033,5.128   c-0.008,0.001-0.016,0.002-0.024,0.002c-0.029,0-0.057-0.01-0.08-0.028c-0.029-0.023-0.045-0.06-0.045-0.097V15.66   c0-0.046,0.025-0.088,0.064-0.109c1.223-0.667,1.834-1.717,1.865-3.207h-1.804c-0.068,0-0.125-0.056-0.125-0.125V8.286   c0-0.069,0.057-0.125,0.125-0.125h3.932c0.07,0,0.125,0.056,0.125,0.125V12.218z" />
				</svg>
			</Button>
			<Button
				variant={
					attributes.icon === icons[ 10 ] ? 'primary' : 'secondary'
				}
				onClick={ () => setAttributes( { icon: icons[ 10 ] } ) }
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
					<path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z" />
					<path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z" />
				</svg>
			</Button>
		</ButtonGroup>
	);

	const svgElementFromString = ( str ) => {
		const div = document.createElement( 'DIV' );
		div.innerHTML = str;
		const svg = div.querySelector( 'svg' );

		if ( ! svg ) {
			throw Error( '<svg> tag not found' );
		}

		return svg;
	};

	const resetFontSizes = () => {
		setAttributes( { quoteFontSize: '1rem', citationFontSize: '0.75rem' } );
	};

	const getWeightsForFontFamily = async ( googleFonts, fontFamily ) => {
		const fonts = googleFonts;

		const fontObj = fonts.items.find( ( font ) => {
			return font.family === fontFamily;
		} );
		if ( ! fontObj ) {
			return [];
		}
		let variants = fontObj.variants.map( ( variant ) => {
			if ( parseInt( variant ) ) {
				return parseInt( variant );
			}
			if (
				isNaN( variant ) &&
				[ 'lighter', 'bold', 'bolder' ].includes( variant )
			) {
				return variant;
			}
			return null;
		} );

		variants = variants.filter( ( variant ) => variant !== null );

		return [ ...new Set( variants ) ];
	};

	const onChangeFontFamily = ( newFont ) => {
		setAttributes( { fontFamily: newFont } );
		loadFontCss( googleFonts, newFont );
		getWeightsForFontFamily( googleFonts, newFont ).then( ( weights ) => {
			updateFontWeightOptions( weights );
			if ( ! weights.includes( parseInt( attributes.fontWeight ) ) ) {
				if ( weights.length === 0 ) {
					setAttributes( { fontWeight: '' } );
				} else if ( weights.includes( 300 ) ) {
					setAttributes( { fontWeight: 300 } );
				} else {
					setAttributes( { fontWeight: weights[ 0 ] } );
				}
			}
		} );
	};

	const blockStyles = {
		backgroundColor: attributes.backgroundColor,
		boxShadow:
			Math.max( attributes.boxShadow - 10, 0 ) +
			'px ' +
			Math.max( attributes.boxShadow - 5, 0 ) +
			'px ' +
			attributes.boxShadow +
			'px ' +
			Math.max( attributes.boxShadow - 7, 0 ) +
			'px ' +
			'rgba(0,0,0,0.2)',
	};

	const quoteTextsStyle = {
		textAlign: attributes.alignment ? attributes.alignment : 'inherit',
		fontFamily: `"${ attributes.fontFamily }", Sans-serif`,
	};

	const getFonts = ( type ) => {
		return fontOptions[ type ];
	};

	const fontWeightSelector = () => {
		return (
			<SelectControl
				label="Font weight"
				value={ fontWeight }
				onChange={ ( newWeight ) =>
					setAttributes( { fontWeight: newWeight } )
				}
				__nextHasNoMarginBottom
				options={ fontWeights }
			/>
		);
	};

	const fontFamilySelector = () => {
		return (
			<SelectControl
				label="Select font"
				value={ attributes.fontFamily }
				onChange={ ( newFont ) => onChangeFontFamily( newFont ) }
				__nextHasNoMarginBottom
			>
				<optgroup label="System fonts">
					{ getFonts( 'system' ).map( ( font ) => (
						<option key={ font.value } value={ font.value }>
							{ font.label }
						</option>
					) ) }
				</optgroup>
				<optgroup label="Google fonts">
					{ getFonts( 'google' ).map( ( font ) => (
						<option key={ font.value } value={ font.value }>
							{ font.label }
						</option>
					) ) }
				</optgroup>
			</SelectControl>
		);
	};

	const horizontalLine = attributes.showLines && (
		<div
			className="wpqb__line"
			style={ { borderColor: attributes.linesColor } }
		></div>
	);

	const iconSVG = svgElementFromString( attributes.icon );

	const leftIcon = (
		<div
			className="quote-icon"
			style={ {
				filter: attributes.iconShadow
					? `drop-shadow(10px 5px ${ attributes.iconShadow }px rgba(0, 0, 0, 0.3))`
					: 'none',
				margin: `${
					( attributes.iconMargin.top || '0' ) +
					' ' +
					( attributes.iconMargin.right || '0' ) +
					' ' +
					( attributes.iconMargin.bottom || '0' ) +
					' ' +
					( attributes.iconMargin.left || '0' )
				}`,
				padding: `${
					( attributes.iconPadding.top || '0' ) +
					' ' +
					( attributes.iconPadding.right || '0' ) +
					' ' +
					( attributes.iconPadding.bottom || '0' ) +
					' ' +
					( attributes.iconPadding.left || '0' )
				}`,
			} }
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox={ iconSVG.getAttribute( 'viewBox' ) }
				style={ iconStyles }
				dangerouslySetInnerHTML={ { __html: iconSVG.innerHTML } }
			/>
		</div>
	);

	const rightIcon = attributes.class.includes( 'closed' ) && (
		<div className="quote-icon quote-right-icon">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox={ iconSVG.getAttribute( 'viewBox' ) }
				style={ { ...iconStyles, transform: 'rotate(180deg)' } }
				dangerouslySetInnerHTML={ {
					__html: svgElementFromString( attributes.icon ).innerHTML,
				} }
			/>
		</div>
	);

	const quoteWrapperStyles = {
		margin: `${
			( attributes.margin.top || '0' ) +
			' ' +
			( attributes.margin.right || '0' ) +
			' ' +
			( attributes.margin.bottom || '0' ) +
			' ' +
			( attributes.margin.left || '0' )
		}`,
		padding: `${
			( attributes.padding.top || '0' ) +
			' ' +
			( attributes.padding.right || '0' ) +
			' ' +
			( attributes.padding.bottom || '0' ) +
			' ' +
			( attributes.padding.left || '0' )
		}`,
	};

	const fontSizes = [
		{
			name: __( 'Small' ),
			slug: 'small',
			size: 12,
		},
		{
			name: __( 'Medium' ),
			slug: 'medium',
			size: 14,
		},
		{
			name: __( 'Large' ),
			slug: 'large',
			size: 20,
		},
		{
			name: __( 'Extra large' ),
			slug: 'extra-large',
			size: 28,
		},
	];

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'General', 'wp-quote-blocks' ) }>
					<BoxControl
						label="Quote margin"
						values={ attributes.margin }
						onChange={ ( nextValues ) =>
							setAttributes( { margin: nextValues } )
						}
						inputProps={ { min: -300 } }
					/>
					<BoxControl
						label="Quote padding"
						values={ attributes.padding }
						onChange={ ( nextValues ) =>
							setAttributes( { padding: nextValues } )
						}
					/>
					<RangeControl
						label={ __( 'Shadow', 'wp-quote-blocks' ) }
						value={ parseInt( attributes.boxShadow ) }
						onChange={ onChangeBoxShadow }
						step="1"
						min={ 0 }
						max={ 20 }
					/>
					<ToggleControl
						label="Show lines"
						help={
							attributes.showLines
								? 'Lines are shown'
								: 'Lines are hidden'
						}
						checked={ attributes.showLines }
						onChange={ () => {
							setAttributes( {
								showLines: ! attributes.showLines,
							} );
						} }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Icon Settings', 'wp-quote-blocks' ) }>
					<RangeControl
						label={ __( 'Icon size', 'wp-quote-blocks' ) }
						value={ parseInt( attributes.iconSize ) }
						onChange={ onChangeIconSize }
						min={ 1 }
						max={ 200 }
					/>
					<RangeControl
						label={ __( 'Shadow', 'wp-quote-blocks' ) }
						value={ parseInt( attributes.iconShadow ) }
						onChange={ ( newShadow ) =>
							setAttributes( {
								iconShadow: parseInt( newShadow ),
							} )
						}
						step="1"
						min={ 0 }
						max={ 20 }
					/>
					{ iconSetting }
					<BoxControl
						label="Margin"
						values={ attributes.margin }
						onChange={ ( nextValues ) =>
							setAttributes( { iconMargin: nextValues } )
						}
						inputProps={ { min: -300 } }
					/>
					<BoxControl
						label="Padding"
						values={ attributes.padding }
						onChange={ ( nextValues ) =>
							setAttributes( { iconPadding: nextValues } )
						}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Color Settings', 'wp-quote-blocks' ) }>
					<PanelColorSettings
						initialOpen={ false }
						colorSettings={ colorSettingsDropDown }
					></PanelColorSettings>
				</PanelBody>
				<ToolsPanel label={ __( 'Typography' ) }>
					<ToolsPanelItem
						hasValue={ () =>
							!! attributes.quoteFontSize ||
							!! attributes.citationFontSize
						}
						label={ __( 'Font sizes' ) }
						onDeselect={ () => resetFontSizes() }
					>
						<PanelBody
							title={ __( 'Font sizes', 'wp-quote-blocks' ) }
						>
							<p style={ { marginBottom: '6px' } }>Quote:</p>
							<FontSizePicker
								__nextHasNoMarginBottom
								fontSizes={ fontSizes }
								value={ attributes.quoteFontSize }
								fallbackFontSize="16"
								onChange={ onChangeQuoteFontSize }
							/>
							<p style={ { marginBottom: '6px' } }>Citation:</p>
							<FontSizePicker
								__nextHasNoMarginBottom
								fontSizes={ fontSizes }
								value={ attributes.citationFontSize }
								fallbackFontSize="16"
								onChange={ onChangeCitationFontSize }
							/>
						</PanelBody>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={ () => !! fontOptions }
						label={ __( 'Font family' ) }
						onDeselect={ () =>
							setAttributes( { fontFamily: 'Sans-serif' } )
						}
					>
						<PanelBody
							title={ __( 'Font family', 'wp-quote-blocks' ) }
						>
							{ fontFamilySelector }
						</PanelBody>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={ () => true }
						label={ __( 'Font weight' ) }
					>
						<PanelBody title={ '' }>
							{ fontWeightSelector }
						</PanelBody>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>
			<div
				{ ...useBlockProps( {
					style: blockStyles,
					className: `wp-quote-blocks quote-variation-${ attributes.class }`,
				} ) }
			>
				<BlockControls>
					<AlignmentToolbar
						value={ attributes.alignment }
						onChange={ onChangeAlignment }
					/>
					<Toolbar>
						<button
							type="button"
							className="components-button"
							onClick={ () => setAttributes( { class: '' } ) }
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="#000000"
								width="24px"
								height="24px"
								viewBox="0 0 16 16"
							>
								<path
									d="M9 6h7v10H9V6zm2 2v6h3V8h-3zM0 14h7v2H0v-2zm0-8h7v2H0V6zm0 4h7v2H0v-2zM0 0h16v4H0V0z"
									fillRule="evenodd"
								/>
							</svg>
						</button>
					</Toolbar>
				</BlockControls>
				{ horizontalLine }
				{ leftIcon }
				<div className="quote-wrapper" style={ quoteWrapperStyles }>
					<RichText
						tagName="p"
						className="quote"
						style={ {
							...quoteTextsStyle,
							fontWeight,
							fontSize: attributes.quoteFontSize,
						} }
						value={ attributes.quote }
						onChange={ ( quote ) => setAttributes( { quote } ) }
						placeholder={ __( 'Add quote…' ) }
					/>
					<RichText
						tagName="p"
						className="citation"
						style={ {
							...quoteTextsStyle,
							fontSize: attributes.citationFontSize,
						} }
						value={ attributes.citation }
						onChange={ ( citation ) =>
							setAttributes( { citation } )
						}
						placeholder={ __( 'Add citation…' ) }
						textAlign="center"
					/>
				</div>
				{ rightIcon }
				{ horizontalLine }
			</div>
		</>
	);
}
