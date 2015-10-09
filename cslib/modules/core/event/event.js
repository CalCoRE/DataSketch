(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(function() {
    var Event;
    return Event = (function() {
      function Event(name, data, bubbles) {
        this.name = name;
        this.data = data != null ? data : {};
        this.bubbles = bubbles != null ? bubbles : false;
        this.stopPropagation = bind(this.stopPropagation, this);
        this.target = null;
        this.currentTarget = null;
      }

      Event.prototype.stopPropagation = function() {
        return this.bubbles = false;
      };

      return Event;

    })();
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/core/event/event.js.map