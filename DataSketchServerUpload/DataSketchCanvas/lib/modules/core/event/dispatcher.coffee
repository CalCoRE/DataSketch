# Event Dispatcher
# ================

# Base class for dispatching [Event](./event.html)s. Expect pretty much every
# class to have this somewhere in its inheritence chain.

define (require) ->
  Event = require './event'

  class EventDispatcher
    
# Public API
# ==========

# `addEventListener(eventName, callback)`

# Registers a callback function to be called when an event with the specified
# name is fired by this object. This callback is considered to be "listening" for
# that event.

# The callback should expect a single argument, which will be an
# [Event](./event.html) object.

# There are two points to note:

# 1. The same callback set to listen for the same event will only be called
#   once.
# 2. Since lambda functions are always considered to be different with each
#   declaration, they should not be used as callbacks for events.
    
    addEventListener: (evtName, callback) =>
      #lazily create the listener collections
      @__listeners ?= {}
      @__listeners[evtName] ?= []
      @__listeners[evtName].push callback unless @__listeners[evtName].indexOf(callback) >= 0
      @

    
# `removeEventListener(eventName, callback)`

# Stops a listener from listening to the specified event.
    
    removeEventListener: (evtName, callback) =>
      if @__listeners? and @__listeners[evtName] and callback in @__listeners[evtName]
        @__listeners[evtName].splice @__listeners[evtName].indexOf(callback), 1
      @

    
# `dispatchEvent(event)`, `dispatchEvent(eventName, data = {}, bubbles = false)`

# Fires an event, calling all of the callbacks in the order they were added.
# If the first argument is a string, then it is assumed to be the event's name,
# and a proper Event object is created on the fly.

# Once all callbacks bound to the specific event name are fired, callbacks bound
# to all event using the wildcard ("*") name are fired.
    
    dispatchEvent: (evt, data = {}, bubbles = false) =>
      if @__listeners?
        if typeof evt == "string"
          evt = new Event evt, data, bubbles

        evt.target ?= @
        evt.currentTarget = @
        for key in [evt.name, "*"]
          if @__listeners[key]?
            listeners = @__listeners[key].slice 0
            cb(evt) for cb in listeners
      @
    
# API Aliases
# ===========
# `on(eventName, callback)`

# Shorthand for `addEventListener`.
    
    on: (args...) =>
      @addEventListener.apply(@, args)
    
# `off(eventName, callback)`

# Shorthand for `removeEventListener`.
    
    off: (args...) =>
      @addEventListener.apply(@, args)
    
# `fire(event)`, `fire(eventName, data = {}, bubbles = false)`

# Shorthand for `dispatchEvent`.
    
    fire: (args...) =>
      @dispatchEvent.apply(@, args)

    
# Utilities
# =========

# `bubbleEvent(event)`

# Event listener to fire any bubbling events. Normal usage of this looks
# something like the following:

#     child.addEventListener "*", parent.bubbleEvent

# This allows the parent to fire any events that the child fires up the chain,
# restricted only to the events that are specified to bubble.
    
    bubbleEvent: (evt) =>
      if evt.bubbles
        @dispatchEvent(evt)
