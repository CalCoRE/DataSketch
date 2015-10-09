(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var DataTableView, DomView, RowView, Template;
    DomView = require('core/view/dom_view');
    Template = require('text!./table.html');
    RowView = require('./row');
    require('link!./style.css');
    return DataTableView = (function(superClass) {
      extend(DataTableView, superClass);

      function DataTableView(model) {
        this.onScreen = bind(this.onScreen, this);
        var i, ind, j, len, len1, property, ref, ref1, row, rv;
        DataTableView.__super__.constructor.call(this, Template);
        ref = model.get('properties');
        for (i = 0, len = ref.length; i < len; i++) {
          property = ref[i];
          this.addChild(new DomView("<div class='table-header property table-cell'>" + (property.getName()) + "</div>"), ".properties");
        }
        ref1 = model.get('rows');
        for (ind = j = 0, len1 = ref1.length; j < len1; ind = ++j) {
          row = ref1[ind];
          rv = new RowView(row);
          this.addChild(rv, ".rows");
          this.addChild(new DomView("<div class='table-header row-header table-cell'>T " + ind + "</div>"), ".row-headers");
        }
        window.requestAnimationFrame(this.onScreen);
      }

      DataTableView.prototype.onScreen = function() {
        var width;
        width = this.$el.find(".properties").outerWidth();
        if (width) {
          return this.$el.find(".table-wrap").css({
            "padding-left": this.$el.find(".properties").outerWidth()
          });
        } else {
          return window.requestAnimationFrame(this.onScreen);
        }
      };

      return DataTableView;

    })(DomView);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/data/views/table.js.map