<?php
/**
 * Plugin Name:       Wp Quote Blocks
 * Description:       A plugin that allows you create elegant Quote blocks at ease.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wp-quote-blocks
 *
 * @package           wp-quote-blocks
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
	foreach ( $blocks as $block ) {
		$font_family = $block['attrs']['fontFamily'];
		$font_weight = $block['attrs']['fontWeight'];
		$font_weight = ! empty( $font_weight ) ? $font_weight : '';
		?>
		<script type="text/javascript">
			document.addEventListener("DOMContentLoaded", () => {
				if ( "" !== "<?php echo ! empty( $font_family ) ? $font_family : ''; // phpcs:ignore WordPress.Security.EscapeOutput ?>" ) {
					let url = `https://fonts.googleapis.com/css?family=<?php echo $block['attrs']['fontFamily']; // phpcs:ignore WordPress.Security.EscapeOutput ?>`;
					if ( "" !== "<?php echo $font_weight; // phpcs:ignore WordPress.Security.EscapeOutput ?> " ) {
						url += ":<?php echo $font_weight; // phpcs:ignore WordPress.Security.EscapeOutput ?>";
					}
					url += '&display=swap';

					document.body.insertAdjacentHTML( 'beforebegin', `<link rel='stylesheet' id='google-fonts-css'  href='${url}' type='text/css' media='all' />`);
				}
			});
		</script>
		<?php
	}
}
add_action( 'wp_enqueue_scripts', 'wp_quote_blocks_custom_script' );

function wpqb_register_settings() {
	register_setting( 'wpqb_plugin_options_group', 'google_api_key' );
}

add_action( 'admin_init', 'wpqb_register_settings' );

function wpqb_admin_menus() {
	add_menu_page(
		__( 'WP Quote Blocks settings', 'wp-quote-blocks' ),
		__( 'WP Quote Blocks settings', 'wp-quote-blocks' ),
		'manage_options',
		'/wp-quote-blocks-settings.php',
		'wpqb_page_html_form',
		''
	);
}

add_action( 'admin_menu', 'wpqb_admin_menus' );

function wpqb_page_html_form() {
	?>
	<div class="wrap">
		<h2>WP Quote Blocks Settings</h2>
		<form method="post" action="options.php">
			<?php settings_fields( 'wpqb_plugin_options_group' ); ?>
		<table class="form-table">
			<tr>
				<th><label for="google_api_key">Google API key:</label></th>
				<td>
					<input type = 'text' class="regular-text" id="google_api_key" name="google_api_key" value="<?php echo esc_attr( get_option( 'google_api_key' ) ); ?>">
				</td>
			</tr>
		</table>
		<?php submit_button(); ?>
	</div>
<?php } ?>

<?php
add_action( 'wp_ajax_get_google_api_key', 'wpqb_get_google_api_key' );

function wpqb_get_google_api_key() {
	if ( ! isset( $_POST['_wpnonce'] ) || ! wp_verify_nonce( $_POST['_wpnonce'], 'wpqb_nonce' ) ) {
		die( 'Unauthorized!' );
	}
	wp_send_json_success( get_option( 'google_api_key' ) );
}

function enqueue_block_assets() {
	wp_enqueue_script(
		'wpqb-script',
		plugins_url( 'edit.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-api' ),
		null
	);

	wp_localize_script(
		'wpqb-script',
		'wpqbVars',
		array(
			'nonce' => wp_create_nonce( 'wpqb_nonce' ),
		)
	);
}

add_action( 'enqueue_block_editor_assets', 'enqueue_block_assets' );
