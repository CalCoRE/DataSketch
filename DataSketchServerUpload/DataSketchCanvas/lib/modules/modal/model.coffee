define (require) ->
  Model = require 'core/model/model'
  Utils = require 'core/util/utils'

  defaults =
    pages: []
    isOpen: false

  class ModalModel extends Model
    constructor: (config) ->
      config.defaults = Utils.ensureDefaults config.defaults, defaults
      super config

    open: () =>
      @set 'isOpen', true

    close: () =>
      @set 'isOpen', false

    pushPage: (content) =>
      pages = @get 'pages'
      pages.push content
      @set 'pages', pages

    popPage: () =>
      pages = @get 'pages'
      pages.pop()
      @set 'pages', pages

    display: (content) =>
      @set 'pages', [content]
      @open()