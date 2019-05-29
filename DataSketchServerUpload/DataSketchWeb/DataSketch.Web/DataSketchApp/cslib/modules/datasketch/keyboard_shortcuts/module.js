(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var DeleteAction, Globals, HM, KeyboardShortcutModule, Module, shortcuts;
    Module = require('core/app/module');
    Globals = require('core/model/globals');
    HM = require('core/event/hook_manager');
    DeleteAction = require('modules/datasketch/actions/delete_objects');
    shortcuts = {
      "delete": 8
    };
    return KeyboardShortcutModule = (function(superClass) {
      extend(KeyboardShortcutModule, superClass);

      function KeyboardShortcutModule() {
        this._onKeyUp = bind(this._onKeyUp, this);
        this.run = bind(this.run, this);
        return KeyboardShortcutModule.__super__.constructor.apply(this, arguments);
      }

      KeyboardShortcutModule.prototype.run = function() {
        return document.addEventListener('keydown', this._onKeyUp);
      };

      KeyboardShortcutModule.prototype._onKeyUp = function(evt) {};

      return KeyboardShortcutModule;

    })(Module);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/keyboard_shortcuts/module.js.map
