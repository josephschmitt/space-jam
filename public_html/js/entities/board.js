(function() {
  var sj,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  sj = window.sj = window.sj || {};

  sj.SJAppManager.module('Entities.Board', function(Board, SJAppManager, Backbone, Marionette, $, _) {
    var Boards, Common, getBoards;
    Common = SJAppManager.module('Entities.Common');
    Board = (function(_super) {
      __extends(Board, _super);

      function Board() {
        return Board.__super__.constructor.apply(this, arguments);
      }

      Board.prototype.path = 'boards';

      return Board;

    })(Common.TrelloAPIModel);
    Boards = (function(_super) {
      __extends(Boards, _super);

      function Boards() {
        return Boards.__super__.constructor.apply(this, arguments);
      }

      Boards.prototype.path = 'members/me/boards';

      Boards.prototype.model = Board;

      return Boards;

    })(Common.TrelloAPICollection);
    getBoards = function() {
      var boards, defer;
      defer = $.Deferred();
      boards = new Boards();
      boards.fetch({
        success: function(collection, response, options) {
          return defer.resolve(boards);
        }
      });
      return defer.promise();
    };
    return SJAppManager.reqres.setHandler('entities:boards', function() {
      return getBoards();
    });
  });

}).call(this);
