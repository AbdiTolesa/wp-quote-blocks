import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( props ) {
	const { attributes } = props;
	let leftIcon = null,
		rightIcon = null;
	const { iconSize, iconColor, backgroundColor, boxShadow, fontWeight } =
		attributes;

	const iconStyles = {
		width: iconSize,
		height: iconSize,
		fill: iconColor,
	};

	const svgElementFromString = ( str ) => {
		const div = document.createElement( 'DIV' );
		div.innerHTML = str;
		const svg = div.querySelector( 'svg' );

		if ( ! svg ) {
			throw Error( '<svg> tag not found' );
		}

		return svg;
	};

	const iconSVG = svgElementFromString( attributes.icon );

	leftIcon = (
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

	if ( attributes.class.includes( 'closed' ) ) {
		rightIcon = (
			<div className="quote-icon quote-right-icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 50 50"
					{ ...useBlockProps.save( {
						style: { ...iconStyles, transform: 'rotate(180deg)' },
					} ) }
					dangerouslySetInnerHTML={ { __html: iconSVG.innerHTML } }
				/>
			</div>
		);
	}

	const blockStyles = {
		backgroundColor,
		boxShadow:
			Math.max( boxShadow - 10, 0 ) +
			'px ' +
			Math.max( boxShadow - 5, 0 ) +
			'px ' +
			boxShadow +
			'px ' +
			Math.max( boxShadow - 7, 0 ) +
			'px ' +
			'rgba(0,0,0,0.2)',
		borderRadius: attributes.borderRadius + '%',
	};

	const quoteTextsStyle = {
		textAlign: attributes.alignment ? attributes.alignment : 'inherit',
		fontFamily: `"${ attributes.fontFamily }", Sans-serif`,
	};

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

	const horizontalBar = attributes.showLines && (
		<div style={ { borderBottom: 'solid' + attributes.linesColor } }></div>
	);

	return (
		<div
			{ ...useBlockProps.save( {
				style: blockStyles,
				className: `wp-quote-blocks quote-variation-${ attributes.class }`,
			} ) }
		>
			{ horizontalBar }
			{ leftIcon }
			<div className="quote-wrapper" style={ quoteWrapperStyles }>
				<RichText.Content
					style={ {
						...quoteTextsStyle,
						fontWeight: fontWeight || 'inherit',
						fontSize: attributes.quoteFontSize,
					} }
					tagName="p"
					className="quote"
					value={ attributes.quote }
				/>
				<RichText.Content
					style={ {
						...quoteTextsStyle,
						fontSize: attributes.citationFontSize,
					} }
					tagName="p"
					className="citation"
					value={ attributes.citation }
				/>
			</div>
			{ rightIcon }
			{ horizontalBar }
		</div>
	);
}
