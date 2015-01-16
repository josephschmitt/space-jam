# `sj` is our namespace. Everything should be in `sj` to avoid name conflicts.
sj = window.sj = (window.sj or {})

sj.SJAppManager.module 'Boards', (Boards, SJAppManager, Backbone, Marionette, $, _) ->
	class Boards.RoutesController
		listBoards: ->
			SJAppManager.module('Boards.List').Controller.listBoards()
		showBoard: (id) ->
			SJAppManager.module('Boards.Show').Controller.showBoard(id)

	class Boards.Router extends Marionette.AppRouter
		appRoutes:
			'boards': 'listBoards'
			'boards/:id': 'showBoard'

	routesController = new Boards.RoutesController()

	SJAppManager.on 'boards:list', ->
		SJAppManager.navigate('boards')
		routesController.listBoards()

	SJAppManager.on 'boards:show', (id) ->
		# console.log 'boards:show', arguments
		SJAppManager.navigate("boards/#{id}")
		routesController.showBoard(id)

	SJAppManager.addInitializer ->
		new Boards.Router controller: routesController