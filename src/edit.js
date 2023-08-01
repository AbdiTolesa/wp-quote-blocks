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
    InnerBlocks,
} from '@wordpress/block-editor';

import { useDispatch, useSelect } from '@wordpress/data';

import './editor.scss';

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
    const hasInnerBlocks = useSelect(
        ( select ) =>
            select( blockEditorStore ).getBlocks( clientId ).length > 0,
        [ clientId ]
    );

    const Component = hasInnerBlocks
        ? EditContainer // display the inner blocks
        : Placeholder;  // or the variation picker

    return <Component { ...props } />;
}

function Placeholder( { clientId, setAttributes } ) {
    // Always set a default variation, particularly if allowing skipping the variation picker.
    // const defaultVariation = variations[0];
    // Or do something like this, which selects the variation having "isDefault: true":
//  const defaultVariation = variations.filter( item => item.isDefault )[0] || variations[0];

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
                    if ( variation.innerBlocks ) {
                        replaceInnerBlocks(
                            clientId,
                            createBlocksFromInnerBlocksTemplate(
                                variation.innerBlocks
                            ),
                            true
                        );
                    }
                } }
                // allowSkip
            />
        </div>
    );
}

function EditContainer( props ) {
	const { attributes } = props;
    const blockProps = useBlockProps();
    const innerBlocksProps = useInnerBlocksProps( blockProps, {
        // allowedBlocks: ["core/image"],
        orientation: 'horizontal',
        renderAppender: false,
    } );

    return (
		<div className={`quote-variation-${attributes.class}`}>
			<span className="dashicons dashicons-format-quote"></span>
			<div { ...innerBlocksProps } />
		</div>
	);
}