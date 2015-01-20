# `sj` is our namespace. Everything should be in `sj` to avoid name conflicts.
sj = window.sj = (window.sj or {})

sj.SJAppManager.module 'Boards.Card', (Card, SJAppManager, Backbone, Marionette, $, _) ->
    Card.Controller = 
        showCard: (id) ->
            $.when(SJAppManager.request('entities:card', id)).done (card) ->
                cardView = new Card.ItemView model: card
                SJAppManager.mainRegion.show cardView