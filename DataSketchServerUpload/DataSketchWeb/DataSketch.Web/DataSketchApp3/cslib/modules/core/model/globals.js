(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var EventDispatcher, Globals, Model;
    EventDispatcher = require('core/event/dispatcher');
    Model = require('./model');
    Globals = (function(superClass) {
      extend(Globals, superClass);

      function Globals() {
        Globals.__super__.constructor.call(this, {
          data: {},
          defaults: {}
        });
        this.set('Relay', new EventDispatcher);
      }

      return Globals;

    })(Model);
    return new Globals;
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/core/model/globals.js.map
