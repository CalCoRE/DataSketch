(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Animator, EventDispatcher, Globals;
    EventDispatcher = require('core/event/dispatcher');
    Globals = require('core/model/globals');
    return Animator = (function(superClass) {
      extend(Animator, superClass);

      Animator._isLoop = true;

      function Animator(settings) {
        this.settings = settings;
        this._animate = bind(this._animate, this);
        this.restore = bind(this.restore, this);
        this.cache = bind(this.cache, this);
        this.reset = bind(this.reset, this);
        this.pause = bind(this.pause, this);
        this.play = bind(this.play, this);
        this._playhead = 0;
      }

      Animator.prototype.play = function() {
        Globals.get('Canvas')._view._fabric.deactivateAll();
        this._isPlaying = true;
        this._lastTime = (new Date).getTime();
        window.opacityManager = 1;
        this._animate();
        return window.arrayObject = [];
      };

      Animator.prototype.pause = function() {
        var i, len, obj, objId, ref;
        this._isPlaying = false;
        clearInterval(window.timer);
        if (window.arrayObject.length > 0) {
          Globals.get('Canvas').removeObjects(window.arrayObject);
        }
        ref = this.settings.canvas.getObjects();
        for (i = 0, len = ref.length; i < len; i++) {
          obj = ref[i];
          if (obj !== void 0) {
            objId = obj.getId();
            if (window[objId + "arrayObject"] !== void 0 && window[objId + "arrayObject"].length > 0) {
              Globals.get('Canvas').removeObjects(window[objId + "arrayObject"]);
              window[objId + "previousRow"] = null;
            }
          }
        }
        return window.opacityManager = 1;
      };

      Animator.prototype.reset = function() {
        return this._playhead = 0;
      };

      Animator.prototype.cache = function() {
        var i, len, obj, ref, results;
        ref = this.settings.canvas.getObjects();
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          obj = ref[i];
          results.push(obj.cacheState());
        }
        return results;
      };

      Animator.prototype.restore = function() {
        var i, len, obj, ref;
        ref = this.settings.canvas.getObjects();
        for (i = 0, len = ref.length; i < len; i++) {
          obj = ref[i];
          obj.restoreState();
        }
        return this.settings.canvas.dryRender();
      };

      Animator.prototype._animate = function() {
        var currTime, delta, i, len, mobject, obj, objectProperty, ref, total;
        if (this._isPlaying) {
          currTime = (new Date).getTime();
          total = this.settings.datastore.get('rows').length * window.DataSketchConfig.timePerRow * 1000;
          delta = currTime - this._lastTime;
          this._playhead = Math.min(total, this._playhead + delta);
          ref = this.settings.canvas.getObjects();
          for (i = 0, len = ref.length; i < len; i++) {
            obj = ref[i];
            if (obj !== void 0) {
              obj.animate(this._playhead, delta, this.settings.datastore);
            }
          }
          this.settings.canvas.dryRender();
          this._lastTime = currTime;
          this.dispatchEvent('Animator.Tick', {
            playhead: this._playhead,
            total: total
          });
          if (this._playhead >= total) {
            this.restore();
            this._isLoop = true;
            if (this._isLoop) {
              this._playhead = 0;
            } else {
              this.pause();
              this.reset();
              mobject = this.settings.canvas.getSelectedObjects();
              objectProperty = mobject[0].getPropertyMappings();
              mobject[0].removePropertyMapping(objectProperty[0]);
            }
          }
          return window.requestAnimationFrame(this._animate);
        }
      };

      return Animator;

    })(EventDispatcher);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/animation/animator.js.map
