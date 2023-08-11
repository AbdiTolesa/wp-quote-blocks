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
	if ( ! $post ) {
		return;
	}
    $blocks = parse_blocks( $post->post_content );
	$blocks = wp_list_filter( $blocks, array( 'blockName' => 'create-block/wp-quote-blocks' ) );
	foreach( $blocks as $block ) {?>
		<script type="text/javascript">
			document.addEventListener("DOMContentLoaded", () => {
				if ( "" !== "<?php echo ! empty($block['attrs']['fontFamily']) ? $block['attrs']['fontFamily'] : ''; ?>" ) {
					let url = `https://fonts.googleapis.com/css?family=<?php echo $block['attrs']['fontFamily']; ?>`;
					if ( "" !== "<?php echo ! empty($block['attrs']['fontFamily']) ? $block['attrs']['fontFamily'] : ''; ?>" ) {
						url += ":<?php echo ! empty($block['attrs']['fontFamily']) ? $block['attrs']['fontFamily'] : ''; ?>";
					}
					url += '&display=swap';

					document.body.insertAdjacentHTML( 'beforebegin', `<link rel='stylesheet' id='google-fonts-css'  href='${url}' type='text/css' media='all' />`);
				}
			});
		</script>
		<?php
	}
}
add_action('wp_enqueue_scripts', 'wp_quote_blocks_custom_script');

function wpqb_register_settings() {
	register_setting('wpqb_plugin_options_group', 'google_api_key');
}

add_action( 'admin_init', 'wpqb_register_settings');

function wpqb_admin_menus() {
	add_menu_page(
		__( 'WP Quote Blocks settings', 'wp-quote-blocks' ),
		__( 'WP Quote Blocks settings', 'wp-quote-blocks' ),
		'manage_options',
		'/wp-quote-blocks-settings.php',
		'wpqb_page_html_form',
		'',
		6
	);
}

add_action('admin_menu', 'wpqb_admin_menus');

function wpqb_page_html_form() { ?>
    <div class="wrap">
        <h2>WP Quote Blocks Settings</h2>
        <form method="post" action="options.php">
            <?php settings_fields('wpqb_plugin_options_group'); ?>
        <table class="form-table">
            <tr>
                <th><label for="google_api_key">Google API key:</label></th>
                <td>
					<input type = 'text' class="regular-text" id="google_api_key" name="google_api_key" value="<?php echo get_option('google_api_key'); ?>">
                </td>
            </tr>
        </table>
        <?php submit_button(); ?>
    </div>
<?php } ?>

<?php
add_action( 'wp_ajax_get_google_api_key', 'wpqb_get_google_api_key' );

function wpqb_get_google_api_key() {
	// echo wp_json_encode( get_option( 'google_api_key' ) );
	wp_send_json_success(get_option( 'google_api_key') );
	// die();
}