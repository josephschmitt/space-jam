# `sj` is our namespace. Everything should be in `sj` to avoid name conflicts.
sj = window.sj = (window.sj or {})

sj.SJAppManager.module 'Entities', (Entities, SJAppManager, Backbone, Marionette, $, _) ->
    class Entities.Board extends Entities.Common.TrelloAPIModel
        path: 'boards'

    class Entities.Boards extends Entities.Common.TrelloAPICollection
        path: 'members/me/boards'
        model: Entities.Board

    getBoards = ->
        defer = $.Deferred()
        boards = new Entities.Boards()
        boards.fetch
            data: filter: 'open'
            success: (collection, response, options) ->
                defer.resolve boards
         defer.promise()

    SJAppManager.reqres.setHandler 'entities:boards', ->
        getBoards()