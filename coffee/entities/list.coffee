# `sj` is our namespace. Everything should be in `sj` to avoid name conflicts.
sj = window.sj = (window.sj or {})

sj.SJAppManager.module 'Entities', (Entities, SJAppManager, Backbone, Marionette, $, _) ->
    class Entities.List extends Entities.Common.TrelloAPIModel
        path: 'lists'

    class Entities.Lists extends Entities.Common.TrelloAPICollection
        path: 'boards'
        model: Entities.List

    getLists = (board_id) ->
        defer = $.Deferred()
        lists = new Entities.Lists()
        lists.path = "boards/#{board_id}/lists"
        lists.fetch
            data: 
                filter: 'open'
                cards: 'open'
                card_fields: 'name,labels'
            success: (collection, response, options) ->
                defer.resolve lists
         defer.promise()

    SJAppManager.reqres.setHandler 'entities:lists', (board_id) ->
        getLists(board_id)