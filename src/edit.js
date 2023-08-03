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
	BlockControls
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

    return (
		<>
			<div {...blockProps} className={`quote-variation-${attributes.class}`}>
				{/* <BlockControls>
					<AlignmentControl
						value={ attributes.textAlign }
						onChange={ ( nextAlign ) => {
							setAttributes( { textAlign: nextAlign } );
						} }
					/>
				</BlockControls> */}
				<div class="quote-icon"><span class="dashicons dashicons-format-quote"></span></div>

				<RichText
					tagName="p" // The tag here is the element output and editable in the admin
					value={ attributes.quote } // Any existing content, either from the database or an attribute default
					onChange={ ( quote ) => setAttributes( { quote } ) } // Store updated content as a block attribute
					placeholder={ __( 'Add quote...' ) } // Display this text before any content has been added by the user
				/>
				<RichText
					tagName="p" // The tag here is the element output and editable in the admin
					value={ attributes.citation } // Any existing content, either from the database or an attribute default
					onChange={ ( citation ) => setAttributes( { citation } ) } // Store updated content as a block attribute
					placeholder={ __( 'Add citation...' ) } // Display this text before any content has been added by the user
					textAlign="center"
				/>
			</div>
		</>
	);
}