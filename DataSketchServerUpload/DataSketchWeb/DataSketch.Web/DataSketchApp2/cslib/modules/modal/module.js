(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Globals, Modal, ModalModule, Module;
    Module = require('core/app/module');
    Globals = require('core/model/globals');
    Modal = require('./modal');
    return ModalModule = (function(superClass) {
      extend(ModalModule, superClass);

      function ModalModule() {
        this.init = bind(this.init, this);
        return ModalModule.__super__.constructor.apply(this, arguments);
      }

      ModalModule.prototype.init = function() {
        return Globals.get('App.view').addChild(Modal.view());
      };

      return ModalModule;

    })(Module);
  });

}).call(this);

//# sourceMappingURL=../../maps/modules/modal/module.js.map
