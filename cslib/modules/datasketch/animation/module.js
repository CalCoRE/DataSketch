(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var AnimationModule, Animator, ColorProperty, Globals, HM, HeightProperty, HorizontalPositionProperty, ModeSelectTool, Module, RotationProperty, ScaleProperty, ScrubBar, TransparencyProperty, VerticalPositionProperty, WidthProperty;
    Module = require('core/app/module');
    HM = require('core/event/hook_manager');
    Globals = require('core/model/globals');
    VerticalPositionProperty = require('./properties/y/module');
    HorizontalPositionProperty = require('./properties/x/module');
    WidthProperty = require('./properties/width/module');
    HeightProperty = require('./properties/height/module');
    RotationProperty = require('./properties/rotation/module');
    ColorProperty = require('./properties/color/module');
    ScaleProperty = require('./properties/scale/module');
    TransparencyProperty = require('./properties/transparency/module');
    Animator = require('./animator');
    ModeSelectTool = require('modules/datasketch/tools/mode/tool');
    ScrubBar = require('./scrubbar/scrubbar');
    require('link!./style.css');
    AnimationModule = (function(superClass) {
      extend(AnimationModule, superClass);

      function AnimationModule() {
        this._onModeChange = bind(this._onModeChange, this);
        this._toolbarTools = bind(this._toolbarTools, this);
        this.run = bind(this.run, this);
        this.init = bind(this.init, this);
        AnimationModule.__super__.constructor.apply(this, arguments);
      }

      AnimationModule.prototype.init = function() {
        this._animator = new Animator({
          canvas: Globals.get('Canvas'),
          datastore: Globals.get('DataStore')
        });
        this._scrubbar = new ScrubBar(this._animator);
        return HM.hook('Toolbar.Tools', this._toolbarTools);
      };

      AnimationModule.prototype.run = function() {
        Globals.get('Canvas').addEventListener('Canvas.ModeChange', this._onModeChange);
        return Globals.get('App.view').addChild(this._scrubbar);
      };

      AnimationModule.prototype._toolbarTools = function(list, meta) {
        if (meta.id === "mode") {
          list.push(new ModeSelectTool("animate"));
        }
        return list;
      };

      AnimationModule.prototype._onModeChange = function(evt) {
        if (evt.currentTarget.getMode() === "animate") {
          Globals.get('Canvas').selectObjects([]);
          Globals.get('Canvas').disableControls();
          this._animator.cache();
          this._animator.reset();
          this._animator.play();
          return this._scrubbar.show();
        } else if (evt.data.last === "animate") {
          this._animator.pause();
          this._animator.reset();
          this._animator.restore();
          return this._scrubbar.hide();
        }
      };

      return AnimationModule;

    })(Module);
    AnimationModule.requires = [HorizontalPositionProperty, VerticalPositionProperty, WidthProperty, HeightProperty, RotationProperty, ScaleProperty, ColorProperty, TransparencyProperty];
    return AnimationModule;
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/animation/module.js.map