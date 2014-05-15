'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var fs = require('fs');


var WordpressGenerator = yeoman.generators.Base.extend({
	init: function () {
		this.pkg = require('../package.json');

		var data;
		try {
			data = fs.readFileSync( path.resolve(__dirname,	'../defaults.json') );
			this.defaults = JSON.parse( data );
		} catch (e) {
			this.defaults = {
				"moduleType": "plugin",
				"version": "0.1.0",
				"description": "This is a custom plugin/theme.",
				"author": "Author Name",
				"email": "test@email.com",
				"authorURL": "http://google.com",
				"preprocessor": "less",
				"includeJavascript": true,
				"includeWidgets": true,
				"includeShortcodes": true,
				"includePostTypes": true,
				"includeTaxonomies": true
			}

		}

		this.on('end', function () {
			this.installDependencies({
				skipInstall: this.options['skip-install'],
				callback: function () {
					this.spawnCommand('grunt', ['default']);
				}.bind(this) // bind the callback to the parent scope
			});
		});
	},

	askFor: function () {
		var done = this.async();

		// have Yeoman greet the user
		this.log(this.yeoman);

		// replace it with a short and sweet description of your generator
		this.log(chalk.magenta('Welcome to the WordPress generator.'));

		var prompts = [
			{
				type: 'list',
				name: 'moduleType',
				message: 'What are you creating?',
				choices: [
					{
						'key': 'p',
						'value': 'plugin',
						'name': 'Plugin'
					},
					{
						'key': 't',
						'value': 'theme',
						'name': 'Theme'
					}
				],
				default: this.defaults.moduleType
			},
			{
				when: function (response) {
					return ( 'plugin' === response.moduleType );
				},
				type: 'input',
				name: 'moduleName',
				message: 'What is the name of this Plugin?',
				default: 'My Plugin'
			},
			{
				when: function (response) {
					return ( 'theme' === response.moduleType );
				},
				type: 'input',
				name: 'moduleName',
				message: 'What is the name of this Theme?',
				default: 'My Theme'
			},
			{
				when: function (response) {
					return ( 'plugin' === response.moduleType );
				},
				type: 'input',
				name: 'moduleURL',
				message: 'What is the URL for this Plugin?',
				default: 'http://mysite.com/plugin/'
			},
			{
				when: function (response) {
					return ( 'theme' === response.moduleType );
				},
				type: 'input',
				name: 'moduleURL',
				message: 'What is the URL for this Theme?',
				default: 'http://mysite.com/theme/'
			},
			{
				type: 'input',
				name: 'textDomain',
				message: 'What is the Text Domain string?',
				default: function (response) {
					return response.moduleName.replace(/\s+/g, '-').toLowerCase();
				}
			},
			{
				type: 'input',
				name: 'version',
				message: 'Version?',
				default: this.defaults.version
			},
			{
				type: 'input',
				name: 'description',
				message: 'Description?',
				default: function (response) {
					if ('plugin' === response.moduleType) {
						return 'This is a plugin.';
					} else {
						return 'This is a theme.';
					}
				},
			},
			{
				type: 'input',
				name: 'author',
				message: 'Author name?',
				default: this.defaults.author
			},
			{
				type: 'input',
				name: 'email',
				message: 'Author email?',
				default: this.defaults.email
			},
			{
				type: 'input',
				name: 'authorURL',
				message: 'Author URL?',
				default: this.defaults.authorURL
			},
			{
				type: 'list',
				name: 'preprocessor',
				message: 'What preprocessor do you need?',
				choices: [
					{
						'key': 'l',
						'value': 'less',
						'name': 'LESS'
					},
					{
						'key': 's',
						'value': 'sass',
						'name': 'SASS'
					},
					{
						'key': 'n',
						'value': 'none',
						'name': 'None'
					}
				],
				default: 0
			},
			{
				type: 'confirm',
				name: 'includeJavascript',
				message: 'Is JavaScript utilized?',
				default: this.defaults.includeJavascript
			},
			{
				type: 'confirm',
				name: 'advancedOptions',
				message: 'Use advanced options?',
				default: false
			},
			{
				when: function( response ) {
					return response.advancedOptions;
				},
				type: 'confirm',
				name: 'includeWidgets',
				message: 'Include Widgets code?',
				default: this.defaults.includeWidgets
			},
			{
				when: function( response ) {
					return response.advancedOptions;
				},
				type: 'confirm',
				name: 'includeShortcodes',
				message: 'Include Shortcodes code?',
				default: this.defaults.includeShortcodes
			},
			{
				when: function( response ) {
					return response.advancedOptions;
				},
				type: 'confirm',
				name: 'includePostTypes',
				message: 'Include Post Types code?',
				default: this.defaults.includePostTypes
			},
			{
				when: function( response ) {
					return response.advancedOptions;
				},
				type: 'confirm',
				name: 'includeTaxonomies',
				message: 'Include Taxonomies code?',
				default: this.defaults.includeTaxonomies
			},
			{
				type: 'confirm',
				name: 'saveConfiguration',
				message: 'Save this configuration as your default?',
				default: false
			}
		];

		this.prompt(prompts, function (props) {
			this.moduleType = props.moduleType;
			this.moduleName = props.moduleName;

			this.className = props.moduleName.replace(/[0-9]/g, '').replace(/ /g, "_");
			this.safeName = props.moduleName.replace(/[0-9]/g, '').replace(/ /g, "-").toLowerCase();

			this.textDomain = props.textDomain;
			this.version = props.version;
			this.description = props.description;
			this.author = props.author;
			this.email = props.email;
			this.authorURL = props.authorURL;
			this.preprocessor = props.preprocessor;
			this.includeJavascript = props.includeJavascript;
			this.includeBootstrap = props.includeBootstrap;
			this.saveConfiguration = props.saveConfiguration;
			this.includeWidgets = props.includeWidgets;
			this.includeShortcodes = props.includeShortcodes;
			this.includePostTypes = props.includePostTypes;
			this.includeTaxonomies = props.includeTaxonomies;

			done();
		}.bind(this));
	},

	app: function () {
		if ( ( false !== this.includeJavascript ) || ( 'none' !== this.preprocessor ) ) {
			this.copy('_gruntfile.js', 'gruntfile.js');
		}
		this.copy('_package.json', 'package.json');

	},

	updateConfiguration: function() {
		if ( true === this.saveConfiguration ) {
			var configJSON = {
				"moduleType": this.moduleType,
				"moduleName": this.moduleName,
				"className": this.className,
				"safeName": this.safeName,
				"textDomain": this.textDomain,
				"version": this.version,
				"description": this.description,
				"author": this.author,
				"email": this.email,
				"authorURL": this.authorURL,
				"preprocessor": this.preprocessor,
				"includeJavascript": this.includeJavascript,
				"includeWidgets": this.includeWidgets,
				"includeShortcodes": this.includeShortcodes,
				"includePostTypes": this.includePostTypes,
				"includeTaxonomies": this.includeTaxonomies
			};
			fs.writeFileSync( path.resolve(__dirname,	'../defaults.json'), JSON.stringify( configJSON, null, '\t' ) );
		}
	},

	projectfiles: function () {
		switch (this.preprocessor) {
			case 'less':
				this.mkdir('less');
				break;
			case 'sass':
				this.mkdir('sass');
				break;
		}

		if ( 'none' !== this.preprocessor ) {
			this.mkdir('css');
		}

		if (this.moduleType === 'theme') {
			this.mkdir('img');
			this.copy('_style.css', 'style.css');
		} else {
			this.mkdir( 'inc' );
			if ( true === this.includeShortcodes ) {
				this.copy('plugin/_shortcodes.php', 'inc/shortcodes.php' );
			}
			if ( true === this.includePostTypes ) {
				this.copy('plugin/_posttypes.php', 'inc/posttypes.php' );
			}
			if ( true === this.includeWidgets ) {
				this.copy('plugin/_widgets.php', 'inc/widgets.php' );
			}
			if ( true === this.includeTaxonomies ) {
				this.copy('plugin/_taxonomies.php', 'inc/taxonomies.php' );
			}
			this.copy('plugin/_plugin.php', this.safeName + '.php' );
		}

		if (this.includeJavascript) {
			this.mkdir('js');
			this.mkdir('js/src');
			this.copy('_scripts.js','js/src/public-scripts.js');
			this.copy('_scripts.js','js/src/admin-scripts.js');
		}

		this.copy('editorconfig', '.editorconfig');
		this.copy('jshintrc', '.jshintrc');
		if ( this.includeBootstrap ) {
			this.mkdir('less/vendor');
			var self = this;
			this.remote('twbs', 'bootstrap', 'master', function(err, remote) {
				if ( err ) {

					self.log( 'There was an error! ',  err );
				} else {
					self.log( 'No errors!', remote.cachePath );
					remote.directory('less/**', 'less/vendor');
				}
			});
		}
	}
});

module.exports = WordpressGenerator;