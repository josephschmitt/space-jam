(function() {
  var sj,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  sj = window.sj = window.sj || {};

  sj.SJAppManager.module('Entities', function(Entities, SJAppManager, Backbone, Marionette, $, _) {
    var getLists;
    Entities.List = (function(_super) {
      __extends(List, _super);

      function List() {
        return List.__super__.constructor.apply(this, arguments);
      }

      List.prototype.path = 'lists';

      return List;

    })(Entities.Common.TrelloAPIModel);
    Entities.Lists = (function(_super) {
      __extends(Lists, _super);

      function Lists() {
        return Lists.__super__.constructor.apply(this, arguments);
      }

      Lists.prototype.path = 'boards';

      Lists.prototype.model = Entities.List;

      return Lists;

    })(Entities.Common.TrelloAPICollection);
    getLists = function(board_id) {
      var defer, lists;
      defer = $.Deferred();
      lists = new Entities.Lists();
      lists.path = "boards/" + board_id + "/lists";
      lists.fetch({
        data: {
          filter: 'open',
          cards: 'open',
          card_fields: 'name,labels'
        },
        success: function(collection, response, options) {
          return defer.resolve(lists);
        }
      });
      return defer.promise();
    };
    return SJAppManager.reqres.setHandler('entities:lists', function(board_id) {
      return getLists(board_id);
    });
  });

}).call(this);
