(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var $, Event, Globals, Module, WindowResize;
    $ = require('jquery');
    Module = require('core/app/module');
    Globals = require('core/model/globals');
    Event = require('core/event/event');
    return WindowResize = (function(superClass) {
      extend(WindowResize, superClass);

      function WindowResize() {
        this._onResize = bind(this._onResize, this);
        this.init = bind(this.init, this);
        return WindowResize.__super__.constructor.apply(this, arguments);
      }

      WindowResize.prototype.init = function() {
        if (typeof window !== "undefined" && window !== null) {
          return window.addEventListener('resize', this._onResize);
        }
      };

      WindowResize.prototype._onResize = function() {
        return Globals.get('Relay').dispatchEvent(new Event('Window.Resize', {
          width: $(window).width(),
          height: $(window).height()
        }));
      };

      return WindowResize;

    })(Module);
  });

}).call(this);

//# sourceMappingURL=../../maps/modules/windowresize/module.js.map