define (require) ->
  DomView = require "core/view/dom_view"
  Template = require 'text!./scrubbar.html'

  require 'link!./style.css'

  class ScrubBarView extends DomView
    constructor: (animator) ->
      super Template

      animator.addEventListener "Animator.Tick", @_onTick

    _onTick: (evt) =>
      @$el.find('.nub').css
        left: "calc(" + ((evt.data.playhead / evt.data.total) * 80 + 10) + "% - 10px)"