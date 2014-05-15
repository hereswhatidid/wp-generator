<?php
/*
Plugin Name: <%= moduleName %>
Description: <%= description %>
Version:     <%= version %>
Author:      <%= author %>
Author URI:  <%= authorURL %>
*/
<% if ( true === includeShortcodes ) { %>
include( 'inc/shortcodes.php' );
<% } %>
<% if ( true === includePostTypes ) { %>
include( 'inc/posttypes.php' );
<% } %>
<% if ( true === includeWidgets ) { %>
include( 'inc/widgets.php' );
<% } %>
<% if ( true === includeTaxonomies ) { %>
include( 'inc/taxonomies.php' );
<% } %>

if ( ! class_exists( '<%= className %>_Plugin' ) ) {
	class <%= className %>_Plugin {

		private $script_mode = 'min';

		function __construct() {
			<% if ( true === includeShortcodes ) { %>
			self::init_shortcodes();
			<% } %>
			<% if ( true === includePostTypes ) { %>
			self::init_posttypes();
			<% } %>
			<% if ( true === includeTaxonomies ) { %>
			self::init_taxonomies();
			<% } %>

			if ( defined( 'SCRIPT_DEBUG' ) && ( true === SCRIPT_DEBUG ) ) {
				$this->script_mode = 'dev';
			}

			<% if ( ( true === includeJavascript ) || ( 'none' !== preprocessor ) ) { %>
			add_action( 'wp_enqueue_scripts', array( $this, 'init_public_media' ) );
			add_action( 'admin_enqueue_scripts', array( $this, 'init_admin_media' ) );
			<% } %>
			<% if ( true === includeWidgets ) { %>
			add_action( 'widgets_init', array( $this, 'register_widgets' ) );
			<% } %>

		}
		<% if ( true === includeWidgets ) { %>
		/**
		*	Register custom widgets
		*/
		public function register_widgets() {
			register_widget( 'Foo_Widget' );
		}
		<% } %>
		<% if ( true === includeTaxonomies ) { %>
		/**
		*	Initialize custom taxonomies
		*/
		public function init_taxonomies() {
			add_action( 'init', array( '<%= className %>_Taxonomies', 'initialize' ) );
		}
		<% } %>
		<% if ( true === includePostTypes ) { %>
		/**
		*	Initialize custom post types
		*/
		public function init_posttypes() {
			add_action( 'init', array( '<%= className %>_PostTypes', 'initialize' ) );
		}
		<% } %>
		<% if ( true === includeShortcodes ) { %>
		/**
		*	Initialize shortcodes
		*/
		private function init_shortcodes() {
			add_shortcode( 'button', array( '<%= className %>_Shortcodes', 'button' ) );
		}
		<% } %>

		public function init_public_media() {
			<% if ( true === includeJavascript ) { %>
				wp_enqueue_script( '<%= safeName %>-public-scripts', plugins_url( 'js/scripts.' . $this->script_mode . '.js', __FILE__ ), array(), '<%= version %>' );
			<% } %>
			<% if ( 'none' !== preprocessor ) { %>
				wp_enqueue_style( '<%= safeName %>-public-styles', plugins_url( 'css/styles.' . $this->script_mode . '.css', __FILE__ ), array(), '<%= version %>' );
			<% } %>

		}

		public function init_admin_media() {
			<% if ( true === includeJavascript ) { %>
			wp_enqueue_script( '<%= safeName %>-admin-scripts', plugins_url( 'js/scripts.' . $this->script_mode . '.js', __FILE__ ), array(), '<%= version %>' );
			<% } %>
			<% if ( 'none' !== preprocessor ) { %>
			wp_enqueue_style( '<%= safeName %>-admin-styles', plugins_url( 'css/styles.' . $this->script_mode . '.css', __FILE__ ), array(), '<%= version %>' );
			<% } %>
		}
	}
}

if ( ! isset( $<%= className %>_Plugin ) && function_exists( 'add_action' ) ) {
	$<%= className %>_Plugin = new <%= className %>_Plugin();
}