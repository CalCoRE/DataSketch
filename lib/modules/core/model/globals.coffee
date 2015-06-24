# Globals
# =======

# A singleton instance of a Model, used to manage global data.

define (require) ->
  Model = require './model'

  class Globals extends Model
    constructor: () ->
      super
        data: {}
        defaults: {}
  
# Having the module return an instance of the class effectively makes the
# class a singleton without jumping through the hoops of calling
# `Globals.instance()`
  
  new Globals