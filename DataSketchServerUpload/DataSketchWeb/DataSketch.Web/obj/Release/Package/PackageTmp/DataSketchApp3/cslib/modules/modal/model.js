(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var ModalModel, Model, Utils, defaults;
    Model = require('core/model/model');
    Utils = require('core/util/utils');
    defaults = {
      pages: [],
      isOpen: false
    };
    return ModalModel = (function(superClass) {
      extend(ModalModel, superClass);

      function ModalModel(config) {
        this.display = bind(this.display, this);
        this.popPage = bind(this.popPage, this);
        this.pushPage = bind(this.pushPage, this);
        this.close = bind(this.close, this);
        this.open = bind(this.open, this);
        config.defaults = Utils.ensureDefaults(config.defaults, defaults);
        ModalModel.__super__.constructor.call(this, config);
      }

      ModalModel.prototype.open = function() {
        return this.set('isOpen', true);
      };

      ModalModel.prototype.close = function() {
        return this.set('isOpen', false);
      };

      ModalModel.prototype.pushPage = function(content) {
        var pages;
        pages = this.get('pages');
        pages.push(content);
        return this.set('pages', pages);
      };

      ModalModel.prototype.popPage = function() {
        var pages;
        pages = this.get('pages');
        pages.pop();
        return this.set('pages', pages);
      };

      ModalModel.prototype.display = function(content) {
        this.set('pages', [content]);
        return this.open();
      };

      return ModalModel;

    })(Model);
  });

}).call(this);

//# sourceMappingURL=../../maps/modules/modal/model.js.map
