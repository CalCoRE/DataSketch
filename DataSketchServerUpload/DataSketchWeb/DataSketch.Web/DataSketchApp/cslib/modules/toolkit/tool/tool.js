(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Controller, Globals, Model, Tool, View;
    Controller = require('core/controller/controller');
    Model = require('./model');
    View = require('./view');
    Globals = require('core/model/globals');
    return Tool = (function(superClass) {
      extend(Tool, superClass);

      function Tool(config) {
        this.toggleActiveDisplay = bind(this.toggleActiveDisplay, this);
        this.generateAction = bind(this.generateAction, this);
        this._onActionRequest = bind(this._onActionRequest, this);
        if (config == null) {
          config = {};
        }
        if (config.modelClass == null) {
          config.modelClass = Model;
        }
        if (config.viewClass == null) {
          config.viewClass = View;
        }
        Tool.__super__.constructor.call(this, config);
        this.view().addEventListener('Tool.GenerateActionRequest', this._onActionRequest);
      }

      Tool.prototype._onActionRequest = function(evt) {
        return Globals.get('Relay').dispatchEvent('Action.RequestAction', {
          action: this.generateAction()
        });
      };

      Tool.prototype.generateAction = function() {};

      Tool.prototype.toggleActiveDisplay = function(bool) {
        return this.view().$dom().toggleClass("active", bool);
      };

      return Tool;

    })(Controller);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/toolkit/tool/tool.js.map
