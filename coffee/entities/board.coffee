# `sj` is our namespace. Everything should be in `sj` to avoid name conflicts.
sj = window.sj = (window.sj or {})

sj.SJAppManager.module 'Entities.Board', (Board, SJAppManager, Backbone, Marionette, $, _) ->
    Common = SJAppManager.module('Entities.Common')

    class Boards extends Common.TrelloAPICollection
        path: 'members/me/boards'

    getBoards = ->
        defer = $.Deferred()
        boards = new Boards()
        boards.fetch
            success: (collection, response, options) ->
                defer.resolve boards
         defer.promise()

    SJAppManager.reqres.setHandler 'entities:boards', ->
        getBoards()