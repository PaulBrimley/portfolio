var autoprefixer = require('gulp-autoprefixer');
var babel        = require('gulp-babel');
var babelify     = require('babelify');
var browserify   = require('browserify');
var concat       = require('gulp-concat');
var eslint       = require('gulp-eslint');
var filter       = require('gulp-filter');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var minifyCss    = require('gulp-clean-css');
var nodemon      = require('gulp-nodemon');
var notify       = require('gulp-notify');
var plumber      = require('gulp-plumber');
var rename       = require('gulp-rename');
var sass         = require('gulp-sass');
var source       = require('vinyl-source-stream');
var sourcemaps   = require('gulp-sourcemaps');
var webpack      = require('gulp-webpack');

var onError = function(err) {
  notify.onError({
    title:    "Error",
    message:  "<%= error %>",
  })(err);
  this.emit('end');
};

var plumberOptions = {
  errorHandler: onError,
};

var jsFiles = {
  vendor: [
    'core/app'
  ],
  source: [
    'core/app/index.jsx',
    'core/app/**/*.jsx',
    'core/app/**/*.js'
  ]
};

/*gulp.task('concat', ['eslint'], function() {
  return gulp.src(jsFiles.vendor.concat(jsFiles.source))
    .pipe(sourcemaps.init())
    .pipe(babel({
      plugins: ['transform-react-jsx']
    }))
    .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/assets/js'));
});*/

gulp.task('concatSass', function() {
  return gulp.src('core/sass/**/*.scss')
    .pipe(concat('index.scss'))
    .pipe(gulp.dest('core/sass'))
});

// Lint JS/JSX files
gulp.task('eslint', function() {
  return gulp.src(jsFiles.source)
    .pipe(eslint({
      "parserOptions": {
          "ecmaFeatures": {
              "jsx": true,
              "modules": true
          }
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Compile Sass to CSS
gulp.task('sass', ['concatSass'], function() {
  var autoprefixerOptions = {
    browsers: ['last 2 versions'],
  };
  var filterOptions = '**/*.css';
  var sassOptions = {
    includePaths: [

    ]
  };
  return gulp.src('core/sass/index.scss')
    .pipe(plumber(plumberOptions))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(minifyCss())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/assets/css'))
    .pipe(filter(filterOptions));
});

gulp.task('start', function () {
  nodemon({
    script: 'core/server/index.js',
    ext: 'js',
    env: { 'NODE_ENV': 'development' }
  })
})


gulp.task('webpack', ['eslint'], function() {
  return gulp.src('core/app/index.jsx')
    .pipe(sourcemaps.init())
    .pipe(webpack({
      module: {
        loaders: [
          {
            test: /(\.jsx$|\.js$)/,
            exclude: /(node_modules|server)/,
            loaders: ["babel-loader"]
          }
        ]
      },
      output: {
        filename: 'bundle.js',
      },
      resolve: {
        extensions: [
          "", ".js", ".jsx"
        ]
      }, 
      devtool:"inline-source-map"
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/assets/js'));
})

// Watch JS/JSX and Sass files
gulp.task('watch', function() {
  gulp.watch('core/app/**/*.{js,jsx}', ['webpack']);
  gulp.watch('core/sass/**/*.scss', ['sass']);
});

gulp.task('build', ['sass', 'webpack']);
gulp.task('default', ['build', 'watch', 'start']);