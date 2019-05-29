(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var EventDispatcher, Model, Utils, defaults;
    EventDispatcher = require('core/event/dispatcher');
    Utils = require('core/util/utils');
    defaults = {
      data: {},
      defaults: {}
    };
    return Model = (function(superClass) {
      extend(Model, superClass);

      function Model(settings) {
        this.update = bind(this.update, this);
        this.set = bind(this.set, this);
        this.get = bind(this.get, this);
        settings = Utils.ensureDefaults(settings, defaults);
        this._data = Utils.ensureDefaults(settings.data, settings.defaults);
      }

      Model.prototype.get = function(path, trace) {
        var j, len, part, parts, target, targets;
        if (trace == null) {
          trace = false;
        }
        parts = path.split('.');
        target = this._data;
        if (trace) {
          targets = [target];
        }
        for (j = 0, len = parts.length; j < len; j++) {
          part = parts[j];
          if ((target.get != null) && (target.get(part) != null)) {
            target = target.get(part);
          } else if (target[part] != null) {
            target = target[part];
          } else {
            target = null;
            break;
          }
          if (trace) {
            targets.push(target);
          }
        }
        if (trace) {
          return targets;
        } else {
          return target;
        }
      };

      Model.prototype.set = function(path, value, forceEvent) {
        var i, j, len, old, part, paths, results, target;
        if (forceEvent == null) {
          forceEvent = false;
        }
        if (value !== this.get(path)) {
          paths = path.split('.');
          target = this._data;
          results = [];
          for (i = j = 0, len = paths.length; j < len; i = ++j) {
            part = paths[i];
            if (i === paths.length - 1) {
              if (target.set != null) {
                old = target.get(part);
                target.set(part, value);
              } else {
                old = target[part];
                if (value === null) {
                  target[part] = null;
                  delete target[part];
                } else {
                  target[part] = value;
                }
              }
              results.push(this.dispatchEvent('Model.Change', {
                path: path,
                value: value,
                old: old
              }, true));
            } else {
              if (target.get != null) {
                if (!target.get(part)) {
                  target.set(part, {});
                }
                results.push(target = target.get(part));
              } else {
                if (target[part] == null) {
                  target[part] = {};
                }
                results.push(target = target[part]);
              }
            }
          }
          return results;
        } else if (forceEvent || value instanceof Array) {
          return this.dispatchEvent('Model.Change', {
            path: path,
            value: value
          }, true);
        }
      };

      Model.prototype.update = function(data) {
        var key, val;
        for (key in data) {
          val = data[key];
          if (key === "id" && (this._data.id != null)) {
            continue;
          }
          this._data[key] = val;
        }
        return this.dispatchEvent('Model.Change', {
          path: null,
          value: data
        }, true);
      };

      return Model;

    })(EventDispatcher);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/core/model/model.js.map
