(function() {
  var sj,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  sj = window.sj = window.sj || {};

  sj.SJAppManager.module('Entities.Common', function(Common, SJAppManager, Backbone, Marionette, $, _) {
    var apiEndpoint, apiKey, apiVersion;
    apiKey = '3d424960cec9c7085488d27d1307146a';
    apiEndpoint = 'https://api.trello.com';
    apiVersion = '1';
    Common.TrelloAPIModel = (function(_super) {
      __extends(TrelloAPIModel, _super);

      function TrelloAPIModel() {
        return TrelloAPIModel.__super__.constructor.apply(this, arguments);
      }

      TrelloAPIModel.prototype.apiBase = "" + apiEndpoint + "/" + apiVersion;

      TrelloAPIModel.prototype.idAttribute = 'id';

      TrelloAPIModel.prototype.urlRoot = function() {
        return "" + this.apiBase + "/" + this.path;
      };

      TrelloAPIModel.prototype.sync = function(method, model, options) {
        var methodsMap, xhr;
        if (options == null) {
          options = {};
        }
        methodsMap = {
          'create': 'POST',
          'update': 'PUT',
          'read': 'GET',
          'delete': 'DELETE'
        };
        xhr = Trello.rest(methodsMap[method], "" + this.path + "/" + this.id, model.attributes);
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

      TrelloAPICollection.prototype.apiBase = "" + apiEndpoint + "/" + apiVersion;

      TrelloAPICollection.prototype.model = Common.TrelloAPIModel;

      TrelloAPICollection.prototype.url = function() {
        return "" + this.apiBase + "/" + this.path;
      };

      TrelloAPICollection.prototype.sync = function(method, model, options) {
        if (options == null) {
          options = {};
        }
        options = _.extend(options, {
          dataType: 'jsonp',
          type: 'GET'
        });
        if (options.data) {
          options.data = _.extend(options.data, {
            _method: method,
            key: apiKey,
            token: Trello.token()
          });
        }
        return TrelloAPICollection.__super__.sync.call(this, method, model, options);
      };

      return TrelloAPICollection;

    })(Backbone.Collection);
  });

}).call(this);
