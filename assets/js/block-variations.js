

wp.blocks.registerBlockVariation( 'create-block/wp-quote-blocks', {
	name: 'default',
	title: 'Default',
	attributes: {
		align: 'full',
    }
});

wp.blocks.registerBlockVariation( 'create-block/wp-quote-blocks', {
	name: 'style_1',
	title: 'Style 1',
	attributes: {
		align: 'half',
    }
});

console.log( 'REG' );
// export çdefault