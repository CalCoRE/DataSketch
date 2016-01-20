(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Controller, Modal, Model, View;
    Controller = require('core/controller/controller');
    Model = require('./model');
    View = require('./view');
    Modal = (function(superClass) {
      extend(Modal, superClass);

      function Modal() {
        this._onCloseRequest = bind(this._onCloseRequest, this);
        this.display = bind(this.display, this);
        this.close = bind(this.close, this);
        this.open = bind(this.open, this);
        Modal.__super__.constructor.call(this, {
          modelClass: Model,
          viewClass: View,
          modelData: {}
        });
        this.view().addEventListener("Modal.CloseRequest", this._onCloseRequest);
      }

      Modal.prototype.open = function() {
        return this._model.open();
      };

      Modal.prototype.close = function() {
        return this._model.close();
      };

      Modal.prototype.display = function(content) {
        return this._model.display(content);
      };

      Modal.prototype._onCloseRequest = function(evt) {
        return this.close();
      };

      return Modal;

    })(Controller);
    return new Modal;
  });

}).call(this);

//# sourceMappingURL=../../maps/modules/modal/modal.js.map