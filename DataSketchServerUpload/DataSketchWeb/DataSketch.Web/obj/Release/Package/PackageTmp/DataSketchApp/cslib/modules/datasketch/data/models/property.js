(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var DataProperty, Model, Utils;
    Model = require('core/model/model');
    Utils = require('core/util/utils');
    return DataProperty = (function(superClass) {
      extend(DataProperty, superClass);

      function DataProperty(header) {
        this.getId = bind(this.getId, this);
        this.getName = bind(this.getName, this);
        DataProperty.__super__.constructor.call(this, {
          data: {
            id: Utils.slugify(header),
            name: header
          }
        });
      }

      DataProperty.prototype.getName = function() {
        return this.get('name');
      };

      DataProperty.prototype.getId = function() {
        return this.get('id');
      };

      return DataProperty;

    })(Model);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/data/models/property.js.map
