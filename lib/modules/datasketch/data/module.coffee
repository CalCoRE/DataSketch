define (require) ->
  Module = require 'core/app/module'
  Globals = require 'core/model/globals'
  PapaParse = require 'thirdparty/papaparse'

  DataStore = require './models/datastore'
  DataTableView = require './views/table'

  class DSCanvas extends Module
    constuctor: () ->

    listPreload: () =>
      list = super()
      list.push "text!#{window.DataSketchConfig.dataSource}"
      list

    handlePreload: (csv) =>
      d = PapaParse.parse csv,
        header: true
        dynamicTyping: true

      ds = new DataStore
        rows: d.data
        headers: d.meta.fields

      Globals.set 'DataStore', ds

    init: () =>

    run: () =>
      dt = new DataTableView Globals.get('DataStore')
      Globals.get('App.view').addChild dt