(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var DataRow, Model;
    Model = require('core/model/model');
    return DataRow = (function(superClass) {
      extend(DataRow, superClass);

      function DataRow(rowData, headers) {
        this.getValue = bind(this.getValue, this);
        var data, h, i, len;
        data = {
          values: []
        };
        for (i = 0, len = headers.length; i < len; i++) {
          h = headers[i];
          data.values.push({
            key: h.getId(),
            value: rowData[h.getName()]
          });
        }
        DataRow.__super__.constructor.call(this, {
          data: data,
          defaults: {}
        });
      }

      DataRow.prototype.getValue = function(key) {
        var i, len, ref, value;
        ref = this.get('values');
        for (i = 0, len = ref.length; i < len; i++) {
          value = ref[i];
          if (value.key === key) {
            return value.value;
          }
        }
        return null;
      };

      return DataRow;

    })(Model);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/data/models/row.js.map