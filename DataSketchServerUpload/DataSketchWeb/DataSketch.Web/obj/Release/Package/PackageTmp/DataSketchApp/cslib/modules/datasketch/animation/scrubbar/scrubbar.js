(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var DomView, ScrubBarView, Template;
    DomView = require("core/view/dom_view");
    Template = require('text!./scrubbar.html');
    require('link!./style.css');
    return ScrubBarView = (function(superClass) {
      extend(ScrubBarView, superClass);

      function ScrubBarView(animator) {
        this._onTick = bind(this._onTick, this);
        ScrubBarView.__super__.constructor.call(this, Template);
        animator.addEventListener("Animator.Tick", this._onTick);
      }

      ScrubBarView.prototype._onTick = function(evt) {
        return this.$el.find('.nub').css({
          left: "calc(" + ((evt.data.playhead / evt.data.total) * 80 + 10) + "% - 10px)"
        });
      };

      return ScrubBarView;

    })(DomView);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/animation/scrubbar/scrubbar.js.map
