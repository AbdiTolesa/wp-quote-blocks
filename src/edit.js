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

import { PanelBody, RangeControl, SelectControl } from '@wordpress/components';

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
		iconSize
	} = attributes;

	const onChangeIconSize = ( val ) => {
		setAttributes( { iconSize: val + 'px' } );
	};

	const iconStyles = {
		'--quote-icon-font-size': iconSize
	};

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
				</PanelBody>
			</InspectorControls>
			<div {...blockProps} className={`quote-variation-${attributes.class}`}>
				<div { ...useBlockProps( { style: iconStyles } ) } className="quote-icon"><span className="dashicons dashicons-format-quote"></span></div>

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