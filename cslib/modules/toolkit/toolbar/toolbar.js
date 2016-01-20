(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Controller, HM, Model, Toolbar, View;
    Controller = require('core/controller/controller');
    Model = require('./model');
    View = require('./view');
    HM = require('core/event/hook_manager');
    return Toolbar = (function(superClass) {
      extend(Toolbar, superClass);

      function Toolbar(config) {
        this.build = bind(this.build, this);
        if (config.modelClass == null) {
          config.modelClass = Model;
        }
        if (config.viewClass == null) {
          config.viewClass = View;
        }
        Toolbar.__super__.constructor.call(this, config);
      }

      Toolbar.prototype.build = function() {
        var tools;
        tools = HM.invoke('Toolbar.Tools', [], {
          id: this._model.get('id')
        });
        return this._model.set('tools', tools);
      };

      return Toolbar;

    })(Controller);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/toolkit/toolbar/toolbar.js.map