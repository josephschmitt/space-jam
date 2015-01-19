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

      ListItemView.prototype.ui = {
        checkbox: 'input[type="checkbox"]'
      };

      ListItemView.prototype.events = {
        'change @ui.checkbox': 'change',
        'drag:end': 'dragend'
      };

      ListItemView.prototype.render = function() {
        ListItemView.__super__.render.apply(this, arguments);
        return this.$el.attr('data-pos', this.model.get('pos'));
      };

      ListItemView.prototype.change = function(e) {
        return this.model.save({
          closed: this.ui.checkbox.prop('checked')
        });
      };

      ListItemView.prototype.dragend = function(e, drag) {
        var $next, $prev, pos;
        $next = this.$el.next(this.tagName);
        $prev = this.$el.prev(this.tagName);
        pos = drag.newIndex === 0 ? 'top' : $next.length ? $next.data('pos') - 1 : 'bottom';
        if (pos === $prev.data('pos')) {
          pos += 0.5;
        }
        return this.model.save({
          pos: pos,
          idList: this.$el.parent('ul').data('id')
        });
      };

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

      ListCompositeView.prototype.className = 'row';

      ListCompositeView.prototype.initialize = function(options) {
        var _ref;
        ListCompositeView.__super__.initialize.apply(this, arguments);
        return this.collection = new Entities.Cards(options != null ? (_ref = options.model) != null ? _ref.get('cards') : void 0 : void 0);
      };

      ListCompositeView.prototype.render = function() {
        var _ref;
        ListCompositeView.__super__.render.apply(this, arguments);
        if ((_ref = this.sortable) != null) {
          _ref.destroy();
        }
        return this.sortable = new Sortable(this.$(this.childViewContainer).get(0), {
          group: 'trello-list',
          draggable: '.list-item',
          ghostClass: 'ghost',
          handle: '.handle',
          onEnd: function(e) {
            return $(e.item).trigger('drag:end', e);
          }
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

      return BoardView;

    })(Marionette.CompositeView);
  });

}).call(this);
