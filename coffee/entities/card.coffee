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

    getCard = (card_id) ->
        defer = $.Deferred()
        card = new Entities.Card id: card_id
        card.path = 'cards'
        card.fetch
            data:
                checkItemStates: true
                list: true
                list_fields: 'idBoard,name'
            success: (model, response, options) ->
                defer.resolve card
         defer.promise()

    SJAppManager.reqres.setHandler 'entities:cards', (list_id) ->
        getCards(list_id)

    SJAppManager.reqres.setHandler 'entities:card', (card_id) ->
        getCard(card_id)