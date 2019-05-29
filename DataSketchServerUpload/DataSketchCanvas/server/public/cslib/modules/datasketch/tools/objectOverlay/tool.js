(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Globals, MarkAsOriginTool, ObjectOverlay, Tool, View;
    Tool = require('modules/toolkit/tool/tool');
    Globals = require('core/model/globals');
    View = require('./view');
    require('link!./style.css');
    ObjectOverlay = require('modules/datasketch/actions/object_overlay');
    return MarkAsOriginTool = (function(superClass) {
      extend(MarkAsOriginTool, superClass);

      function MarkAsOriginTool() {
        this._onCanvasChange = bind(this._onCanvasChange, this);
        this.generateAction = bind(this.generateAction, this);
        MarkAsOriginTool.__super__.constructor.call(this, {
          viewClass: View,
          modelData: {
            id: "objectoverlay",
            tooltip: "Object Overlay"
          }
        });
      }

      MarkAsOriginTool.prototype.generateAction = function() {
        var objectoverlay;
        if (window.currentActionId === "toolObjectOverlay") {
          if (Globals.get('Canvas')._view._fabric._objects.length > 0) {
            return $('#ObjectOverlayModal').modal({
              backdrop: false
            });
          } else {
            return alert("Please select atleast one object for this feature.");
          }
        } else {
          $('#ObjectOverlayModal').modal('hide');
          ObjectOverlay(objectoverlay = new ObjectOverlay(Globals.get('Canvas'), window.currentActionId));
          return objectoverlay.execute();
        }
      };

      MarkAsOriginTool.prototype._onCanvasChange = function(evt) {
        return this.toggleActiveDisplay(evt.data.mode === this._targetMode);
      };

      return MarkAsOriginTool;

    })(Tool);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/objectoverlay/tool.js.map
