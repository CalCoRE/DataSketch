(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var $, Action, DuplicateObjectsAction;
    $ = require('jquery');
    Action = require('modules/action/action');
    return DuplicateObjectsAction = (function(superClass) {
      extend(DuplicateObjectsAction, superClass);

      function DuplicateObjectsAction(canvas, _objects) {
        this.canvas = canvas;
        this._objects = _objects;
        this.undo = bind(this.undo, this);
        this.execute = bind(this.execute, this);
      }

      DuplicateObjectsAction.prototype.execute = function() {
        var obj;
        return Promise.all((function() {
          var i, len, ref, results;
          ref = this._objects;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            obj = ref[i];
            results.push(obj.clone());
          }
          return results;
        }).call(this)).then((function(_this) {
          return function(clones) {
            var clone, i, len;
            _this._clones = clones;
            for (i = 0, len = clones.length; i < len; i++) {
              clone = clones[i];
              clone.setPosition({
                x: $(window).width() / 2,
                y: $(window).height() / 2
              });
              _this.canvas.addObject(clone);
            }
            return _this.canvas.render();
          };
        })(this));
      };

      DuplicateObjectsAction.prototype.undo = function() {
        return Promise.resolve(((function(_this) {
          return function() {
            return _this.canvas.removeObjects(_this._clones);
          };
        })(this))());
      };

      return DuplicateObjectsAction;

    })(Action);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/actions/duplicate_objects.js.map