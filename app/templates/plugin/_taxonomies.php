<?php
/**
 * Register your taxonomies.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_taxonomy
 */
if (!class_exists('<%= className %>_Taxonomies')) {
	class <%= className %>_Taxonomies {
		function create_book_tax() {
			$labels = array(
				'name'                       => _x( 'Writers', 'taxonomy general name' ),
				'singular_name'              => _x( 'Writer', 'taxonomy singular name' ),
				'search_items'               => __( 'Search Writers' ),
				'popular_items'              => __( 'Popular Writers' ),
				'all_items'                  => __( 'All Writers' ),
				'parent_item'                => null,
				'parent_item_colon'          => null,
				'edit_item'                  => __( 'Edit Writer' ),
				'update_item'                => __( 'Update Writer' ),
				'add_new_item'               => __( 'Add New Writer' ),
				'new_item_name'              => __( 'New Writer Name' ),
				'separate_items_with_commas' => __( 'Separate writers with commas' ),
				'add_or_remove_items'        => __( 'Add or remove writers' ),
				'choose_from_most_used'      => __( 'Choose from the most used writers' ),
				'not_found'                  => __( 'No writers found.' ),
				'menu_name'                  => __( 'Writers' ),
			);

			$args = array(
				'hierarchical'          => false,
				'labels'                => $labels,
				'show_ui'               => true,
				'show_admin_column'     => true,
				'update_count_callback' => '_update_post_term_count',
				'query_var'             => true,
				'rewrite'               => array( 'slug' => 'writer' ),
			);

			register_taxonomy( 'writer', 'book', $args );
		}
	}
}