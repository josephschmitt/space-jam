# `sj` is our namespace. Everything should be in `sj` to avoid name conflicts.
sj = window.sj = (window.sj or {})

sj.SJAppManager.module 'Boards.Card', (Card, SJAppManager, Backbone, Marionette, $, _) ->
	class Card.ItemView extends Marionette.ItemView
		template: '#card-view-template'
		className: 'row'