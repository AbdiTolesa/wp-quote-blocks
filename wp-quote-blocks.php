<?php
/**
 * Plugin Name:       Wp Quote Blocks
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wp-quote-blocks
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_wp_quote_blocks_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_wp_quote_blocks_block_init' );

// function prefix_editor_assets() {
// 	wp_enqueue_script(
// 		'prefix-block-variations',
// 		plugin_dir_url( __FILE__ ) . '/assets/js/block-variations.js',
// 		array( 'wp-blocks' )
// 	);
// }

// add_action( 'enqueue_block_editor_assets', 'prefix_editor_assets' );
