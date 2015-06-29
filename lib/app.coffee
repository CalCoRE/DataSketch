define (require) ->
  Application = require 'core/app/application'
  HM = require 'core/event/hook_manager'

  DSCanvas = require 'modules/datasketch/canvas/module'
  WindowResize = require 'modules/windowresize/module'

  require 'link!./style.css'

  class Main extends Application
    constructor: (domRoot) ->
      super domRoot

      HM.hook 'Application.Modules', (set) ->
        set.add DSCanvas
        set.add WindowResize