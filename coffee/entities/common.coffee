# `sj` is our namespace. Everything should be in `sj` to avoid name conflicts.
sj = window.sj = (window.sj or {})

sj.SJAppManager.module 'Entities.Common', (Common, SJAppManager, Backbone, Marionette, $, _) ->
    apiKey = '3d424960cec9c7085488d27d1307146a'
    apiEndpoint = 'https://api.trello.com'
    apiVersion = '1'

    class Common.TrelloAPIModel extends Backbone.Model
        apiBase: "#{apiEndpoint}/#{apiVersion}"
        idAttribute: 'id'
        url: -> "#{@apiBase}/#{@path}"
        sync: (method, model, options={}) ->
            options = _.extend options, 
                dataType: 'jsonp'
                type: 'GET'
                data: 
                    key: apiKey
                    token: Trello.token()
            super method, model, options

    class Common.TrelloAPICollection extends Backbone.Collection
        apiBase: "#{apiEndpoint}/#{apiVersion}"
        model: Common.TrelloAPIModel
        url: -> "#{@apiBase}/#{@path}"
        sync: (method, collection, options={}) ->
            options = _.extend options, 
                dataType: 'jsonp'
                type: 'GET'
                data: 
                    key: apiKey
                    token: Trello.token()
            super method, collection, options