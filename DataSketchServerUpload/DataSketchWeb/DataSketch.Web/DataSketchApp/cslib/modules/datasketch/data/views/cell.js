(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var DataCellView, DomView, Template;
    DomView = require('core/view/dom_view');
    Template = require('text!./cell.html');
    return DataCellView = (function(superClass) {
      extend(DataCellView, superClass);

      function DataCellView(value) {
        DataCellView.__super__.constructor.call(this, Template);
        this.$el.text(value);
      }

      return DataCellView;

    })(DomView);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/data/views/cell.js.map
