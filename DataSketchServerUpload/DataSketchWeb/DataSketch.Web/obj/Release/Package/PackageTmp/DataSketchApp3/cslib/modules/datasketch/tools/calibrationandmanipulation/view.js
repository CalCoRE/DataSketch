(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var CalibrationAndManipulationToolView, Template, ToolView;
    ToolView = require('modules/toolkit/tool/view');
    Template = require('text!./view.html');
    require('link!./style.css');
    return CalibrationAndManipulationToolView = (function(superClass) {
      extend(CalibrationAndManipulationToolView, superClass);

      function CalibrationAndManipulationToolView(model) {
        CalibrationAndManipulationToolView.__super__.constructor.call(this, model, Template);
      }

      return CalibrationAndManipulationToolView;

    })(ToolView);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/calibrationandmanipulation/view.js.map
