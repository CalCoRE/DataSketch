# Parent
# ======

# A generic container class. Parents maintain an array of children, and they
# bubble any events that their children fire.

define (require) ->
  EventDispatcher = require 'core/event/dispatcher'

  class Parent extends EventDispatcher
    constructor: () ->
      super
      @_children = []

    
# Public API
# ----------

# `addChild(child)`

# Adds the provided child to the parent's list of children. If the child belonged
# to a different parent, that relationship is dropped in favor of the new one.
    
    addChild: (child) =>
      if child not in @_children
        child.parent.removeChild(child) if child.parent
        child.parent = @
        child.addEventListener '*', @bubbleEvent
        @_children.push child
        @dispatchEvent 'Parent.ChildAdded', { child: child }, true
      @

    
# `removeChild(child)`

# Removes the specified child from teh parent's list of children. This also drops
# the event bubbler.
    
    removeChild: (child) =>
      if child in @_children
        child.parent = null
        child.removeEventListener '*', @bubbleEvent
        @_children.splice @_children.indexOf(child), 1
        @dispatchEvent 'Parent.ChildRemoved', { child: child }, true
      @

    
# Events
# ------

# `Parent.ChildAdded`

# Fires whenever a child is added. Data payload contains the `child` in question.

# `Parent.ChildRemoved`

# Fires whenever a child is removed. Data payload contains the `child` in
# question.
