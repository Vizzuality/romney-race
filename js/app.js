var romney = {
  minZoom: 4,
  maxZoom:9,
  namesOn: false,
  /**
  * initialization method
  * @method init
  */
  init: function(map, currentMap) {
    this.map = map;
    this.currentMap = currentMap;
    this.switchMap = this.switchMap.bind(this);

    // we store the tabs & leyends references to avoid future DOM lookups
    this.tabs = []
    var tabs = $('.tab');
    for(var i=0, l = tabs.length; i < l; i++) {
      var $tab = $(tabs[i]);
      this.tabs[$tab.attr('data-mapId')] = $tab;
    }
    this.legends = []
    var legends = $('.legend');
    for(var i=0, l = legends.length; i < l; i++) {
      var $legend = $(legends[i]);
      this.legends[$legend.attr('data-mapId')] = $legend;
    }

    this.$zoomIn = $('.zoom_in');
    this.$zoomOut = $('.zoom_out');
    this.$showNames = $('.show_names');
    this.bindButtons();

  },
  /**
  * Create the bindings between ui buttons and methods
  * @method bindButtons
  */
  bindButtons: function() {
    var self = this;
    for(var i=0, l=this.tabs.length; i < l; i++) {
      var tab = this.tabs[i];
      tab.on('click', function(e) {
        var $tab = $(e.currentTarget);
        self.selectMap($tab.attr('data-mapId'));
      });
    }
    this.$zoomIn.on('click', this.zoom_in.bind(this));
    this.$zoomOut.on('click', this.zoom_out.bind(this));
    this.$showNames.on('click', this.toggleNames.bind(this))
  },
  /**
  * Toggle the selected map
  * @method switchMap
  */
  switchMap: function() {
    var map = this.map;
    map.layers.models[this.currentMap].deactivate();
    this.currentMap? this.currentMap = 0: this.currentMap = 1;
    map.layers.models[this.currentMap].activate();
    map.layers.models[2].trigger('change');
    if (map.layers.models.length == 4) {
      map.layers.models[3].trigger('change');
    }
    this.selectCurrentTab();
    this.selectCurrentLegend();
  },
  /**
  * Select and show a map
  * @method selectMap
  */
  selectMap: function(mapId) {
    var map = this.map;
    map.layers.models[this.currentMap].deactivate();
    this.currentMap = mapId;
    map.layers.models[this.currentMap].activate();
    map.layers.models[2].trigger('change');
    if (map.layers.models.length == 4) {
      map.layers.models[3].trigger('change');
    }
    this.selectCurrentTab();
    this.selectCurrentLegend();
  },
  /**
  * Show current selected map legend
  * @method selectCurrentLegend
  */
  selectCurrentLegend: function(mapId) {
    $('.legend').removeClass('selected');
    this.legends[this.currentMap].addClass('selected');
  },
  /**
  * Highlight current selected map tab
  * @method selectTab
  */
  selectCurrentTab: function() {
    $('.tab').removeClass('selected');
    this.tabs[this.currentMap].addClass('selected');
  },
  /**
  * Raises the zoom level
  * @method zoom_in
  */
  zoom_in: function() {
    var currentZoom = this.map.getZoom();
    if(currentZoom <= this.maxZoom) {
      this.map.setZoom(this.map.getZoom() + 1);
    }
  },
  /**
  * Lowerss the zoom level
  * @method zoom_out
  */
  zoom_out: function() {
    var currentZoom = this.map.getZoom();
    if(currentZoom >= this.minZoom) {
      this.map.setZoom(currentZoom - 1);
    }
  },

  setNamesOn: function() {
    var layerData = layers.countyNames;
    this.namesCid = this.map.addLayer(Layers.create(layerData.type, this, layerData));
    this.$showNames.addClass('selected');

    this.selectMap(this.currentMap);
  },

  setNamesOff: function() {
    if(this.namesCid) {
      var namesLayer = this.map.getLayerByCid(this.namesCid);
      this.map.removeLayer(namesLayer);
      this.namesCid = undefined;
      this.$showNames.removeClass('selected');
      this.selectMap(this.currentMap);
    }
  },

  toggleNames: function() {
    this.namesOn?
      this.setNamesOff():
      this.setNamesOn();
    this.namesOn = !this.namesOn;
  }
}
