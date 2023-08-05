import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';

import './style.scss';

import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import variations from './variations';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
	variations,
} );

// registerBlockVariation(
// 	'create-block/wp-quote-blocks',
// 	{
// 		name: 'newsletter',
// 		title: 'Newsletter',
// 		attributes: {
// 			"templateLock": "all",
// 			"allowedBlocks": [ "core/image" ],
// 		},
// 		templateLock: "all",
// 		allowedBlocks: [ "core/image" ],
// 		innerBlocks: [
// 			[ 'core/image', { content: 'Subscribe to our Newsletter', allowedBlocks: 'core/image' } ],
// 			[ 'core/paragraph', { content: 'Get a 10% discount on your first order.' } ],
// 			[ 'core/button', { text: 'Subscribe' } ],
// 		]
// 	}
// );