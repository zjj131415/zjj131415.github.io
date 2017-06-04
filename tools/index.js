//load plugins ======== create zjj ;
const
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    util = require('gulp-util'),
    notify = require('gulp-notify'),
    autoPrefixer = require('gulp-autoprefixer'),
    argv = require('optimist').argv,
    plumber = require('gulp-plumber'),
    path = require('path');

let basePath = path.resolve(__dirname, '..');

gulp.task('sass', cd => (
    gulp.src(path.resolve(basePath, 'src', 'styles', 'index.scss'))
        .pipe(plumber())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoPrefixer({browsers: ['last 50 versions']}))
        .pipe(gulp.dest(path.resolve(basePath, 'dist')))
        .pipe(gulp.dest(path.resolve(basePath, 'src')))
        .pipe(notify("Found file: <%= file.relative %>!"))
        .on("error", notify.onError(function (error) {
            return "Message to the notifier: " + error.message;
        }))
));

gulp.task('watch', function(){
    gulp.watch(path.join(basePath, 'src', 'styles', '**'), ['sass'])
});


gulp.task('default', argv.watch && ['watch']);