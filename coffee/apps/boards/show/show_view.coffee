# `sj` is our namespace. Everything should be in `sj` to avoid name conflicts.
sj = window.sj = (window.sj or {})

sj.SJAppManager.module 'Boards.Show', (Show, SJAppManager, Backbone, Marionette, $, _) ->
	Entities = SJAppManager.module('Entities')

	class Show.ListItemView extends Marionette.ItemView
		template: '#card-item-template'

	class Show.ListCompositeView extends Marionette.CompositeView
		template: '#list-template'
		childViewContainer: '.list-items'
		childView: Show.ListItemView
		initialize: (options) ->
			super
			@collection = new Entities.Cards options?.model?.get('cards')

	class Show.BoardView extends Marionette.CompositeView
		template: '#board-template'
		childViewContainer: '.lists'
		childView: Show.ListCompositeView