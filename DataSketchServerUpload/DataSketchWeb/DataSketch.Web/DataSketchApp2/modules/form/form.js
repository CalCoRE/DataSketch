(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Controller, Form, Model, View;
    Controller = require('core/controller/controller');
    Model = require('./model');
    View = require('./view');
    Form = (function(superClass) {
      extend(Form, superClass);

      function Form(settings) {
        this.value = bind(this.value, this);
        this._onEvent = bind(this._onEvent, this);
        if (settings.modelClass == null) {
          settings.modelClass = Model;
        }
        if (settings.viewClass == null) {
          settings.viewClass = View;
        }
        Form.__super__.constructor.call(this, settings);
        this.view().addEventListener("*", this._onEvent);
      }

      Form.prototype._onEvent = function(evt) {
        if (evt.name.match(/^Form\./)) {
          return this.bubbleEvent(evt);
        }
      };

      Form.prototype.value = function() {
        return this._model.getValue();
      };

      return Form;

    })(Controller);
    Form.create = function(data) {
      return new Form({
        modelData: data
      });
    };
    return Form;
  });

}).call(this);

//# sourceMappingURL=../../maps/modules/form/form.js.map
