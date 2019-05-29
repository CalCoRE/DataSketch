define (require) ->
  Module = require 'core/app/module'
  Model = require 'core/model/model'
  HM = require 'core/event/hook_manager'
  Globals = require 'core/model/globals'
  Canvas =require 'modules/datasketch/canvas/canvas'

  CalibrationForm = require './calibration/form'
  Modal = require 'modules/modal/modal'
  Animator = require '../../animator'  
  MappingAssignmentAction = require 'modules/datasketch/actions/mapping_assignment' 

  class AnimationProperty extends Module
    constructor: (settings) ->
      super()
      @_model = new Model
        data: settings
      HM.hook 'DataMapping.ObjectProperties', @_hookObjectProperties      

    getId: () =>
      @_model.get 'id'

    getName: () =>
      @_model.get 'name'

    _hookObjectProperties: (list, meta) =>
      list.push @
      list

    calibrate: () =>
      new Promise (resolve, reject) =>        
        form = @getCalibrationForm()
        
        Modal._view.addEventListener 'Form.Modal.CloseRequest', () =>
          ##this.removeTempPlayAnimation this

        form.addEventListener 'Form.Submit', () =>          
          Modal.close()
          
          resolve form.value()

        form.addEventListener 'Form.Cancel', () =>
          Modal.close()
          ##this.removeTempPlayAnimation this
          e = new Error "Calibration canceled"
          e.name = "FormCanceledError"
          reject e
        Modal.display form        
        
        ###
        #Event got triggered on change of max field        
        $('#max').change () =>          
          resolve form.value()
          #Set the min max value for animation in to model.          
          @_model.set 'max', form.value().max
          @_model.set 'min', form.value().min
          this.tempPlayAnimation()
        
        #Event got triggered on change of min field
        $('#min').change () =>          
          resolve form.value()
          #Set the min max value for animation in to model.
          @_model.set 'max', form.value().max
          @_model.set 'min', form.value().min
          this.tempPlayAnimation()
        ###
        
    getCalibrationForm: () =>
      canvas = new Canvas
      new CalibrationForm

    setPropertyValue: (object, calibration, percent) =>      

    #Method for playing animation on object for single time on change of an input field.
    tempPlayAnimation: () =>
        @_animator = new Animator
            canvas: Globals.get 'Canvas'
            datastore: Globals.get 'DataStore'
          @_animator.cache()
          @_animator._isLoop = false
          @_animator.reset()
          @_animator.restore()
          @_animator.play()

    #Remove the animation property mapping from an object.
    removeTempPlayAnimation: (_this) =>
        ##Remove last animation from object  
        object = _this._animator.settings.canvas.getSelectedObjects()
        objectProperty = _this                    
        object[0].removePropertyMapping objectProperty