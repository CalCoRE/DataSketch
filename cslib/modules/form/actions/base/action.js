(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Action, FormAction;
    Action = require('modules/action/action');
    return FormAction = (function(superClass) {
      extend(FormAction, superClass);

      function FormAction() {
        this.getButton = bind(this.getButton, this);
        FormAction.__super__.constructor.call(this);
      }

      FormAction.prototype.getButton = function() {};

      return FormAction;

    })(Action);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/form/actions/base/action.js.map