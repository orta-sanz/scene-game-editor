var gulp        = require('gulp'),
	nib         = require('nib'),
	notify      = require('gulp-notify'),
	browserify  = require('gulp-browserify'),
	stylus      = require('gulp-stylus'),
	livereload  = require('gulp-livereload');

var watch = {
	js  : './assets/**/*.js',
	styl: './assets/**/*.styl'
};

var dest = {
	js : './www/js',
	css: './www/css'
};

gulp.task('scripts', function() {
	return gulp.src('./assets/main.js')
		.pipe(browserify({
			insertGlobals: true,
			transform: ['hbsfy']
		}))
		.pipe(gulp.dest(dest.js))
		.pipe(livereload())
		.pipe(notify({
			onLast  : true,
			title   : 'Scripts',
			message : 'Generados'
		}));
});

gulp.task('stylus', function() {
	return gulp.src('./assets/main.styl')
		.pipe(stylus({
			use           : [nib()],
			errors        : true,
			'include css' : true
		}))
		.pipe(gulp.dest(dest.css))
		.pipe(livereload())
		.pipe(notify({
			onLast   : true,
			title    : 'Style',
			message  : 'Generados'
		}));
});

gulp.task('default', function() {
	livereload.listen();
	gulp.watch(watch.js, ['scripts']);
	gulp.watch(watch.styl, ['stylus']);
});