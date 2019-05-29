(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Parent, View;
    Parent = require('core/util/parent');
    return View = (function(superClass) {
      extend(View, superClass);

      function View() {
        return View.__super__.constructor.apply(this, arguments);
      }

      return View;

    })(Parent);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/core/view/view.js.map
