var gulp = require( 'gulp' ),
	sass = require( 'gulp-ruby-sass' ),
	plumber = require( 'gulp-plumber' ),
	livereload = require( 'gulp-livereload' ),
	filter = require( 'gulp-filter' ),
	autoprefixer = require( 'gulp-autoprefixer' );

var plumber_config = {
	errorHandler: function (err) {
		console.log(err.toString());
		this.emit('end');
	}
};

/*
CSS
*/
gulp.task( 'sass', function() {
	return gulp.src( 'src/css/**/*.scss', { base: 'src/css' } )
		.pipe( plumber( plumber_config ) )
		.pipe( sass( {

		} ) )
		.pipe( filter( [ '*', '!**/*.map' ] ) )
		.pipe( autoprefixer() )
		.pipe( gulp.dest( 'dist/css' ) );
} );

gulp.task( 'sass_watch', function(){
	gulp.watch( 'src/css/**/*', ['sass'] );
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

gulp.task( 'dev', ['sass_watch', 'livereload'] );