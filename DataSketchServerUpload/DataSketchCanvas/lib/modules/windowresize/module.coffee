define (require) ->
  $ = require 'jquery'
  Module = require 'core/app/module'
  Globals = require 'core/model/globals'
  Event = require 'core/event/event'

  class WindowResize extends Module
    init: () =>
      if window?
        window.addEventListener 'resize', @_onResize

    _onResize: () =>
      Globals.get('Relay').dispatchEvent new Event 'Window.Resize',
        width: $(window).width()
        height: $(window).height() 