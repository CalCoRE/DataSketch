(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Globals, MarkAsOrigin, MarkAsOriginTool, Tool, View;
    Tool = require('modules/toolkit/tool/tool');
    Globals = require('core/model/globals');
    View = require('./view');
    require('link!./style.css');
    MarkAsOrigin = require('modules/datasketch/actions/mark_as_origin');
    return MarkAsOriginTool = (function(superClass) {
      extend(MarkAsOriginTool, superClass);

      function MarkAsOriginTool() {
        this._onCanvasChange = bind(this._onCanvasChange, this);
        this.generateAction = bind(this.generateAction, this);
        MarkAsOriginTool.__super__.constructor.call(this, {
          viewClass: View,
          modelData: {
            id: "markAsOrigin",
            tooltip: "Mark as Origin"
          }
        });
      }

      MarkAsOriginTool.prototype.generateAction = function() {
        var isMultiObject, markasorigin, originX, originY;
        if (window.currentActionId === "MarkAsOriginModal") {
          return $('#MarkAsOriginModal').modal('hide');
        } else if (window.currentActionId === "toolMarkAsOrigin") {
          if (Globals.get('Canvas')._view._fabric._objects.length > 0) {
            return $('#MarkAsOriginModal').modal({
              backdrop: false
            });
          } else {
            return alert("Please select atleast one object for this feature.");
          }
        } else if (window.currentActionId !== "markasorigin") {
          isMultiObject = false;
          $('#MarkAsOriginModal').modal('hide');
          originX = $('#' + window.currentActionId).attr('data-originx');
          originY = $('#' + window.currentActionId).attr('data-originy');
          if (Globals.get('Canvas').getSelectedObjects().length > 1) {
            isMultiObject = true;
          }
          MarkAsOrigin(markasorigin = new MarkAsOrigin(Globals.get('Canvas'), originX, originY, isMultiObject));
          return markasorigin.execute();
        }
      };

      MarkAsOriginTool.prototype._onCanvasChange = function(evt) {
        return this.toggleActiveDisplay(evt.data.mode === this._targetMode);
      };

      return MarkAsOriginTool;

    })(Tool);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/markasorigin/tool.js.map
