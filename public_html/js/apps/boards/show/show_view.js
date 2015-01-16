(function() {
  var sj,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  sj = window.sj = window.sj || {};

  sj.SJAppManager.module('Boards.Show', function(Show, SJAppManager, Backbone, Marionette, $, _) {
    var Entities;
    Entities = SJAppManager.module('Entities');
    Show.ListItemView = (function(_super) {
      __extends(ListItemView, _super);

      function ListItemView() {
        return ListItemView.__super__.constructor.apply(this, arguments);
      }

      ListItemView.prototype.template = '#card-item-template';

      ListItemView.prototype.className = 'columns small-12 list-item';

      ListItemView.prototype.tagName = 'li';

      return ListItemView;

    })(Marionette.ItemView);
    Show.ListCompositeView = (function(_super) {
      __extends(ListCompositeView, _super);

      function ListCompositeView() {
        return ListCompositeView.__super__.constructor.apply(this, arguments);
      }

      ListCompositeView.prototype.template = '#list-template';

      ListCompositeView.prototype.childViewContainer = '.list-items';

      ListCompositeView.prototype.childView = Show.ListItemView;

      ListCompositeView.prototype.className = 'columns medium-6 medium-offset-3 small-12';

      ListCompositeView.prototype.initialize = function(options) {
        var _ref;
        ListCompositeView.__super__.initialize.apply(this, arguments);
        return this.collection = new Entities.Cards(options != null ? (_ref = options.model) != null ? _ref.get('cards') : void 0 : void 0);
      };

      ListCompositeView.prototype.render = function() {
        ListCompositeView.__super__.render.apply(this, arguments);
        return this.sortable = new Sortable(this.$(this.childViewContainer).get(0), {
          group: 'trello-list',
          draggable: '.list-item',
          ghostClass: 'ghost'
        });
      };

      return ListCompositeView;

    })(Marionette.CompositeView);
    return Show.BoardView = (function(_super) {
      __extends(BoardView, _super);

      function BoardView() {
        return BoardView.__super__.constructor.apply(this, arguments);
      }

      BoardView.prototype.template = '#board-template';

      BoardView.prototype.childViewContainer = '.lists';

      BoardView.prototype.childView = Show.ListCompositeView;

      BoardView.prototype.className = 'row';

      return BoardView;

    })(Marionette.CompositeView);
  });

}).call(this);
