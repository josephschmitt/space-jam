do ->
    # `sj` is our namespace. Everything should be in `sj` to avoid name conflicts.
    sj = window.sj = (window.sj or {})

    # Custom renderer implementation
    Backbone.Marionette.Renderer.render = (template, data) ->
      _.template($(template).html(), data, {variable: 'data'})

    class SpaceJamApplication extends Marionette.Application
        initialize: ->
            super
            @addRegions
                titlebarRegion: '#titlebar'
                mainRegion: 
                    selector: '#main'
                    regionClass: TransitionRegion
                modalRegion: 
                    selector: '#modal'
                    regionClass: TransitionRegion

        navigate: (route, options={}) ->
            Backbone.history.navigate(route, options)
        getCurrentRoute: ->
            return Backbone.history.fragment
        showModal: (view) =>
            @modalRegion.show view
            @modalRegion.$el.show()
        dismissModal: =>
            @modalRegion.on 'empty', => @modalRegion.$el.hide()
            @modalRegion.reset()
        start: ->
            super
            if window.navigator.standalone
                $('body').addClass 'standalone'
            if Backbone.history then Backbone.history.start()
            if not @getCurrentRoute() then @trigger 'boards:list'

    # Init the app
    sj.SJAppManager = new SpaceJamApplication()