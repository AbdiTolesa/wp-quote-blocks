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
	RichText,
	BlockControls,
	InspectorControls,
    PanelColorSettings,
} from '@wordpress/block-editor';

import { useDispatch, useSelect } from '@wordpress/data';

import './editor.scss';

import { PanelBody, RangeControl, Button, ButtonGroup, __experimentalRadio as Radio, __experimentalRadioGroup as RadioGroup,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
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

    const ALLOWED_BLOCKS = [ 'core/paragraph' ];
    const TEMPLATE_PARAGRAPHS = [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin finibus, lectus non interdum cursus, arcu sapien mollis lacus, et tincidunt odio nisi ut purus. Duis eleifend, magna placerat faucibus tincidunt, orci nulla ornare tortor, eget egestas tortor nunc quis sem. Cras in tortor justo. Nulla consectetur leo vel blandit consectetur.',
    ];
    const MC_TEMPLATE = [
        [ 'core/paragraph', { placeholder: TEMPLATE_PARAGRAPHS[ 0 ] } ],
    ];

	const { clientId } = props;
    // const hasInnerBlocks = useSelect(
    //     ( select ) =>
    //         select( blockEditorStore ).getBlocks( clientId ).length > 0,
    //     [ clientId ]
    // );

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
    const blockProps = useBlockProps();
    const innerBlocksProps = useInnerBlocksProps( blockProps, {
        allowedBlocks: ["core/image"],
        orientation: 'horizontal',
        renderAppender: false,
    } );

	const {
		iconSize,
		iconColor,
	} = attributes;

	const onChangeIconSize = ( val ) => {
		setAttributes( { iconSize: val + 'px' } );
	};

	const iconStyles = {
		width: iconSize,
		height: iconSize,
		fill: iconColor,
	};

	const onChangeIconColor = ( val ) => {
		setAttributes( { iconColor: val } );
	};

	const colorSettingsDropDown = [
		{
			value: iconColor,
			onChange: onChangeIconColor,
			label: __( 'Icon color', 'wp-quote-blocks' ),
		}
	];
    const [ checked, setChecked ] = useState( '25' );

	const onChangeIcon = ( val ) => {
		setChecked( val );
		setAttributes( { icon: val } );
	};

	const icons = [
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M10.3 24.8V26H20v16.9H0V26.2C0 13.4 6.6 7.1 19.9 7.1v7.1c-3.4.5-5.9 1.6-7.4 3.3-1.5 1.7-2.2 4.1-2.2 7.3zm30 0V26H50v16.9H30.1V26.2c0-12.7 6.6-19.1 19.9-19.1v7.1c-6.4.7-9.7 4.3-9.7 10.6z"></path></svg>',
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M12.5 9.2H19c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H20c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H3c-1.1 0-1.8-.2-2.3-.7-.5-.4-.7-1.2-.7-2.2V21.9c0-4.3 1.1-7.4 3.4-9.6 2.3-2 5.3-3.1 9.1-3.1zm26.9 0h6.5c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H47c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H30c-1.1 0-1.8-.2-2.3-.7-.5-.5-.7-1.2-.7-2.3V21.9c0-4.3 1.1-7.4 3.4-9.6 2.2-2 5.2-3.1 9-3.1z"></path></svg>',
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" size="24"><path d="M10.3 24.8V26H20v16.9H0V26.2C0 13.4 6.6 7.1 19.9 7.1v7.1c-3.4.5-5.9 1.6-7.4 3.3-1.5 1.7-2.2 4.1-2.2 7.3zm30 0V26H50v16.9H30.1V26.2c0-12.7 6.6-19.1 19.9-19.1v7.1c-6.4.7-9.7 4.3-9.7 10.6z"></path></svg>',
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" size="24"><path d="M19.8 9.3C10.5 11.8 4.6 17 2.1 24.8c2.3-3.6 5.6-5.4 9.9-5.4 3.3 0 6 1.1 8.3 3.3 2.2 2.2 3.4 5 3.4 8.3 0 3.2-1.1 5.8-3.3 8-2.2 2.2-5.1 3.2-8.7 3.2-3.7 0-6.5-1.2-8.6-3.5C1 36.3 0 33.1 0 29 0 18.3 6.5 11.2 19.6 7.9l.2 1.4zm26.4 0C36.9 11.9 31 17 28.5 24.8c2.2-3.6 5.5-5.4 9.8-5.4 3.2 0 6 1.1 8.3 3.2 2.3 2.2 3.4 4.9 3.4 8.3 0 3.1-1.1 5.8-3.3 7.9-2.2 2.2-5.1 3.3-8.6 3.3-3.7 0-6.6-1.1-8.6-3.4-2.1-2.3-3.1-5.5-3.1-9.7 0-10.7 6.6-17.8 19.7-21.1l.1 1.4z"></path></svg>',
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" size="24"><path d="M12.5 9.2H19c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H20c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H3c-1.1 0-1.8-.2-2.3-.7-.5-.4-.7-1.2-.7-2.2V21.9c0-4.3 1.1-7.4 3.4-9.6 2.3-2 5.3-3.1 9.1-3.1zm26.9 0h6.5c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H47c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H30c-1.1 0-1.8-.2-2.3-.7-.5-.5-.7-1.2-.7-2.3V21.9c0-4.3 1.1-7.4 3.4-9.6 2.2-2 5.2-3.1 9-3.1z"></path></svg>',
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

    return (
		<>
		    <InspectorControls>
                <PanelBody title={ __( 'Icon Settings', 'wp-quote-blocks' ) }>
                    <RangeControl
                        label={ __( 'Icon size', 'wp-quote-blocks' ) }
                        value={ parseInt( iconSize ) }
                        onChange={ onChangeIconSize }
                        min={ 1 }
                        max={ 100 }
                    />
					<RadioGroup className="quote-icons" label="Width" onChange={ onChangeIcon } checked={ attributes.icon || checked }>
						<Radio value={ icons[0] }>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M10.3 24.8V26H20v16.9H0V26.2C0 13.4 6.6 7.1 19.9 7.1v7.1c-3.4.5-5.9 1.6-7.4 3.3-1.5 1.7-2.2 4.1-2.2 7.3zm30 0V26H50v16.9H30.1V26.2c0-12.7 6.6-19.1 19.9-19.1v7.1c-6.4.7-9.7 4.3-9.7 10.6z"></path></svg>
						</Radio>
						<Radio value={ icons[1] }>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M12.5 9.2H19c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H20c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H3c-1.1 0-1.8-.2-2.3-.7-.5-.4-.7-1.2-.7-2.2V21.9c0-4.3 1.1-7.4 3.4-9.6 2.3-2 5.3-3.1 9.1-3.1zm26.9 0h6.5c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H47c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H30c-1.1 0-1.8-.2-2.3-.7-.5-.5-.7-1.2-.7-2.3V21.9c0-4.3 1.1-7.4 3.4-9.6 2.2-2 5.2-3.1 9-3.1z"></path></svg>'
						</Radio>
						<Radio value={ icons[2] }>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" size="24"><path d="M10.3 24.8V26H20v16.9H0V26.2C0 13.4 6.6 7.1 19.9 7.1v7.1c-3.4.5-5.9 1.6-7.4 3.3-1.5 1.7-2.2 4.1-2.2 7.3zm30 0V26H50v16.9H30.1V26.2c0-12.7 6.6-19.1 19.9-19.1v7.1c-6.4.7-9.7 4.3-9.7 10.6z"></path></svg>'
						</Radio>
						<Radio value={ icons[3] }>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" size="24"><path d="M19.8 9.3C10.5 11.8 4.6 17 2.1 24.8c2.3-3.6 5.6-5.4 9.9-5.4 3.3 0 6 1.1 8.3 3.3 2.2 2.2 3.4 5 3.4 8.3 0 3.2-1.1 5.8-3.3 8-2.2 2.2-5.1 3.2-8.7 3.2-3.7 0-6.5-1.2-8.6-3.5C1 36.3 0 33.1 0 29 0 18.3 6.5 11.2 19.6 7.9l.2 1.4zm26.4 0C36.9 11.9 31 17 28.5 24.8c2.2-3.6 5.5-5.4 9.8-5.4 3.2 0 6 1.1 8.3 3.2 2.3 2.2 3.4 4.9 3.4 8.3 0 3.1-1.1 5.8-3.3 7.9-2.2 2.2-5.1 3.3-8.6 3.3-3.7 0-6.6-1.1-8.6-3.4-2.1-2.3-3.1-5.5-3.1-9.7 0-10.7 6.6-17.8 19.7-21.1l.1 1.4z"></path></svg>'
						</Radio>
						<Radio value={ icons[4] }>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" size="24"><path d="M12.5 9.2H19c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H20c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H3c-1.1 0-1.8-.2-2.3-.7-.5-.4-.7-1.2-.7-2.2V21.9c0-4.3 1.1-7.4 3.4-9.6 2.3-2 5.3-3.1 9.1-3.1zm26.9 0h6.5c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v3.4c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7h-5.8c-.7 0-1.3.2-1.7.6-.4.4-.6 1-.6 1.7v1.3H47c1.1 0 1.8.2 2.3.7.5.5.7 1.2.7 2.3v12.5c0 1.1-.2 1.8-.7 2.3-.5.5-1.2.7-2.3.7H30c-1.1 0-1.8-.2-2.3-.7-.5-.5-.7-1.2-.7-2.3V21.9c0-4.3 1.1-7.4 3.4-9.6 2.2-2 5.2-3.1 9-3.1z"></path></svg>'
						</Radio>
					</RadioGroup>
				</PanelBody>
				<PanelColorSettings
                    title={ __( 'Color settings', 'wp-quote-blocks' ) }
                    initialOpen={ false }
					colorSettings={ colorSettingsDropDown }
                ></PanelColorSettings>

			</InspectorControls>
			<div {...blockProps} className={`quote-variation-${attributes.class}`}>
				<div className="quote-icon">
					<span>
						<svg xlmns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" { ...useBlockProps( { style: iconStyles } ) } dangerouslySetInnerHTML={{__html: svgElementFromString( attributes.icon ).innerHTML}} />
					</span>
				</div>
				<RichText
					tagName="p"
					value={ attributes.quote }
					onChange={ ( quote ) => setAttributes( { quote } ) }
					placeholder={ __( 'Add quote...' ) }
				/>
				<RichText
					tagName="p"
					value={ attributes.citation }
					onChange={ ( citation ) => setAttributes( { citation } ) }
					placeholder={ __( 'Add citation...' ) }
					textAlign="center"
				/>
			</div>
		</>
	);
}