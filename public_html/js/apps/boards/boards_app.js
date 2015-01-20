(function() {
  var sj,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  sj = window.sj = window.sj || {};

  sj.SJAppManager.module('Boards', function(Boards, SJAppManager, Backbone, Marionette, $, _) {
    var routesController;
    Boards.RoutesController = (function() {
      function RoutesController() {}

      RoutesController.prototype.listBoards = function() {
        return SJAppManager.module('Boards.List').Controller.listBoards();
      };

      RoutesController.prototype.showBoard = function(id) {
        return SJAppManager.module('Boards.Show').Controller.showBoard(id);
      };

      RoutesController.prototype.showCard = function(id) {
        return SJAppManager.module('Boards.Card').Controller.showCard(id);
      };

      return RoutesController;

    })();
    Boards.Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        return Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.appRoutes = {
        'boards': 'listBoards',
        'boards/:id': 'showBoard',
        'cards/:id': 'showCard'
      };

      return Router;

    })(Marionette.AppRouter);
    routesController = new Boards.RoutesController();
    SJAppManager.on('boards:list', function() {
      SJAppManager.navigate('boards');
      return routesController.listBoards();
    });
    SJAppManager.on('boards:show', function(id) {
      SJAppManager.navigate("boards/" + id);
      return routesController.showBoard(id);
    });
    SJAppManager.on('card:show', function(id) {
      SJAppManager.navigate("cards/" + id);
      return routesController.showCard(id);
    });
    return SJAppManager.addInitializer(function() {
      return new Boards.Router({
        controller: routesController
      });
    });
  });

}).call(this);
