(function() {
  require.config({
    baseUrl: "/cslib",
    paths: {
      core: "modules/core",
      text: "thirdparty/require-plugins/text-2.0.14",
      link: "thirdparty/require-plugins/link",
      jquery: "thirdparty/jquery-2.1.4.min"
    },
    shim: {
      "thirdparty/modernizr-2.8.3": {
        exports: "Modernizr"
      },
      "thirdparty/fabric": {
        exports: "fabric"
      }
    },
    config: {
      text: {
        useXhr: function() {
          return true;
        }
      }
    }
  });

  require(['jquery', 'app'], function($, Main) {
    var main;
    main = new Main($('body'));
    main.load().then(function() {
      return main.init();
    }).then(function() {
      return main.run();
    });
    return window.App = main;
  });

}).call(this);

//# sourceMappingURL=maps/init.js.map