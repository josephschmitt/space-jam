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

      return RoutesController;

    })();
    Boards.Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        return Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.appRoutes = {
        'boards': 'listBoards'
      };

      return Router;

    })(Marionette.AppRouter);
    routesController = new Boards.RoutesController();
    SJAppManager.on('boards:list', function() {
      SJAppManager.navigate('boards');
      return routesController.listBoards();
    });
    return SJAppManager.addInitializer(function() {
      return new Boards.Router({
        controller: routesController
      });
    });
  });

}).call(this);
