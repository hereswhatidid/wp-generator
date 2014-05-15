<?php
if ( ! class_exists( '<%= className %>_Shortcodes' ) ) {
	class <%= className %>_Shortcodes {
		/**
		 * Creates a styled button with optional URL and Target parameters
		 *
		 * @param        $atts        Shortcode attributes (URL and Target)
		 * @param string $content     The content within the shortcode start and end tags
		 *
		 * @return string    Formatted HTML output
		 */
		public function button( $atts, $content = '' ) {
			extract( shortcode_atts( array(
				'url' => '',
				'target' => '_self',
				'align' => '',
				'color' => 'orange'
			), $atts, 'button' ) );

			if ( '' !== $url ) {
				$output = sprintf( '<a class="button-%s %s" href="%s" target="%s">%s</a>', esc_attr( $color ), esc_attr( $align ), esc_url( $url ), esc_attr( $target ), esc_html( $content ) );
			} else {
				$output = sprintf( '<span class="button">%s</span>', esc_html( $content ) );
			}

			return $output;
		}
	}
}