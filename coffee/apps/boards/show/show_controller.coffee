# `sj` is our namespace. Everything should be in `sj` to avoid name conflicts.
sj = window.sj = (window.sj or {})

sj.SJAppManager.module 'Boards.Show', (Show, SJAppManager, Backbone, Marionette, $, _) ->
    Show.Controller = 
        showBoard: (id) ->
            $.when(SJAppManager.request('entities:boards'), SJAppManager.request('entities:lists', id)).done (boards, lists) ->
                boardView = new Show.BoardView 
                    model: boards.findWhere(id: id)
                    collection: lists
                SJAppManager.mainRegion.show boardView