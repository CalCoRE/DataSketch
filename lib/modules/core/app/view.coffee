# Application View
# ================
# 
# Provides a default template for an application.

define (require) ->
  DomView = require 'core/view/dom_view'
  Template = require 'text!./app.html'

  class AppView extends DomView
    constructor: (tmpl) ->
      tmpl ?= Template
      super tmpl
      require 'jscolor'