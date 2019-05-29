(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Globals, NewFileAction, StrokeTool, Tool;
    Tool = require('modules/toolkit/tool/tool');
    NewFileAction = require('modules/datasketch/actions/new_file');
    Globals = require('core/model/globals');
    require('link!./style.css');
    return StrokeTool = (function(superClass) {
      extend(StrokeTool, superClass);

      function StrokeTool(_Action) {
        this._Action = _Action;
        this.generateAction = bind(this.generateAction, this);
        StrokeTool.__super__.constructor.call(this, {
          modelData: {
            id: "" + this._Action,
            tooltip: "CreateFile"
          }
        });
      }

      StrokeTool.prototype.generateAction = function() {
        return new NewFileAction(Globals.get('Canvas'));
      };

      return StrokeTool;

    })(Tool);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/newfile/tool.js.map
