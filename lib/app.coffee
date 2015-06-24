define (require) ->
  Application = require 'core/app/application'
  require 'link!style.css'

  class App extends Application