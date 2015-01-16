(function() {
  var sj,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  sj = window.sj = window.sj || {};

  sj.SJAppManager.module('Entities', function(Entities, SJAppManager, Backbone, Marionette, $, _) {
    var Common, getLists;
    Common = SJAppManager.module('Entities.Common');
    Entities.List = (function(_super) {
      __extends(List, _super);

      function List() {
        return List.__super__.constructor.apply(this, arguments);
      }

      List.prototype.path = 'lists';

      return List;

    })(Common.TrelloAPIModel);
    Entities.Lists = (function(_super) {
      __extends(Lists, _super);

      function Lists() {
        return Lists.__super__.constructor.apply(this, arguments);
      }

      Lists.prototype.path = 'boards';

      Lists.prototype.model = Entities.List;

      Lists.prototype.parse = function(response, options) {
        return _.reject(response, function(list) {
          var _ref;
          return !((_ref = list.cards) != null ? _ref.length : void 0);
        });
      };

      return Lists;

    })(Common.TrelloAPICollection);
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
          lists.reject;
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
