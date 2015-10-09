(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(function(require) {
    var EventDispatcher, Parent;
    EventDispatcher = require('core/event/dispatcher');
    return Parent = (function(superClass) {
      extend(Parent, superClass);

      function Parent() {
        this.removeChild = bind(this.removeChild, this);
        this.addChild = bind(this.addChild, this);
        Parent.__super__.constructor.apply(this, arguments);
        this._children = [];
      }

      Parent.prototype.addChild = function(child) {
        if (indexOf.call(this._children, child) < 0) {
          if (child.parent) {
            child.parent.removeChild(child);
          }
          child.parent = this;
          child.addEventListener('*', this.bubbleEvent);
          this._children.push(child);
          this.dispatchEvent('Parent.ChildAdded', {
            child: child
          }, true);
        }
        return this;
      };

      Parent.prototype.removeChild = function(child) {
        if (indexOf.call(this._children, child) >= 0) {
          child.parent = null;
          child.removeEventListener('*', this.bubbleEvent);
          this._children.splice(this._children.indexOf(child), 1);
          this.dispatchEvent('Parent.ChildRemoved', {
            child: child
          }, true);
        }
        return this;
      };

      return Parent;

    })(EventDispatcher);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/core/util/parent.js.map