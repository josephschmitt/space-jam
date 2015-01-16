# `sj` is our namespace. Everything should be in `sj` to avoid name conflicts.
sj = window.sj = (window.sj or {})

sj.SJAppManager.module 'Boards.List', (List, SJAppManager, Backbone, Marionette, $, _) ->
	class List.BoardView extends Marionette.ItemView
		template: '#board-list-item-template'
		tagName: 'li'
		triggers:
			'click': 'boards:show'

	class List.BoardsCollectionView extends Marionette.CollectionView
		childView: List.BoardView
		tagName: 'ul'