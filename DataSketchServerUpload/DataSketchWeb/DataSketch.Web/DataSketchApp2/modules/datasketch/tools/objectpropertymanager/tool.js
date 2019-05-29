(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Globals, ObjectPropertyManager, ObjectPropertyManagerTool, Tool;
    Tool = require('modules/toolkit/tool/tool');
    Globals = require('core/model/globals');
    require('link!./style.css');
    ObjectPropertyManager = require('modules/datasketch/actions/object_property_manager');
    return ObjectPropertyManagerTool = (function(superClass) {
      extend(ObjectPropertyManagerTool, superClass);

      function ObjectPropertyManagerTool(_ObjectProperty) {
        this._ObjectProperty = _ObjectProperty;
        this.generateAction = bind(this.generateAction, this);
        ObjectPropertyManagerTool.__super__.constructor.call(this, {
          modelData: {
            id: "Object-" + this._ObjectProperty
          }
        });
      }

      ObjectPropertyManagerTool.prototype.generateAction = function() {
        return new ObjectPropertyManager(Globals.get('Canvas'), this._ObjectProperty);
      };

      return ObjectPropertyManagerTool;

    })(Tool);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/objectpropertymanager/tool.js.map
