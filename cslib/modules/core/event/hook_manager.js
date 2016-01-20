(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(function(require) {
    var HookManager;
    HookManager = (function() {
      function HookManager() {
        this.invoke = bind(this.invoke, this);
        this.hook = bind(this.hook, this);
        this._hooks = {};
      }

      HookManager.prototype.hook = function(hookName, callback, priorty) {
        var base;
        if (priorty == null) {
          priorty = 0;
        }
        if ((base = this._hooks)[hookName] == null) {
          base[hookName] = [];
        }
        return this._hooks[hookName].push({
          callback: callback,
          priorty: priorty
        });
      };

      HookManager.prototype.invoke = function(hookName, subject, meta) {
        var hook, i, len, ref;
        if (meta == null) {
          meta = {};
        }
        if (this._hooks[hookName] != null) {
          this._hooks[hookName].sort(function(a, b) {
            return b.priorty - a.priorty;
          });
          ref = this._hooks[hookName];
          for (i = 0, len = ref.length; i < len; i++) {
            hook = ref[i];
            subject = hook.callback.call(null, subject, meta);
          }
        }
        return subject;
      };

      return HookManager;

    })();
    return new HookManager;
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/core/event/hook_manager.js.map