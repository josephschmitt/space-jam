# `sj` is our namespace. Everything should be in `sj` to avoid name conflicts.
sj = window.sj = (window.sj or {})

sj.SJAppManager.module 'Entities.Common', (Common, SJAppManager, Backbone, Marionette, $, _) ->
    class Common.TrelloAPIModel extends Backbone.Model
        idAttribute: 'id'
        sync: (method, model, options={}) ->
            methodsMap =
                'create': 'POST'
                'update': 'PUT'
                'read'  : 'GET'
                'delete': 'DELETE'

            requestData = if method is 'read' then options.data else model.toJSON()
            xhr = Trello.rest methodsMap[method], "#{@path}/#{@id}", requestData, options.success, options.error
            model.trigger 'request', model, xhr, options
            xhr

    class Common.TrelloAPICollection extends Backbone.Collection
        model: Common.TrelloAPIModel
        sync: (method, collection, options={}) ->
            methodsMap =
                'create': 'POST'
                'update': 'PUT'
                'read'  : 'GET'
                'delete': 'DELETE'

            requestData = if method is 'read' then options.data else collection.toJSON()
            xhr = Trello.rest methodsMap[method], "#{@path}", requestData, options.success, options.error
            collection.trigger 'request', collection, xhr, options
            xhr
