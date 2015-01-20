(function() {
  var sj,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  sj = window.sj = window.sj || {};

  sj.SJAppManager.module('Entities', function(Entities, SJAppManager, Backbone, Marionette, $, _) {
    var Common, getCard, getCards;
    Common = SJAppManager.module('Entities.Common');
    Entities.Card = (function(_super) {
      __extends(Card, _super);

      function Card() {
        return Card.__super__.constructor.apply(this, arguments);
      }

      Card.prototype.path = 'cards';

      return Card;

    })(Common.TrelloAPIModel);
    Entities.Cards = (function(_super) {
      __extends(Cards, _super);

      function Cards() {
        return Cards.__super__.constructor.apply(this, arguments);
      }

      Cards.prototype.path = 'lists';

      Cards.prototype.model = Entities.Card;

      return Cards;

    })(Common.TrelloAPICollection);
    getCards = function(list_id) {
      var defer, lists;
      defer = $.Deferred();
      lists = new Entities.Cards();
      lists.path = "lists/" + list_id + "/cards";
      lists.fetch({
        data: {
          filter: 'open'
        },
        success: function(collection, response, options) {
          return defer.resolve(lists);
        }
      });
      return defer.promise();
    };
    getCard = function(card_id) {
      var card, defer;
      defer = $.Deferred();
      card = new Entities.Card({
        id: card_id
      });
      card.path = 'cards';
      card.fetch({
        data: {
          checkItemStates: true,
          list: true,
          list_fields: 'idBoard,name'
        },
        success: function(model, response, options) {
          return defer.resolve(card);
        }
      });
      return defer.promise();
    };
    SJAppManager.reqres.setHandler('entities:cards', function(list_id) {
      return getCards(list_id);
    });
    return SJAppManager.reqres.setHandler('entities:card', function(card_id) {
      return getCard(card_id);
    });
  });

}).call(this);
