(function() {
  var sj;

  sj = window.sj = window.sj || {};

  sj.SJAppManager.module('Boards.Card', function(Card, SJAppManager, Backbone, Marionette, $, _) {
    return Card.Controller = {
      showCard: function(id) {
        return $.when(SJAppManager.request('entities:card', id)).done(function(card) {
          var cardView;
          cardView = new Card.ItemView({
            model: card
          });
          return SJAppManager.mainRegion.show(cardView);
        });
      }
    };
  });

}).call(this);
