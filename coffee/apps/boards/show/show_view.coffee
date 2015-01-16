# `sj` is our namespace. Everything should be in `sj` to avoid name conflicts.
sj = window.sj = (window.sj or {})

sj.SJAppManager.module 'Boards.Show', (Show, SJAppManager, Backbone, Marionette, $, _) ->
	Entities = SJAppManager.module('Entities')

	class Show.ListItemView extends Marionette.ItemView
		template: '#card-item-template'
		className: 'columns small-12 list-item'
		tagName: 'li'

	class Show.ListCompositeView extends Marionette.CompositeView
		template: '#list-template'
		childViewContainer: '.list-items'
		childView: Show.ListItemView
		className: 'columns medium-6 medium-offset-3 small-12'
		initialize: (options) ->
			super
			@collection = new Entities.Cards options?.model?.get('cards')
		render: ->
			super
			@sortable = new Sortable @$(@childViewContainer).get(0),
				group: 'trello-list'
				draggable: '.list-item'
				ghostClass: 'ghost'

	class Show.BoardView extends Marionette.CompositeView
		template: '#board-template'
		childViewContainer: '.lists'
		childView: Show.ListCompositeView
		className: 'row'