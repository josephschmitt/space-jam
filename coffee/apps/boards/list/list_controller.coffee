# `sj` is our namespace. Everything should be in `sj` to avoid name conflicts.
sj = window.sj = (window.sj or {})

sj.SJAppManager.module 'Boards.List', (List, SJAppManager, Backbone, Marionette, $, _) ->
    List.Controller = 
        listBoards: ->
            $.when(SJAppManager.request('entities:boards')).done (boards) ->
                boardsView = new List.BoardsCollectionView collection: boards
                boardsView.on 'childview:boards:show', (childView, args) -> 
                    SJAppManager.trigger 'boards:show', args.model.get('id')

                SJAppManager.mainRegion.show boardsView