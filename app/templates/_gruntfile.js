module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({

		<% if ( 'less' === preprocessor ) { %>
		less: {
			development: {
				options: {
					paths: ['css']
				},
				files: {
					'css/styles.dev.css' : 'less/styles.less'
				}
			},
			production: {
				options: {
					paths: ['css'],
					cleancss: true
				},
				files: {
					'css/styles.min.css' : 'less/styles.less'
				}
			}
		},
		<% } %>
		<% if ( 'sass' === preprocessor ) { %>
		sass: {
			development: {
				options: {
					style: 'expanded'
				},
				files: {
					'css/styles.dev.css' : 'sass/styles.scss'
				}
			},
			production: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/styles.min.css' : 'sass/styles.scss'
				}
			}
		},
		<% } %>
		<% if ( true === includeJavascript ) { %>
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'js/src/site-scripts.js'
			]
		},
		uglify: {
			development: {
				options: {
					mangle: false,
					compress: false,
					beautify: true
				},
				files: {
					'js/scripts.dev.js': [
						'js/src/public-scripts.js'
					]
				}
			},
			production: {
				options: {
					compress: {
						global_defs: {
							"DEBUG": false
						},
						dead_code: true,
						drop_console: true
					}
				},
				files: {
					'js/scripts.min.js': [
						'js/src/public-scripts.js'
					]
				}
			}
		},
		<% } %>
		watch: {
		<% if ( 'none' !== preprocessor ) { %>
			less: {
				files: [
					'less/*.less'
				],
				tasks: ['less:development'],
				options: {
					spawn: false
				}
			}
		<% } %>
		<% if ( ( true === includeJavascript ) && ( 'none' !== preprocessor ) ) { %>,<% } %>
		<% if ( true === includeJavascript ) { %>
			js: {
				files: [
					'Gruntfile.js',
					'js/src/public-scripts.js'
				],
				tasks: ['uglify:development'],
				options: {
					spawn: false
				}
			}
		<% } %>
		},
		clean: {
			dist: [
				'css/styles.min.css',
				'js/scripts.min.js'
			]
		}
	});

	// Load tasks
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	<% if ( 'less' === preprocessor ) { %>
	grunt.loadNpmTasks('grunt-contrib-less');
	<% } %>
	<% if ( 'sass' === preprocessor ) { %>
	grunt.loadNpmTasks('grunt-contrib-sass');
	<% } %>

	// Register tasks
	grunt.registerTask('default', [
	<% if ( 'less' === preprocessor ) { %>
		'less',
	<% } %>
	<% if ( 'sass' === preprocessor ) { %>
		'sass',
	<% } %>
		'uglify'
	]);
	grunt.registerTask('dev', [
	<% if ( true === includeJavascript ) { %>
		'watch'
	<% } %>
	]);

};