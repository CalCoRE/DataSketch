(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var $, Application, EventDispatcher, Globals, HM, Set, Utils;
    $ = require('jquery');
    EventDispatcher = require('core/event/dispatcher');
    Utils = require('core/util/utils');
    HM = require('core/event/hook_manager');
    Globals = require('core/model/globals');
    Set = require('core/util/set');
    return Application = (function(superClass) {
      extend(Application, superClass);

      function Application(domRoot) {
        this.run = bind(this.run, this);
        this.init = bind(this.init, this);
        this.load = bind(this.load, this);
        this._domRoot = $(domRoot);
        Globals.set('App', this);
      }

      Application.prototype.load = function() {
        var i, j, len, len1, mc, module, moduleClasses, promises, ref, ref1, viewClassPath;
        promises = [];
        moduleClasses = HM.invoke('Application.Modules', new Set);
        ref = moduleClasses.elements().slice(0);
        for (i = 0, len = ref.length; i < len; i++) {
          mc = ref[i];
          if (mc.requires != null) {
            moduleClasses.addMany(mc.requires);
          }
        }
        this._modules = [];
        ref1 = moduleClasses.elements();
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          mc = ref1[j];
          module = new mc;
          this._modules.push(module);
          promises.push(module.load());
        }
        viewClassPath = HM.invoke('Application.ViewClass', 'core/app/view');
        promises.push(new Promise((function(_this) {
          return function(resolve, reject) {
            return require([viewClassPath], function(viewClass) {
              _this.view = new viewClass;
              _this._domRoot.append(_this.view.$dom());
              _this.dispatchEvent('Application.ViewReady', {});
              return resolve(_this.view);
            }, function(err) {
              return reject(new Error("Could not load view class."));
            });
          };
        })(this)));
        return Promise.all(promises);
      };

      Application.prototype.init = function() {
        var pi;
        return Promise.all((function() {
          var i, len, ref, results;
          ref = this._modules;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            pi = ref[i];
            results.push(pi.init());
          }
          return results;
        }).call(this));
      };

      Application.prototype.run = function() {
        var i, len, pi, ref;
        ref = this._modules;
        for (i = 0, len = ref.length; i < len; i++) {
          pi = ref[i];
          pi.run();
        }
        return this.dispatchEvent('Application.Run', {});
      };

      return Application;

    })(EventDispatcher);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/core/app/application.js.map
