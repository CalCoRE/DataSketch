(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(function(require) {
    var EventDispatcher, Set;
    EventDispatcher = require('core/event/dispatcher');
    return Set = (function(superClass) {
      extend(Set, superClass);

      function Set(elements) {
        if (elements == null) {
          elements = [];
        }
        this.cardinality = bind(this.cardinality, this);
        this.equals = bind(this.equals, this);
        this.isSubsetOf = bind(this.isSubsetOf, this);
        this.complement = bind(this.complement, this);
        this.difference = bind(this.difference, this);
        this.union = bind(this.union, this);
        this.intersection = bind(this.intersection, this);
        this.contains = bind(this.contains, this);
        this.elements = bind(this.elements, this);
        this.empty = bind(this.empty, this);
        this.toggle = bind(this.toggle, this);
        this.remove = bind(this.remove, this);
        this.addMany = bind(this.addMany, this);
        this.add = bind(this.add, this);
        this._elements = [];
        this.addMany(elements);
      }

      Set.prototype.add = function(element) {
        if (!this.contains(element)) {
          this._elements.push(element);
          this.dispatchEvent('Set.ElementAdded', {
            element: element
          });
        }
        return this;
      };

      Set.prototype.addMany = function(elements) {
        var elem, i, len;
        for (i = 0, len = elements.length; i < len; i++) {
          elem = elements[i];
          this.add(elem);
        }
        return this;
      };

      Set.prototype.remove = function(element) {
        if (this.contains(element)) {
          this._elements.splice(this._elements.indexOf(element), 1);
          this.dispatchEvent('Set.ElementRemoved', {
            element: element
          });
        }
        return this;
      };

      Set.prototype.toggle = function(element) {
        if (this.contains(element)) {
          this.remove(element);
        } else {
          this.add(element);
        }
        return this.contains(element);
      };

      Set.prototype.empty = function() {
        return this._elements = [];
      };

      Set.prototype.elements = function() {
        return this._elements.slice(0);
      };

      Set.prototype.contains = function(element) {
        return indexOf.call(this._elements, element) >= 0;
      };

      Set.prototype.intersection = function(set) {
        var element, i, intersection, len, ref;
        intersection = new Set;
        ref = set.elements();
        for (i = 0, len = ref.length; i < len; i++) {
          element = ref[i];
          if (this.contains(element)) {
            intersection.add(element);
          }
        }
        return intersection;
      };

      Set.prototype.union = function(set) {
        return new Set(this.elements().concat(set.elements()));
      };

      Set.prototype.difference = function(set) {
        var diff, element, i, len, ref;
        diff = this.union(set);
        ref = this.intersection(set).elements();
        for (i = 0, len = ref.length; i < len; i++) {
          element = ref[i];
          diff.remove(element);
        }
        return diff;
      };

      Set.prototype.complement = function(set) {
        var complement, element, i, len, ref;
        complement = new Set(this.elements());
        ref = this.intersection(set).elements();
        for (i = 0, len = ref.length; i < len; i++) {
          element = ref[i];
          complement.remove(element);
        }
        return complement;
      };

      Set.prototype.isSubsetOf = function(set) {
        return this.elements().length === this.intersection(set).elements().length;
      };

      Set.prototype.equals = function(set) {
        return this.isSubsetOf(set) && set.isSubsetOf(this);
      };

      Set.prototype.cardinality = function() {
        return this.elements().length;
      };

      return Set;

    })(EventDispatcher);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/core/util/set.js.map