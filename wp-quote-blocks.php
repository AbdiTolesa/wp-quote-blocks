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

function wp_quote_blocks_custom_script() {
	global $post;
    $blocks = parse_blocks( $post->post_content );
	$blocks = wp_list_filter( $blocks, array( 'blockName' => 'create-block/wp-quote-blocks' ) );
	foreach( $blocks as $block ) { //var_dump( $block['attrs'] ); die;?>
		
		<script type="text/javascript">
			document.addEventListener("DOMContentLoaded", () => {
				if ( "" !== "<?php echo $block['attrs']['fontFamily'] ?>" ) {
					var url = `https://fonts.googleapis.com/css?family=<?php echo $block['attrs']['fontFamily']; ?>`;
					document.body.insertAdjacentHTML( 'beforebegin', `<link rel='stylesheet' id='google-fonts-css'  href='${url}' type='text/css' media='all' />`);
				}
			});
		</script>
		<?php
	}
}
add_action('wp_enqueue_scripts', 'wp_quote_blocks_custom_script');
