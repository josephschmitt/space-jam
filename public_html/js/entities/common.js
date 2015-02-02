(function() {
  var sj,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  sj = window.sj = window.sj || {};

  sj.SJAppManager.module('Entities.Common', function(Common, SJAppManager, Backbone, Marionette, $, _) {
    Common.TrelloAPIModel = (function(_super) {
      __extends(TrelloAPIModel, _super);

      function TrelloAPIModel() {
        return TrelloAPIModel.__super__.constructor.apply(this, arguments);
      }

      TrelloAPIModel.prototype.idAttribute = 'id';

      TrelloAPIModel.prototype.sync = function(method, model, options) {
        var methodsMap, requestData, xhr;
        if (options == null) {
          options = {};
        }
        methodsMap = {
          'create': 'POST',
          'update': 'PUT',
          'read': 'GET',
          'delete': 'DELETE'
        };
        requestData = method === 'read' ? options.data : model.toJSON();
        xhr = Trello.rest(methodsMap[method], "" + this.path + "/" + this.id, requestData, options.success, options.error);
        model.trigger('request', model, xhr, options);
        return xhr;
      };

      return TrelloAPIModel;

    })(Backbone.Model);
    return Common.TrelloAPICollection = (function(_super) {
      __extends(TrelloAPICollection, _super);

      function TrelloAPICollection() {
        return TrelloAPICollection.__super__.constructor.apply(this, arguments);
      }

      TrelloAPICollection.prototype.model = Common.TrelloAPIModel;

      TrelloAPICollection.prototype.sync = function(method, collection, options) {
        var methodsMap, requestData, xhr;
        if (options == null) {
          options = {};
        }
        methodsMap = {
          'create': 'POST',
          'update': 'PUT',
          'read': 'GET',
          'delete': 'DELETE'
        };
        requestData = method === 'read' ? options.data : collection.toJSON();
        xhr = Trello.rest(methodsMap[method], "" + this.path, requestData, options.success, options.error);
        collection.trigger('request', collection, xhr, options);
        return xhr;
      };

      return TrelloAPICollection;

    })(Backbone.Collection);
  });

}).call(this);
