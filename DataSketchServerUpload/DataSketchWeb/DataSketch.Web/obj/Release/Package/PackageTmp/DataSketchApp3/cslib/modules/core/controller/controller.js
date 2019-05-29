(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Controller, EventDispatcher, Utils, defaults;
    EventDispatcher = require('core/event/dispatcher');
    Utils = require('core/util/utils');
    defaults = {
      modelClass: null,
      viewClass: null,
      modelData: {}
    };
    return Controller = (function(superClass) {
      extend(Controller, superClass);

      function Controller(settings) {
        this.view = bind(this.view, this);
        var config;
        config = Utils.ensureDefaults(settings, defaults);
        if (config.modelClass != null) {
          this._model = new config.modelClass({
            data: config.modelData
          });
        }
        if (config.viewClass != null) {
          this._view = new config.viewClass(this._model);
        }
      }

      Controller.prototype.view = function() {
        return this._view;
      };

      return Controller;

    })(EventDispatcher);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/core/controller/controller.js.map
