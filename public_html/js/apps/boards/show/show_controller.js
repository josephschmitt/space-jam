(function() {
  var sj;

  sj = window.sj = window.sj || {};

  sj.SJAppManager.module('Boards.Show', function(Show, SJAppManager, Backbone, Marionette, $, _) {
    return Show.Controller = {
      showBoard: function(id) {
        return $.when(SJAppManager.request('entities:boards'), SJAppManager.request('entities:lists', id)).done(function(boards, lists) {
          var boardView;
          boardView = new Show.BoardView({
            model: boards.findWhere({
              id: id
            }),
            collection: lists
          });
          return SJAppManager.mainRegion.show(boardView);
        });
      }
    };
  });

}).call(this);
