define (require) ->
  Application = require 'core/app/application'
  HM = require 'core/event/hook_manager'
  Globals = require 'core/model/globals'

  DSCanvas = require 'modules/datasketch/canvas/module'
  DSTools = require 'modules/datasketch/tools/module'
  DSModeTools = require 'modules/datasketch/tools/mode/module'
  DSStrokeTools = require 'modules/datasketch/tools/stroke/module'
  DSColorTools = require 'modules/datasketch/tools/color/module'
  WindowResize = require 'modules/windowresize/module'

  require 'link!./style.css'

  class Main extends Application
    constructor: (domRoot) ->
      super domRoot

      HM.hook 'Application.Modules', (set) ->
        set.add DSCanvas
        set.add WindowResize
        set.add DSTools
        set.add DSModeTools
        set.add DSStrokeTools
        set.add DSColorTools