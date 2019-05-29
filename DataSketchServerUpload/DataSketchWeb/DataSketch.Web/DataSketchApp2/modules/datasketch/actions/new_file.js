(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Action, NewFile;
    Action = require('modules/action/action');
    return NewFile = (function(superClass) {
      extend(NewFile, superClass);

      function NewFile(canvas) {
        this.canvas = canvas;
        this.canvas.createNewFile();
      }

      return NewFile;

    })(Action);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/actions/new_file.js.map
