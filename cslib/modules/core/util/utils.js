(function() {
  define(function(require) {
    var $, Utils;
    $ = require('jquery');
    return Utils = {
      ensureDefaults: function(data, defaults) {
        return $.extend(true, {}, defaults, data);
      },
      validateString: function(string, validation) {
        if (typeof string !== 'string') {
          throw new Error('Object to be validated is not a string.');
        }
        switch (typeof validation) {
          case 'string':
            return string === validation;
          case 'function':
            return validation(string);
          case 'object':
            if (validation instanceof RegExp) {
              return validation.test(string);
            }
        }
        throw new Error('Validation is not acceptable type.');
      },
      guid4: function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r, v;
          r = Math.floor(Math.random() * 16);
          v = c === 'x' ? r : r & 0x3 | 0x8;
          return v.toString(16);
        });
      },
      guidReString: function() {
        return "[A-Fa-f0-9]{8}-(?:[A-Fa-f0-9]{4}-){3}[A-Fa-f0-9]{12}";
      },
      slugify: function(str) {
        return str.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, '');
      },
      promiseErrorHandler: function(e) {
        return console.log(e.message, e.stack);
      },
      promiseRequire: function(paths) {
        if (!(paths instanceof Array)) {
          paths = [paths];
        }
        return new Promise(function(resolve, reject) {
          return require(paths, function() {
            return resolve(arguments);
          }, function(err) {
            return reject(err);
          });
        });
      },
      posMod: function(x, n) {
        while (x < 0) {
          x += n;
        }
        return x % n;
      },
      isEmpty: function(a) {
        return (a == null) || (a instanceof Array && a.length === 0) || ((typeof a === "string" || a instanceof String) && a === '');
      },
      sortValue: function(a, b, ascending) {
        var val;
        if (ascending == null) {
          ascending = true;
        }
        if ((a == null) && (b == null)) {
          val = 0;
        } else if (a == null) {
          val = 1;
        } else if (b == null) {
          val = -1;
        } else {
          val = a > b ? 1 : (a < b ? -1 : 0);
        }
        if (!ascending) {
          val = val * -1;
        }
        return val;
      },
      sortValueIgnoreArticles: function(a, b, ascending) {
        if (ascending == null) {
          ascending = true;
        }
        if (typeof a === "string" || a instanceof String) {
          a = a.replace(/^((the)|a)\s+/i, "");
        }
        if (typeof b === "string" || b instanceof String) {
          b = b.replace(/^((the)|a)\s+/i, "");
        }
        return Utils.sortValue(a, b, ascending);
      },
      zeropad: (function(_this) {
        return function(str, size) {
          var s;
          s = str + "";
          while (s.length < size) {
            s = "0" + s;
          }
          return s;
        };
      })(this)
    };
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/core/util/utils.js.map