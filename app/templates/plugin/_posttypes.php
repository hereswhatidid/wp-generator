<?php
/**
 * Register a book post type.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_post_type
 */
if (!class_exists('<%= className %>_PostTypes')) {
	class <%= className %>_PostTypes {
		function create_book_posttype() {
			$labels = array(
				'name'               => _x( 'Books', 'post type general name', '<%= textDomain %>' ),
				'singular_name'      => _x( 'Book', 'post type singular name', '<%= textDomain %>' ),
				'menu_name'          => _x( 'Books', 'admin menu', '<%= textDomain %>' ),
				'name_admin_bar'     => _x( 'Book', 'add new on admin bar', '<%= textDomain %>' ),
				'add_new'            => _x( 'Add New', 'book', '<%= textDomain %>' ),
				'add_new_item'       => __( 'Add New Book', '<%= textDomain %>' ),
				'new_item'           => __( 'New Book', '<%= textDomain %>' ),
				'edit_item'          => __( 'Edit Book', '<%= textDomain %>' ),
				'view_item'          => __( 'View Book', '<%= textDomain %>' ),
				'all_items'          => __( 'All Books', '<%= textDomain %>' ),
				'search_items'       => __( 'Search Books', '<%= textDomain %>' ),
				'parent_item_colon'  => __( 'Parent Books:', '<%= textDomain %>' ),
				'not_found'          => __( 'No books found.', '<%= textDomain %>' ),
				'not_found_in_trash' => __( 'No books found in Trash.', '<%= textDomain %>' ),
			);

			$args = array(
				'labels'             => $labels,
				'public'             => true,
				'publicly_queryable' => true,
				'show_ui'            => true,
				'show_in_menu'       => true,
				'query_var'          => true,
				'rewrite'            => array( 'slug' => 'book' ),
				'capability_type'    => 'post',
				'has_archive'        => true,
				'hierarchical'       => false,
				'menu_position'      => null,
				'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' )
			);

			register_post_type( 'book', $args );
		}
	}
}