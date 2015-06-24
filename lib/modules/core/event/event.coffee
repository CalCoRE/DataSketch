# Event
# =====

# Base class to represent application events.

define ->
  class Event
    constructor: (@name, @data = {}, @bubbles = false) ->
      @target = null
      @currentTarget = null

    stopPropagation: () =>
      @bubbles = false