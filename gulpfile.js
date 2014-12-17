var gulp = require( 'gulp' ),
	sass = require( 'gulp-ruby-sass' ),
	plumber = require( 'gulp-plumber' ),
	livereload = require( 'gulp-livereload' ),
	filter = require( 'gulp-filter' ),
	imagemin = require( 'gulp-imagemin' ),
	concat = require( 'gulp-concat' ),
	prettify = require( 'gulp-prettify' ),
	html_replace = require( 'gulp-html-replace' ),
	uglify = require( 'gulp-uglify' ),
	svg_sprites = require( 'gulp-svg-sprites' ),
	autoprefixer = require( 'gulp-autoprefixer' );

var plumber_config = {
	errorHandler: function (err) {
		console.log(err.toString());
		this.emit('end');
	}
};

var imagemin_config = {
	progressive: true
};

/*
SVG sprite
 */
gulp.task( 'svg_sprite', function() {
	return gulp.src( 'src/svg_sprite/*.svg' )
		.pipe( plumber( plumber_config ) )
		.pipe( imagemin( imagemin_config ) )
		.pipe( svg_sprites( {
			cssFile: 'src/css/_svg_sprite.scss',
			svgPath: '../images/svg_sprite.svg',
			svg: {
				sprite: 'dist/images/svg_sprite.svg'
			},
			padding: 10,
			preview: false,
			templates: {
				css: require("fs").readFileSync("./src/svg_sprite/template.tmpl", "utf-8")
			}

		} ) )
		.pipe( gulp.dest( '' ) );
} );
gulp.task( 'svg_watch', function(){
	gulp.watch( 'src/svg_sprite/**/*', [ 'sass' ] );
} );

/*
CSS
*/
var css = function() {
	return gulp.src( 'src/css/**/*.scss', { base: 'src/css' } )
		.pipe( plumber( plumber_config ) )
		.pipe( sass( {
			style: 'compressed'
		} ) )
		.pipe( filter( [ '*', '!**/*.map' ] ) )
		.pipe( autoprefixer() )
		.pipe( gulp.dest( 'dist/css' ) );
};
gulp.task( 'sass', ['svg_sprite'], css );
gulp.task( 'sass_wo_sprite', css );
gulp.task( 'sass_watch', function(){
	gulp.watch( 'src/css/**/*', ['sass_wo_sprite'] );
} );


/*
Images
 */
gulp.task( 'images', function() {
	return gulp.src( 'src/images/**/*', { base: 'src/images' } )
		.pipe( plumber( plumber_config ) )
		.pipe( imagemin( imagemin_config ) )
		.pipe( gulp.dest( 'dist/images' ) );
} );
gulp.task( 'images_watch', function(){
	gulp.watch( 'src/images/**/*', [ 'images' ] );
} );


/*
Livereload
 */
gulp.task( 'livereload', function() {
	livereload.listen();
	gulp.watch( [ 'dist/**/*', 'src/*.html' ], function( evt ){
		livereload.changed( evt.path );
	} );
} );


/*
JS
 */
gulp.task( 'js', function () {
	var html = require( 'fs' ).readFileSync( 'src/index.html', { encoding: 'utf-8' } );
	var js_block = /<!-- build:js -->([\s\S]*)<!-- endbuild -->/g.exec( html )[1];
	var files = [];
	var match;
	var re = /src="(.+?)"/g;

	while( match = re.exec( js_block ) ) {
		files.push( 'src/' + match[1] );
	}

	return gulp.src( files )
		.pipe( plumber( plumber_config ) )
		.pipe( concat( 'layout.js', {newLine: ';'} ) )
		.pipe( uglify() )
		.pipe( gulp.dest( 'dist/js' ) );
} );


/*
HTML
 */
gulp.task( 'html', function(){
	return gulp.src( 'src/index.html' )
		.pipe( plumber( plumber_config ) )
		.pipe( html_replace( {
			js: 'js/layout.js',
			css: 'css/layout.css'
		} ) )
		.pipe( prettify() )
		.pipe( gulp.dest( 'dist' ) );
} );


/*
Tasks
 */

gulp.task( 'dev', [ 'sass_watch', 'livereload', 'svg_watch', 'images_watch' ] );
gulp.task( 'default', [ 'sass', 'images', 'js', 'html' ] );