# HookManager
# ===========

# A static class to handle synchronous responses. The primary goal of this class
# is to provide a standard way to allow for customization.

# The main difference between hooks and events are that they are responses and
# reactions, respectively. Events are listening for the completion of a process,
# so that they can react appropriately. Hooks are a openings to inject code in
# the middle of a process, to alter it in some way. As such, hooks are
# necessarily synchronous, whereas events are not.


define (require) ->
  class HookManager
    constructor: () ->
      @_hooks = {}

    
# Public API
# ----------

# `hook(hookName, callback, priority = 0)`

# Ties a callback to a named hook. Priority allows for fine-grained control
# over the ordering of callbacks. High valued priority (e.g. 10.7) occurs
# before low valued (e.g. -8).
    
    hook: (hookName, callback, priorty = 0) =>
      @_hooks[hookName] ?= []
      @_hooks[hookName].push
        callback: callback
        priorty: priorty

    
# `invoke(hookName, subject, args...)`

# Invokes a hook by name. The `subject` argument is the object to be modified
# and returned by the callbacks. If multiple values are required, `subject`
# should be an object or array.
    
    invoke: (hookName, subject, meta = {}) =>
      if @_hooks[hookName]?
        @_hooks[hookName].sort (a,b) ->
          b.priorty - a.priorty
        for hook in @_hooks[hookName]
          subject = hook.callback.call null, subject, meta
      return subject

  new HookManager