# View
# ====

# A base class for all views, regardless of rendering method (e.g. html vs
# canvas).

define (require) ->
  Parent = require 'core/util/parent'

  class View extends Parent
