(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    slice = [].slice;

  define(function(require) {
    var Event, EventDispatcher;
    Event = require('./event');
    return EventDispatcher = (function() {
      function EventDispatcher() {
        this.bubbleEvent = bind(this.bubbleEvent, this);
        this.fire = bind(this.fire, this);
        this.off = bind(this.off, this);
        this.on = bind(this.on, this);
        this.dispatchEvent = bind(this.dispatchEvent, this);
        this.removeEventListener = bind(this.removeEventListener, this);
        this.addEventListener = bind(this.addEventListener, this);
      }

      EventDispatcher.prototype.addEventListener = function(evtName, callback) {
        var base;
        if (this.__listeners == null) {
          this.__listeners = {};
        }
        if ((base = this.__listeners)[evtName] == null) {
          base[evtName] = [];
        }
        if (!(this.__listeners[evtName].indexOf(callback) >= 0)) {
          this.__listeners[evtName].push(callback);
        }
        return this;
      };

      EventDispatcher.prototype.removeEventListener = function(evtName, callback) {
        if ((this.__listeners != null) && this.__listeners[evtName] && indexOf.call(this.__listeners[evtName], callback) >= 0) {
          this.__listeners[evtName].splice(this.__listeners[evtName].indexOf(callback), 1);
        }
        return this;
      };

      EventDispatcher.prototype.dispatchEvent = function(evt, data, bubbles) {
        var cb, i, j, key, len, len1, listeners, ref;
        if (data == null) {
          data = {};
        }
        if (bubbles == null) {
          bubbles = false;
        }
        if (this.__listeners != null) {
          if (typeof evt === "string") {
            evt = new Event(evt, data, bubbles);
          }
          if (evt.target == null) {
            evt.target = this;
          }
          evt.currentTarget = this;
          ref = [evt.name, "*"];
          for (i = 0, len = ref.length; i < len; i++) {
            key = ref[i];
            if (this.__listeners[key] != null) {
              listeners = this.__listeners[key].slice(0);
              for (j = 0, len1 = listeners.length; j < len1; j++) {
                cb = listeners[j];
                cb(evt);
              }
            }
          }
        }
        return this;
      };

      EventDispatcher.prototype.on = function() {
        var args;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        return this.addEventListener.apply(this, args);
      };

      EventDispatcher.prototype.off = function() {
        var args;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        return this.addEventListener.apply(this, args);
      };

      EventDispatcher.prototype.fire = function() {
        var args;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        return this.dispatchEvent.apply(this, args);
      };

      EventDispatcher.prototype.bubbleEvent = function(evt) {
        if (evt.bubbles) {
          return this.dispatchEvent(evt);
        }
      };

      return EventDispatcher;

    })();
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/core/event/dispatcher.js.map