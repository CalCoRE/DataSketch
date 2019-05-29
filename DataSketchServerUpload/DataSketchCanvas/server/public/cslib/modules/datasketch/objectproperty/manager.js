(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var ContextMenuManager, Controller, Globals, Model, View;
    Controller = require('core/controller/controller');
    View = require('./view');
    Model = require('core/model/model');
    Globals = require('core/model/globals');
    return ContextMenuManager = (function(superClass) {
      extend(ContextMenuManager, superClass);

      function ContextMenuManager(settings) {
        if (settings == null) {
          settings = {};
        }
        this.close = bind(this.close, this);
        this.display = bind(this.display, this);
        if (settings.viewClass == null) {
          settings.viewClass = View;
        }
        if (settings.modelClass == null) {
          settings.modelClass = Model;
        }
        if (settings.modelData == null) {
          settings.modelData = {
            display: false,
            menu: null
          };
        }
        ContextMenuManager.__super__.constructor.call(this, settings);
      }

      ContextMenuManager.prototype.display = function(menu) {
        var canvas;
        this._model.set('menu', menu);
        this._model.set('display', true);
        canvas = Globals.get('Canvas');
        $('#x .menu-label').on('click', function() {
          return canvas.objectPropertyMenu("X");
        });
        $('#y .menu-label').on('click', function() {
          return canvas.objectPropertyMenu("Y");
        });
        $('#width .menu-label').on('click', function() {
          return canvas.objectPropertyMenu("Width");
        });
        $('#height .menu-label').on('click', function() {
          return canvas.objectPropertyMenu("Height");
        });
        $('#rotation .menu-label').on('click', function() {
          return canvas.objectPropertyMenu("Rotation");
        });
        $('#scale .menu-label').on('click', function() {
          return canvas.objectPropertyMenu("Scale");
        });
        $('#color .menu-label').on('click', function() {
          return canvas.objectPropertyMenu("Color");
        });
        $('#transparency .menu-label').on('click', function() {
          return canvas.objectPropertyMenu("Transparency");
        });
        return $('#stamping .menu-label').on('click', function() {
          return canvas.objectPropertyMenu("Stamping");
        });
      };

      ContextMenuManager.prototype.close = function() {
        return this._model.set('display', false);
      };

      return ContextMenuManager;

    })(Controller);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/objectproperty/manager.js.map
