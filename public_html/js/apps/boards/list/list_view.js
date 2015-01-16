(function() {
  var sj,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  sj = window.sj = window.sj || {};

  sj.SJAppManager.module('Boards.List', function(List, SJAppManager, Backbone, Marionette, $, _) {
    List.BoardView = (function(_super) {
      __extends(BoardView, _super);

      function BoardView() {
        return BoardView.__super__.constructor.apply(this, arguments);
      }

      BoardView.prototype.template = '#board-list-item-template';

      BoardView.prototype.tagName = 'li';

      BoardView.prototype.className = 'columns small-12';

      BoardView.prototype.triggers = {
        'click': 'boards:show'
      };

      return BoardView;

    })(Marionette.ItemView);
    return List.BoardsCollectionView = (function(_super) {
      __extends(BoardsCollectionView, _super);

      function BoardsCollectionView() {
        return BoardsCollectionView.__super__.constructor.apply(this, arguments);
      }

      BoardsCollectionView.prototype.childView = List.BoardView;

      BoardsCollectionView.prototype.tagName = 'ul';

      BoardsCollectionView.prototype.className = 'row';

      return BoardsCollectionView;

    })(Marionette.CollectionView);
  });

}).call(this);
