(function() {
  var sj;

  sj = window.sj = window.sj || {};

  sj.SJAppManager.module('Boards.List', function(List, SJAppManager, Backbone, Marionette, $, _) {
    return List.Controller = {
      listBoards: function() {
        return $.when(SJAppManager.request('entities:boards')).done(function(boards) {
          var boardsView;
          boardsView = new List.BoardsCollectionView({
            collection: boards
          });
          return SJAppManager.mainRegion.show(boardsView);
        });
      }
    };
  });

}).call(this);
