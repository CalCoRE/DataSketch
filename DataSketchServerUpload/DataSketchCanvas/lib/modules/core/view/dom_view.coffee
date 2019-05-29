# DomView
# =======
#
# Base class for HTML templated views.

define (require) ->
  View = require './view'
  $ = require 'jquery'

  class DomView extends View
    
# `new DomView(template)`
#
# Creates a new DomView with the provided template. The template is expected to
# be one of two formats: either an HTML string, or a jQuery object.
#
# Typical class extension is as follows:
#
#     define (require) ->
#       template = require 'text!templates/path/to/template.html'
# 
#       class ThingView extends DomView
#         constructor: () ->
#           super template
    
    constructor: (tmpl) ->
      super()
      @$el = if typeof tmpl is "string" then $($.parseHTML(tmpl)) else $(tmpl)
    
    
# Public API
# ----------

# `addChild(child, destination)`
#
# Defers to the parent class (ultimately, the Parent class) to handle general
# child management, and appends the child dom to this view's dom, at the
# destination if provided.
    
    addChild: (child, destination) =>
      super child
      target = if destination? then @$el.find(destination).first() else @$el
      target.append child.$dom()

    
# `removeChild(child)`
#
# Defers to the parent class (ultimately, the Parent class) to handle general
# child management, and removes the child dom from this view's dom.
    
    removeChild: (child) =>
      super child
      if $.contains(@dom(), child.dom())
        
# We use jQuery's detach method in order to retain any event listeners 
# the child may have set on its own dom.
        
        child.$dom().detach()

    
# `$dom()`
#
# Returns the jQuery object wrapped around the view's dom. Replaced the previous,
# confusing `view()` method (there was a lot of view.view()).
    
    $dom: () =>
      @$el

    
# `dom()`
#
# Returns the core DOM object of the view.
    
    dom: () =>
      @$el[0]

# `show()`
#
# Reveals the dom element. Currently utilizes jQuery's own show() method.

    show: () =>
      @$el.show()

# `hide()`
#
# Reveals the dom element. Currently utilizes jQuery's own hide() method.

    hide: () =>
     @$el.hide()

# `bounds()`
#
# Returns an object containing the bounds of the element, in the following form:

#     {
#       left: (float)
#       top: (float)
#       width: (float)
#       height: (float)
#     }
    bounds: () =>
      bounds = @$el.offset()
      bounds.width = @$el.outerWidth()
      bounds.height = @$el.outerHeight()
      bounds