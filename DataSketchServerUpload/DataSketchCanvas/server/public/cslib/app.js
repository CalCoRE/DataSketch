(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Animation, Application, ContextMenu, DSCanvas, DSColorTools, DSData, DSLoadInputTools, DSLoadSaveTools, DSMarkAsOriginTools, DSModeTools, DSNewFileTools, DSObjectOverlayTool, DSShapeTools, DSSnapGridTools, DSStrokeTools, DSTools, DSTrashTool, DScalibrationandmanipulationTools, DSsavecanvasTools, DeleteMenuItem, DuplicateMenuItem, Globals, GroupMenuItem, HM, IsolateMenuItem, KeyboardShortcuts, Main, MapMenuItem, Modal, ObjectProperty, ObjectSummaryMenu, WindowResize;
    Application = require('core/app/application');
    HM = require('core/event/hook_manager');
    Globals = require('core/model/globals');
    DSCanvas = require('modules/datasketch/canvas/module');
    DSTools = require('modules/datasketch/tools/module');
    DSModeTools = require('modules/datasketch/tools/mode/module');
    DSStrokeTools = require('modules/datasketch/tools/stroke/module');
    DSShapeTools = require('modules/datasketch/tools/shapes/module');
    DSSnapGridTools = require('modules/datasketch/tools/snaptogrid/module');
    DSsavecanvasTools = require('modules/datasketch/tools/savecanvas/module');
    DSLoadInputTools = require('modules/datasketch/tools/LoadFile/module');
    DSMarkAsOriginTools = require('modules/datasketch/tools/markasorigin/module');
    DSNewFileTools = require('modules/datasketch/tools/newfile/module');
    DSLoadSaveTools = require('modules/datasketch/tools/LoadSave/module');
    DSColorTools = require('modules/datasketch/tools/color/module');
    DScalibrationandmanipulationTools = require('modules/datasketch/tools/calibrationandmanipulation/module');
    DSTrashTool = require('modules/datasketch/tools/trash/module');
    DSObjectOverlayTool = require('modules/datasketch/tools/objectoverlay/module');
    WindowResize = require('modules/windowresize/module');
    KeyboardShortcuts = require('modules/datasketch/keyboard_shortcuts/module');
    ContextMenu = require('modules/datasketch/contextmenu/module');
    ObjectProperty = require('modules/datasketch/objectproperty/module');
    GroupMenuItem = require('modules/datasketch/menuitems/group');
    DuplicateMenuItem = require('modules/datasketch/menuitems/duplicate');
    DeleteMenuItem = require('modules/datasketch/menuitems/delete');
    IsolateMenuItem = require('modules/datasketch/menuitems/isolate');
    MapMenuItem = require('modules/datasketch/menuitems/map');
    ObjectSummaryMenu = require('modules/datasketch/menuitems/objectsummary');
    DSData = require('modules/datasketch/data/module');
    Animation = require('modules/datasketch/animation/module');
    Modal = require('modules/modal/module');
    require('link!./style.css');
    require('link!thirdparty/bootstrap.css');
    require('thirdparty/bootstrap3');
    return Main = (function(superClass) {
      extend(Main, superClass);

      function Main(domRoot) {
        Main.__super__.constructor.call(this, domRoot);
        window.APIURL = 'http://180.211.103.172:8070/SketchMaster/';
        if (window.parent && window.parent.getCurrentUserId) {
          window.currentUserId = parent.getCurrentUserId();
        }
        HM.hook('Application.Modules', function(set) {
          set.add(DSCanvas);
          set.add(WindowResize);
          set.add(DSShapeTools);
          set.add(DSMarkAsOriginTools);
          set.add(DSSnapGridTools);
          set.add(DSTools);
          set.add(DSModeTools);
          set.add(DSLoadInputTools);
          set.add(DSStrokeTools);
          set.add(DSColorTools);
          set.add(DScalibrationandmanipulationTools);
          set.add(DSsavecanvasTools);
          set.add(DSLoadSaveTools);
          set.add(DSNewFileTools);
          set.add(DSTrashTool);
          set.add(DSObjectOverlayTool);
          set.add(KeyboardShortcuts);
          set.add(ContextMenu);
          set.add(ObjectProperty);
          set.add(ObjectSummaryMenu);
          set.add(GroupMenuItem);
          set.add(IsolateMenuItem);
          set.add(DuplicateMenuItem);
          set.add(MapMenuItem);
          set.add(DeleteMenuItem);
          set.add(DSData);
          set.add(Animation);
          return set.add(Modal);
        });
      }

      return Main;

    })(Application);
  });

}).call(this);

//# sourceMappingURL=maps/app.js.map
