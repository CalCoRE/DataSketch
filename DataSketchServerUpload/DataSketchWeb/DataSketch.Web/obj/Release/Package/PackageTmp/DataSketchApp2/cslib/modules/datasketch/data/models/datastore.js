(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var DataStore, Model, Property, Row, defaults;
    Model = require('core/model/model');
    Row = require('./row');
    Property = require('./property');
    defaults = {
      rows: [],
      properties: []
    };
    return DataStore = (function(superClass) {
      extend(DataStore, superClass);

      function DataStore(data) {
        this.getMinMax = bind(this.getMinMax, this);
        var i, j, len, len1, p, properties, r, ref, ref1, rows;
        rows = [];
        properties = [];
        ref = data.properties;
        for (i = 0, len = ref.length; i < len; i++) {
          p = ref[i];
          properties.push(new Property(p));
        }
        data.properties = properties;
        ref1 = data.rows;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          r = ref1[j];
          rows.push(new Row(r, data.properties));
        }
        data.rows = rows;
        DataStore.__super__.constructor.call(this, {
          data: data,
          defaults: defaults
        });
      }

      DataStore.prototype.getMinMax = function(property) {
        var bounds, i, len, ref, row;
        bounds = {
          min: null,
          max: null
        };
        ref = this.get('rows');
        for (i = 0, len = ref.length; i < len; i++) {
          row = ref[i];
          if (bounds.min == null) {
            bounds.min = row.getValue(property.getId());
          }
          if (bounds.max == null) {
            bounds.max = row.getValue(property.getId());
          }
          bounds.min = Math.min(bounds.min, row.getValue(property.getId()));
          bounds.max = Math.max(bounds.max, row.getValue(property.getId()));
        }
        return bounds;
      };

      return DataStore;

    })(Model);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/data/models/datastore.js.map
