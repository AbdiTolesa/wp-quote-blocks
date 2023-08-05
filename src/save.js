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
		width: iconSize,
		height: iconSize,
		fill: iconColor,
	};

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
        <div {...blockProps} { ...useBlockProps.save( { className: `quote-variation-${attributes.class}` } ) }>
			<div className="quote-icon">
				<span>
					<svg xlmns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" { ...useBlockProps.save( { style: iconStyles } ) } dangerouslySetInnerHTML={{__html: svgElementFromString( attributes.icon ).innerHTML}} />
				</span>
			</div>
			<RichText.Content { ...blockProps } { ...useBlockProps.save( { style: { textAlign: attributes.alignment } } ) } tagName="p" className="quote" value={ attributes.quote } />
			<RichText.Content { ...blockProps } { ...useBlockProps.save( { style: { textAlign: attributes.alignment } } ) } tagName="p" className="citation" value={ attributes.citation } />
			{ attributes.class.includes( 'closed' ) && (
					<div className="quote-icon">
						<span>
							<svg xlmns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" { ...useBlockProps.save( { style: { ...iconStyles, transform: 'rotate(180deg)' }  } ) } dangerouslySetInnerHTML={{__html: svgElementFromString( attributes.icon ).innerHTML}} />
						</span>
					</div>
				)}
        </div>
	);
	
}
