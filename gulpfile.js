const gulp = require('gulp'),
	fileinclude = require('gulp-file-include'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cleancss = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	notify = require('gulp-notify');

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'app',
		},
		notify: false,
	});
});

gulp.task('fileinclude', async function () {
	gulp
		.src(['app/pages/*.html'])
		.pipe(
			fileinclude({
				prefix: '@@',
				basepath: '@file',
			}),
		)
		.pipe(gulp.dest('app/'))
		.pipe(
			browserSync.reload({
				stream: true,
			}),
		);
});

gulp.task('styles', function () {
	return gulp
		.src('app/' + 'sass' + '/**/*.' + 'sass' + '')
		.pipe(
			sass({
				outputStyle: 'expanded',
			}).on('error', notify.onError()),
		)
		.pipe(
			rename({
				suffix: '.min',
				prefix: '',
			}),
		)
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(
			cleancss({
				level: {
					1: {
						specialComments: 0,
					},
				},
			}),
		)
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream());
});

gulp.task('scripts', function () {
	return (
		gulp
			.src([
				'app/libs/wnumb/wNumb.min.js',
				'app/libs/nouislider/nouislider.min.js',
				'app/js/main.js',
			])
			.pipe(concat('scripts.min.js'))
			// .pipe(uglify()) // Mifify js (opt.)
			.pipe(gulp.dest('app/js'))
			.pipe(
				browserSync.reload({
					stream: true,
				}),
			)
	);
});

gulp.task('code', function () {
	return gulp.src('app/*.html').pipe(
		browserSync.reload({
			stream: true,
		}),
	);
});

gulp.task('watch', function () {
	gulp.watch(
		['app/' + 'sass' + '/**/*.' + 'sass' + '', 'app/blocks/**/*.sass'],
		gulp.parallel('styles'),
	);
	gulp.watch(['libs/**/*.js', 'app/js/main.js'], gulp.parallel('scripts'));
	gulp.watch(['app/blocks/**/*.html', 'app/pages/**/*.html'], gulp.parallel('fileinclude'));
	gulp.watch('app/*.html', gulp.parallel('code'));
});
gulp.task('default', gulp.parallel('styles', 'scripts', 'fileinclude', 'browser-sync', 'watch'));
