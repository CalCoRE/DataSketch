# Model
# =====

# A base class for models. Provides support for default-driven models

define (require) ->
  EventDispatcher = require 'core/event/dispatcher'
  Utils = require 'core/util/utils'

  defaults =
    data: {}
    defaults: {}

  class Model extends EventDispatcher
    
# `new Model({data: {}, defaults: {}})`

# The constructor accepts two parameters, the desired data object and the default
# data object. The merge of these two gets set to the private `@_data` attribute.
    
    constructor: (settings) ->
      settings = Utils.ensureDefaults(settings, defaults)
      @_data = Utils.ensureDefaults(settings.data, settings.defaults)

    
# Public API
# ----------

# `get(path, trace = false)`

# Returns the value found in `path`.

# This method drills down into `@_data` along the specified dot-separated path.
    
    get: (path, trace = false) =>
      parts = path.split '.'
      target = @_data

      targets = [target] if trace
      for part in parts
        if target.get? and target.get(part)?
          target = target.get part
        else if target[part]?
          target = target[part]
        else
          target = null
          break
        targets.push target if trace

      if trace
        targets
      else
        target
    
    
# `set(path, value)`

# Sets the value to the provided dot-separated path. If elements of the path do
# not currently exist, they are created as objects.
    
    set: (path, value, forceEvent = false) =>
      if value != @get(path)
        paths = path.split('.')
        target = @_data

        for part, i in paths
          if i == paths.length - 1
            if target.set?
              old = target.get(part)
              target.set(part, value)
            else
              old = target[part]
              if value == null
                target[part] = null
                delete target[part]
              else
                target[part] = value
            @dispatchEvent 'Model.Change', { path: path, value: value, old: old }, true
          else
            if target.get?
              if !target.get(part)
                target.set(part, {})
              target = target.get(part)
            else
              if !target[part]?
                target[part] = {}
              target = target[part]
      else if forceEvent or value instanceof Array
        @dispatchEvent 'Model.Change', { path: path, value: value }, true 

    
# `update(data)`

# Wholesale update of the model's data. This will only overwrite the keys defined
# by the provided update data object, and will not remove unrelated data.
    
    update: (data) =>
      for key, val of data
        if key == "id" and @_data.id?
          continue
        @_data[key] = val
      @dispatchEvent 'Model.Change', { path: null, value: data }, true

    

# Events
# ------

# `Model.Change`

# Fires whenever a value in the model is changed via the `set` method.

