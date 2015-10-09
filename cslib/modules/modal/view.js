(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var DomView, ModalView, Template;
    DomView = require('core/view/dom_view');
    Template = require('text!./modal.html');
    require('link!./style.css');
    return ModalView = (function(superClass) {
      extend(ModalView, superClass);

      function ModalView(model, tmpl) {
        this.render = bind(this.render, this);
        this._onCloseClick = bind(this._onCloseClick, this);
        this._onChange = bind(this._onChange, this);
        ModalView.__super__.constructor.call(this, tmpl != null ? tmpl : Template);
        this._pages = [];
        model.addEventListener('Model.Change', this._onChange);
        this.$el.find(".close").click(this._onCloseClick);
      }

      ModalView.prototype._onChange = function(evt) {
        if (evt.data.path === "pages") {
          this.render(evt.currentTarget);
        }
        if (evt.data.path === "isOpen") {
          if (evt.data.value) {
            return this.$el.fadeIn();
          } else {
            return this.$el.fadeOut();
          }
        }
      };

      ModalView.prototype._onCloseClick = function(jqevt) {
        return this.dispatchEvent("Modal.CloseRequest", {});
      };

      ModalView.prototype.render = function(model) {
        var i, len, page, pageWrap, ref, results;
        while (this._pages.length) {
          this.removeChild(this._pages.pop());
        }
        ref = model.get('pages');
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          page = ref[i];
          pageWrap = new DomView("<div class='page'></div>");
          pageWrap.addChild(page.view());
          this.addChild(pageWrap, ".pages");
          results.push(this._pages.push(pageWrap));
        }
        return results;
      };

      return ModalView;

    })(DomView);
  });

}).call(this);

//# sourceMappingURL=../../maps/modules/modal/view.js.map