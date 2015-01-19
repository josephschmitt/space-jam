# `sj` is our namespace. Everything should be in `sj` to avoid name conflicts.
sj = window.sj = (window.sj or {})

sj.SJAppManager.module 'Entities', (Entities, SJAppManager, Backbone, Marionette, $, _) ->
    Common = SJAppManager.module('Entities.Common')

    class Entities.List extends Common.TrelloAPIModel
        path: 'lists'

    class Entities.Lists extends Common.TrelloAPICollection
        path: 'boards'
        model: Entities.List
        parse: (response, options) ->
            # Don't show lists with no cards
            _.reject response, (list) -> !list.cards?.length

    getLists = (board_id) ->
        defer = $.Deferred()
        lists = new Entities.Lists()
        lists.path = "boards/#{board_id}/lists"
        lists.fetch
            data: 
                filter: 'open'
                cards: 'all'
                card_fields: 'name,closed,idList,pos'
            success: (collection, response, options) ->
                lists.reject 
                defer.resolve lists
         defer.promise()

    SJAppManager.reqres.setHandler 'entities:lists', (board_id) ->
        getLists(board_id)