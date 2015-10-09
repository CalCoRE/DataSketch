#
# Initialization
# ==============

# This file runs the initialization of require, and loads and runs the main
# entry point of the application.


# Require Configuration
# =====================

# For in-depth details about the configuration specs, please see RequireJS's
# [configuration documentation](http://requirejs.org/docs/api.html#config).
# For the current purpose, we will only point out items of interest.
#
require.config
  baseUrl: "./cslib"
# paths
# -----
  paths:
    core: "modules/core"
# * RequireJS plugins
    
#   `text` is a supported plugin for RequireJS that allows the loading of text
#   files as a requirement for JS code.

#   `link` is not supported, but functions similarly for CSS files. Note,
#   however, that there is no guarantee that CSS files will be loaded when the
#   JS code is run. For details on this, see the
#   [RequireJS FAQ](http://requirejs.org/docs/faq-advanced.html#css) on the
#   topic.
    text: "thirdparty/require-plugins/text-2.0.14"
    link: "thirdparty/require-plugins/link"
# * `jquery`
    
#   The name `jquery` (all lower case) is mandated by jQuery itself, as it
#   provides its own AMD wrapping.
    jquery: "thirdparty/jquery-2.1.4.min"
    data: "../data"
  shim:
    "thirdparty/modernizr-2.8.3":
      exports: "Modernizr"
    "thirdparty/fabric":
      exports: "fabric"
  config:
    text:
      useXhr: () ->
        true

require ['jquery', 'app'], ($, Main) ->
  main = new Main $('body')
  main.load()
    .then () ->
      main.init()
    .then () ->
      main.run()
  window.App = main