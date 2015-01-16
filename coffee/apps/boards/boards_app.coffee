# `sj` is our namespace. Everything should be in `sj` to avoid name conflicts.
sj = window.sj = (window.sj or {})

sj.SJAppManager.module 'Boards', (Boards, SJAppManager, Backbone, Marionette, $, _) ->
	class Boards.RoutesController
		listBoards: ->
			SJAppManager.module('Boards.List').Controller.listBoards()

	class Boards.Router extends Marionette.AppRouter
		appRoutes:
			'boards': 'listBoards'

	routesController = new Boards.RoutesController()

	SJAppManager.on 'boards:list', ->
		SJAppManager.navigate('boards')
		routesController.listBoards()

	SJAppManager.addInitializer ->
		new Boards.Router controller: routesController