define (require) ->
  Application = require 'core/app/application'
  HM = require 'core/event/hook_manager'
  Globals = require 'core/model/globals'

  DSCanvas = require 'modules/datasketch/canvas/module'
  DSTools = require 'modules/datasketch/tools/module'
  DSModeTools = require 'modules/datasketch/tools/mode/module'
  DSStrokeTools = require 'modules/datasketch/tools/stroke/module'
  #Include the module of an shape.
  DSShapeTools = require 'modules/datasketch/tools/shapes/module'
  #Include the module of an snaptogrid mechanism.
  DSSnapGridTools = require 'modules/datasketch/tools/snaptogrid/module'
  DSsavecanvasTools = require 'modules/datasketch/tools/savecanvas/module'
  DSLoadInputTools = require 'modules/datasketch/tools/LoadFile/module'
  #Include the module of an MarkAsCenter mechanism.
  DSMarkAsOriginTools = require 'modules/datasketch/tools/markasorigin/module'  
  DSNewFileTools = require 'modules/datasketch/tools/newfile/module'  
  DSLoadSaveTools = require 'modules/datasketch/tools/LoadSave/module'  
  DSColorTools = require 'modules/datasketch/tools/color/module'
  DScalibrationandmanipulationTools = require 'modules/datasketch/tools/calibrationandmanipulation/module'
  DSTrashTool = require 'modules/datasketch/tools/trash/module'
  DSObjectOverlayTool = require 'modules/datasketch/tools/objectoverlay/module'
  WindowResize = require 'modules/windowresize/module'
  KeyboardShortcuts = require 'modules/datasketch/keyboard_shortcuts/module'

  ContextMenu = require 'modules/datasketch/contextmenu/module'
  ObjectProperty = require 'modules/datasketch/objectproperty/module'  
  GroupMenuItem = require 'modules/datasketch/menuitems/group'
  DuplicateMenuItem = require 'modules/datasketch/menuitems/duplicate'
  DeleteMenuItem = require 'modules/datasketch/menuitems/delete'
  IsolateMenuItem = require 'modules/datasketch/menuitems/isolate'
  MapMenuItem = require 'modules/datasketch/menuitems/map'
  ObjectSummaryMenu = require 'modules/datasketch/menuitems/objectsummary'  

  DSData = require 'modules/datasketch/data/module'
  Animation = require 'modules/datasketch/animation/module'
  Modal = require 'modules/modal/module'

  require 'link!./style.css'
  require 'link!thirdparty/bootstrap.css'
  #require 'link!thirdparty/font-awesome.min.css'
  require 'thirdparty/bootstrap3'

  class Main extends Application
    constructor: (domRoot) ->
      super domRoot      
      # window.APIURL = 'http://192.168.1.172/DataSketch.Web/SketchMaster/'  
      # # if window.location.host.includes("localhost")
      # # else
      window.APIURL = 'http://180.211.103.172:8070/SketchMaster/'
      if window.parent && window.parent.getCurrentUserId
         window.currentUserId = parent.getCurrentUserId();
      HM.hook 'Application.Modules', (set) ->
        set.add DSCanvas
        set.add WindowResize
        #Add the shape tool on canvas
        set.add DSShapeTools
        #Add the MarkAsCenter tool on canvas
        set.add DSMarkAsOriginTools 
        #Add the snaptogrid tool on canvas
        set.add DSSnapGridTools
        set.add DSTools
        set.add DSModeTools
        set.add DSLoadInputTools
        set.add DSStrokeTools        
        set.add DSColorTools
        set.add DScalibrationandmanipulationTools
        set.add DSsavecanvasTools
        set.add DSLoadSaveTools
        set.add DSNewFileTools
        set.add DSTrashTool
        set.add DSObjectOverlayTool
        set.add KeyboardShortcuts
        set.add ContextMenu
        set.add ObjectProperty
        set.add ObjectSummaryMenu

        set.add GroupMenuItem
        set.add IsolateMenuItem
        set.add DuplicateMenuItem
        set.add MapMenuItem
        set.add DeleteMenuItem

        set.add DSData
        set.add Animation
        set.add Modal
