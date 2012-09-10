window.layers? null: window.layers = {};

layers.win = {
  type: 'cartodb',
  user_name: 'viz2',
  table_name: 'map_guardian_gop',
  active: false,
  visible: false,
  opacity: 0,
  query: 'SELECT cartodb_id, romney_wins, county_name, state_name, ST_SIMPLIFY(the_geom_webmercator,0.1) as the_geom_webmercator,ST_ASGEOJSON(ST_SIMPLIFY(the_geom,0.0001)) as geometry FROM {{table_name}}',
  interactivity: "geometry, cartodb_id",
  __featureOver: function(ev,latlng,pos,data) {
    var polygon_style = {color: "#fff", weight: 2, opacity:1, fillOpacity: 1, fillColor:"#333", clickable:false};
    document.body.style.cursor = "pointer";
    if (this.polygon) {
      vis.mapView.map_leaflet.removeLayer(this.polygon);
    }
    this.polygon = new L.GeoJSON(JSON.parse(data.geometry), {
      style: function (feature) {
        return polygon_style;
      }
    }).addTo(vis.mapView.map_leaflet);
  },
  textName: null,
  __getTyleStyle: function() {
    var styles = '@font_reg:"DejaVu Sans Book";' +
    "#{{table_name}} {" +
    "line-color:#594;" +
    "line-width:0.5;" +
    "polygon-opacity:1;" +
    "polygon-fill:#EDEDED;" +
    "}" +
    "#{{table_name}} {" +
    "line-color:#FFFFFF;" +
    "line-width:0;" +
    "line-opacity:1;" +
    "polygon-opacity:1;" +
    "}" +
    "#{{table_name}}[romney_wins='true'] {" +
    "polygon-fill:#BB2D3C;" +
    "}";
    return styles;

  },
  infowindow: {
    fields: [{ name: 'county_name', title: true }, { name: 'state_name', title: true }],
    template: "<div>{{#content.fields}} <div class='{{#title}}{{title}}{{/title}}' >{{value}}</div> {{/content.fields}}</div>",
    eventType: 'featureOver'
  },
};
layers.win.tile_style = layers.win.__getTyleStyle();
