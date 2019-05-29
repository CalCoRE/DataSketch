(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Globals, HM, Module, ObjectSummaryModule;
    Module = require('core/app/module');
    HM = require('core/event/hook_manager');
    Globals = require('core/model/globals');
    return ObjectSummaryModule = (function(superClass) {
      var root;

      extend(ObjectSummaryModule, superClass);

      function ObjectSummaryModule() {
        this._hookMenuItems = bind(this._hookMenuItems, this);
        this.ObjectProperty = bind(this.ObjectProperty, this);
        this.init = bind(this.init, this);
        ObjectSummaryModule.__super__.constructor.apply(this, arguments);
      }

      ObjectSummaryModule.prototype.init = function() {
        return HM.hook('ContextMenu.MenuItems', this._hookMenuItems);
      };

      root = typeof exports !== "undefined" && exports !== null ? exports : ObjectSummaryModule;

      ObjectSummaryModule.prototype.ObjectProperty = function(activeObject) {
        $("#Object-Width").text("Width " + Math.round(activeObject.width * activeObject.scaleX));
        $("#Object-Height").text("Height " + Math.round(activeObject.height * activeObject.scaleY));
        $("#Object-X").text("X " + Math.round(activeObject.left));
        $("#Object-Y").text("Y " + Math.round(activeObject.top));
        $("#Object-Angle").text("Angle " + Math.round(activeObject.angle));
        $("#Object-originX").text("originX " + activeObject.originX);
        return $("#Object-originY").text("originY " + activeObject.originY);
      };

      ObjectSummaryModule.prototype._hookMenuItems = function(list, meta) {
        var ref;
        if (((ref = meta.context.selection) != null ? ref.length : void 0) === 1) {
          list.push({
            id: 'Object-originY',
            label: "originY:"
          });
          list.push({
            id: 'Object-originX',
            label: "originX:"
          });
          list.push({
            id: 'Object-Angle',
            label: "Angle:"
          });
          list.push({
            id: 'Object-Y',
            label: "Y:"
          });
          list.push({
            id: 'Object-X',
            label: "X:"
          });
          list.push({
            id: 'Object-Height',
            label: "Height:"
          });
          list.push({
            id: 'Object-Width',
            label: "Width:"
          });
        }
        return list;
      };

      return ObjectSummaryModule;

    })(Module);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/menuitems/objectsummary.js.map
