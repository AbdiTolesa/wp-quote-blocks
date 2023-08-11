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
	let leftIcon = null, rightIcon = null;
	const blockProps = useBlockProps.save();
	const {
		iconSize,
		iconColor,
		backgroundColor,
		boxShadow,
		fontWeight
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

	const iconSVG = svgElementFromString( attributes.icon );

	leftIcon = (
		<div className="quote-icon">
			<svg xlmns="http://www.w3.org/2000/svg" viewBox={iconSVG.getAttribute( 'viewBox' )} { ...useBlockProps.save( { style: iconStyles } ) } dangerouslySetInnerHTML={{__html: iconSVG.innerHTML}} />
		</div>
	);

	if ( attributes.class.includes( 'closed' ) ) {
		rightIcon = (
			<div className="quote-icon quote-right-icon">
				<svg xlmns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" { ...useBlockProps.save( { style: { ...iconStyles, transform: 'rotate(180deg)' }  } ) } dangerouslySetInnerHTML={{__html: iconSVG.innerHTML}} />
			</div>
		);
	}

	const blockStyles = {
		backgroundColor,
		boxShadow: Math.max( (boxShadow - 10), 0 ) + 'px ' + Math.max( (boxShadow - 5), 0 ) + 'px ' + boxShadow + 'px ' + Math.max(boxShadow-7, 0) + 'px ' + 'rgba(0,0,0,0.2)'
	};

	return (
        <div {...blockProps} { ...useBlockProps.save( { className: `quote-variation-${attributes.class}` } ) } { ...useBlockProps.save( { style: blockStyles } ) }>
			{ attributes.showLines && (
				<div className="wpqb__line" style={{ borderColor: attributes.linesColor }}></div>
			)}
			{ leftIcon }
			<div className="quote-wrapper" style={{ fontWeight }}>
				<RichText.Content { ...blockProps } { ...useBlockProps.save( { style: { textAlign: attributes.alignment, fontSize: attributes.quoteFontSize, fontFamily: attributes.fontFamily  } } ) } tagName="p" className="quote" value={ attributes.quote } />
				<RichText.Content { ...blockProps } { ...useBlockProps.save( { style: { textAlign: attributes.alignment, fontSize: attributes.citationFontSize, fontFamily: attributes.fontFamily } } ) } tagName="p" className="citation" value={ attributes.citation } />
			</div>
			{ rightIcon }
			{ attributes.showLines && (
				<div className="wpqb__line" style={{ borderColor: attributes.linesColor }}></div>
			)}
        </div>
	);
	
}
