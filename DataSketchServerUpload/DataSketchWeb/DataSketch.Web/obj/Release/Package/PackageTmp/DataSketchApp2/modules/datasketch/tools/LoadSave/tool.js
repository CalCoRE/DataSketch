(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Globals, LoadSaveAction, StrokeTool, Tool;
    Tool = require('modules/toolkit/tool/tool');
    Globals = require('core/model/globals');
    require('link!./style.css');
    LoadSaveAction = require('modules/datasketch/actions/load_save');
    return StrokeTool = (function(superClass) {
      extend(StrokeTool, superClass);

      function StrokeTool(_Action) {
        this._Action = _Action;
        this.generateAction = bind(this.generateAction, this);
        StrokeTool.__super__.constructor.call(this, {
          modelData: {
            id: "" + this._Action,
            tooltip: this._Action === "SaveCanvas" ? 'Save Canvas' : 'Load Canvas'
          }
        });
      }

      StrokeTool.prototype.generateAction = function() {
        return new LoadSaveAction(Globals.get('Canvas'), this._Action);
      };

      return StrokeTool;

    })(Tool);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/loadsave/tool.js.map
