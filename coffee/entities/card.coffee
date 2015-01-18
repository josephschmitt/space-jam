# `sj` is our namespace. Everything should be in `sj` to avoid name conflicts.
sj = window.sj = (window.sj or {})

sj.SJAppManager.module 'Entities', (Entities, SJAppManager, Backbone, Marionette, $, _) ->
    Common = SJAppManager.module('Entities.Common')

    class Entities.Card extends Common.TrelloAPIModel
        path: 'cards'

    class Entities.Cards extends Common.TrelloAPICollection
        path: 'lists'
        model: Entities.Card

    getCards = (list_id) ->
        defer = $.Deferred()
        lists = new Entities.Cards()
        lists.path = "lists/#{list_id}/cards"
        lists.fetch
            data: filter: 'open'
            success: (collection, response, options) ->
                defer.resolve lists
         defer.promise()

    SJAppManager.reqres.setHandler 'entities:cards', (list_id) ->
        getCards(list_id)