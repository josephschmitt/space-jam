(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function() {
    var SpaceJamApplication, sj;
    sj = window.sj = window.sj || {};
    Backbone.Marionette.Renderer.render = function(template, data) {
      return _.template($(template).html(), data, {
        variable: 'data'
      });
    };
    SpaceJamApplication = (function(_super) {
      __extends(SpaceJamApplication, _super);

      function SpaceJamApplication() {
        this.dismissModal = __bind(this.dismissModal, this);
        this.showModal = __bind(this.showModal, this);
        return SpaceJamApplication.__super__.constructor.apply(this, arguments);
      }

      SpaceJamApplication.prototype.initialize = function() {
        SpaceJamApplication.__super__.initialize.apply(this, arguments);
        return this.addRegions({
          titlebarRegion: '#titlebar',
          mainRegion: {
            selector: '#main',
            regionClass: TransitionRegion
          },
          modalRegion: {
            selector: '#modal',
            regionClass: TransitionRegion
          }
        });
      };

      SpaceJamApplication.prototype.navigate = function(route, options) {
        if (options == null) {
          options = {};
        }
        return Backbone.history.navigate(route, options);
      };

      SpaceJamApplication.prototype.getCurrentRoute = function() {
        return Backbone.history.fragment;
      };

      SpaceJamApplication.prototype.showModal = function(view) {
        this.modalRegion.show(view);
        return this.modalRegion.$el.show();
      };

      SpaceJamApplication.prototype.dismissModal = function() {
        this.modalRegion.on('empty', (function(_this) {
          return function() {
            return _this.modalRegion.$el.hide();
          };
        })(this));
        return this.modalRegion.reset();
      };

      SpaceJamApplication.prototype.start = function() {
        SpaceJamApplication.__super__.start.apply(this, arguments);
        if (window.navigator.standalone) {
          $('body').addClass('standalone');
        }
        if (Backbone.history) {
          Backbone.history.start();
        }
        if (!this.getCurrentRoute()) {
          return this.trigger('boards:list');
        }
      };

      return SpaceJamApplication;

    })(Marionette.Application);
    return sj.SJAppManager = new SpaceJamApplication();
  })();

}).call(this);
