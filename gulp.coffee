'use-strict'

# # Gulp Tasks

gulp = require 'gulp'
coffee = require 'gulp-coffee'
sourcemaps = require 'gulp-sourcemaps'
sass = require 'gulp-sass'
changed = require 'gulp-changed'
mocha = require 'gulp-mocha'
docco = require 'gulp-docco'
server = require 'gulp-express'
gutil = require 'gulp-util'
del = require 'del'
minimist = require 'minimist'

SPUB = 'server/public/'

taskPaths =
  coffee:
    src: 'lib/**/*.coffee'
    dest: SPUB + 'cslib/'
  sass:
    src: 'lib/**/*.scss'
    dest: SPUB + 'cslib/'
  thirdparty:
    src: 'lib/thirdparty/**/*'
    dest: SPUB + 'cslib/thirdparty/'
  html:
    src: ['lib/modules/**/*.html', 'lib/modules/**/*.jpg', 'lib/modules/**/*.gif', 'lib/modules/**/*.png']
    dest: SPUB + 'cslib/modules/'
  index:
    src: 'lib/index.html'
    dest: SPUB
  docs:
    src: 'lib/**/*.coffee'
    dest: 'docs/'

# ## Command Line Options

options = minimist process.argv.slice(2),
  default:
    env: process.env.NODE_ENV || 'development'
    port: 3000
    host: "0.0.0.0"
  string: ['env']
  alias:
    port: ['p']
    host: ['h']

gulp.task 'default', ['clean', 'coffee', 'sass', 'html', 'thirdparty', 'index', 'docs']

gulp.task 'clean:coffee', (cb) ->
  del [taskPaths.coffee.dest + "**/*.js", "!#{taskPaths.coffee.dest}/thirdparty/**/*.js"], cb

gulp.task 'clean:sass', (cb) ->
  del [taskPaths.sass.dest + "**/*.css"], cb

gulp.task 'clean:thirdparty', (cb) ->
  del [taskPaths.thirdparty.dest + "**/*.js"], cb

gulp.task 'clean:docs', (cb) ->
  del [taskPaths.docs.dest + "**/*"], cb

gulp.task 'clean', ['clean:coffee', 'clean:sass', 'clean:thirdparty']

gulp.task 'coffee', ['clean:coffee'], () ->
  gulp.src taskPaths.coffee.src
    # .pipe changed taskPaths.coffee.dest
    .pipe sourcemaps.init()
    .pipe coffee().on('error', gutil.log)
    .pipe sourcemaps.write './maps'
    .pipe gulp.dest taskPaths.coffee.dest

gulp.task 'sass', ['clean:sass'], () ->
  gulp.src taskPaths.sass.src
    # .pipe changed taskPaths.sass.dest
    .pipe sourcemaps.init()
    .pipe sass().on('error', (err) ->
      sass.logError(err);
      this.emit('end');
    )
    .pipe sourcemaps.write './maps'
    .pipe gulp.dest taskPaths.sass.dest

gulp.task 'thirdparty', ['clean:thirdparty'], () ->
  gulp.src taskPaths.thirdparty.src
    # .pipe changed taskPaths.thirdparty.dest
    .pipe gulp.dest taskPaths.thirdparty.dest

gulp.task 'html', () ->
  gulp.src taskPaths.html.src
    .pipe gulp.dest taskPaths.html.dest

gulp.task 'index', () ->
  gulp.src taskPaths.index.src
    # .pipe changed taskPaths.index.dest
    .pipe gulp.dest taskPaths.index.dest

gulp.task 'test', () ->
  gulp.src './test/*', {read: false}
    .pipe mocha()

gulp.task 'docs', ['clean:docs'], () ->
  gulp.src taskPaths.docs.src
    .pipe docco({ layout: "parallel" }).on('error', gutil.log)
    .pipe gulp.dest taskPaths.docs.dest

gulp.task 'watch', ['default'], () ->
  gulp.watch taskPaths.coffee.src, ['coffee', 'docs']
  gulp.watch taskPaths.sass.src, ['sass']
  gulp.watch taskPaths.thirdparty.src, ['thirdparty']
  gulp.watch taskPaths.index.src, ['index']
  gulp.watch taskPaths.html.src, ['html']

gulp.task 'up', () ->
  opts =
    cwd: undefined
    env: process.env
  opts.env.NODE_ENV = options.env
  opts.env.PORT = options.port
  opts.env.HOST = options.host
  server.run ['./server/server.js'], opts, false

gulp.task 'dev_start', ['watch', 'up']