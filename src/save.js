/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( props ) {
	const { attributes } = props;
	const blockProps = useBlockProps.save();
	const {
		iconSize,
		iconColor,
	} = attributes;

	const iconStyles = {
		fontSize: iconSize,
		color:    iconColor,
	};

	return (
        <div {...blockProps} { ...useBlockProps.save( { className: `quote-variation-${attributes.class}` } ) }>
			<div className={ `quote-icon ${blockProps.className}` }><span { ...useBlockProps.save( { style: iconStyles } ) } className="dashicons dashicons-format-quote"></span></div>
			<RichText.Content { ...blockProps } tagName="p" value={ attributes.quote } />
			<RichText.Content { ...blockProps } tagName="p" value={ attributes.citation } />
        </div>
	);
	
}
