(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Canvas, DSCanvas, Globals, Module;
    Module = require('core/app/module');
    Globals = require('core/model/globals');
    Canvas = require('./canvas');
    return DSCanvas = (function(superClass) {
      extend(DSCanvas, superClass);

      function DSCanvas() {
        this._onActionRequest = bind(this._onActionRequest, this);
        this.run = bind(this.run, this);
        this.init = bind(this.init, this);
        this.handlePreload = bind(this.handlePreload, this);
        this.listPreload = bind(this.listPreload, this);
        return DSCanvas.__super__.constructor.apply(this, arguments);
      }

      DSCanvas.prototype.constuctor = function() {};

      DSCanvas.prototype.listPreload = function() {
        var list;
        list = DSCanvas.__super__.listPreload.call(this);
        list.push('modules/action/history');
        list.push('modules/datasketch/canvas/view');
        return list;
      };

      DSCanvas.prototype.handlePreload = function(ActionHistory, CanvasView) {
        Globals.set('ActionHistory', new ActionHistory);
        return this.canvas = new Canvas;
      };

      DSCanvas.prototype.init = function() {
        Globals.get('App.view').addChild(this.canvas.view());
        Globals.get('Relay').addEventListener('Action.RequestAction', this._onActionRequest);
        Globals.set('Canvas', this.canvas);
        return this.canvas.initCanvas();
      };

      DSCanvas.prototype.run = function() {};

      DSCanvas.prototype._onActionRequest = function(evt) {
        if (evt.data.action !== 1 && evt.data.action) {
          return Globals.get('ActionHistory').execute(evt.data.action);
        }
      };

      return DSCanvas;

    })(Module);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/canvas/module.js.map
