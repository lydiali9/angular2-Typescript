var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function(){
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});
// inject public/lib to index.html
/**gulp.task('inject', function() {
    var wiredep = require('wiredep').stream;

    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib'
    }

    return gulp.src('./src/*.html')
                .pipe(wiredep(options))
                .pipe(gulp.dest('./src'));
});*/

// inject css and js to target html
gulp.task('inject', function() {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    var injectSrc = gulp.src(['./public/css/*.css', 
                              './public/js/*.js'], {read: false});
    var injectOptions = {
        ignorePath: '/public'
    };

    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    }

    return gulp.src('./src/*.html')
                .pipe(wiredep(options))
                .pipe(inject(injectSrc, injectOptions))
                .pipe(gulp.dest('./src'));
});


// start server
gulp.task('server', ['style', 'inject'], function() {
    var options = {
        //script: 'src/index.html',
        delayTime: 1,
        env: {
            'PORT': 5000
        },
        watch: jsFiles
    };

    return nodemon(options)
            .on('restart', function(elem) {
                console.log('Restarting......');
            });
});
