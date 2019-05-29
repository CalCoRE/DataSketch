(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var AppView, DomView, Template;
    DomView = require('core/view/dom_view');
    Template = require('text!./app.html');
    return AppView = (function(superClass) {
      extend(AppView, superClass);

      function AppView(tmpl) {
        if (tmpl == null) {
          tmpl = Template;
        }
        AppView.__super__.constructor.call(this, tmpl);
        require('jscolor');
      }

      return AppView;

    })(DomView);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/core/app/view.js.map
