(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var DataRowView, DomView, Template;
    DomView = require('core/view/dom_view');
    Template = require('text!./row.html');
    return DataRowView = (function(superClass) {
      extend(DataRowView, superClass);

      function DataRowView(model) {
        var i, len, ref, val;
        DataRowView.__super__.constructor.call(this, Template);
        this._cells = {};
        ref = model.get('values');
        for (i = 0, len = ref.length; i < len; i++) {
          val = ref[i];
          this.$el.append("<div class='table-cell'>" + (val.value !== '' ? val.value : "&nbsp;") + "</div>");
        }
      }

      return DataRowView;

    })(DomView);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/data/views/row.js.map
