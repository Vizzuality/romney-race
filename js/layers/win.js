window.layers? null: window.layers = {};
layers.win = {
  type: 'cartodb',
  user_name: 'viz2',
  table_name: 'map_guardian_gop',
  active: false,
  visible: false,
  opacity: 0,
  query: 'SELECT cartodb_id, romney_wins, county_name, state_name, ST_SIMPLIFY(the_geom_webmercator,0.0001) as the_geom_webmercator,ST_ASGEOJSON(ST_SIMPLIFY(the_geom,0.0001)) as geometry FROM {{table_name}}',
  interactivity: "geometry, cartodb_id",
  featureOver: function(ev,latlng,pos,data) {
    document.body.style.cursor = "pointer";

    // // Show the hover polygon if it is a different feature
    // if (data.cartodb_id != polygon.cartodb_id) {
    //   vis.mapView.map_leaflet.removeLayer(polygon);

    //   polygon = new L.GeoJSON(JSON.parse(data.geometry), {
    //     style: function (feature) {
    //       return polygon_style;
    //     }
    //   }).addTo(vis.mapView.map_leaflet);
    // }
  },
  tile_style: '@font_reg:"DejaVu Sans Book";' +
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
    "#{{table_name}}::labels[zoom>=6][romney_wins='true'] {" +
    "text-face-name:@font_reg;" +
    'text-name:"[county_name]";' +
    "text-fill:#FFF;" +
    "text-halo-fill:rgba(0,0,0,0.5);" +
    "text-halo-radius:1;" +
    "text-size:11;" +
    "text-allow-overlap: false;" +
    "polygon-opacity:0;" +
    "text-label-position-tolerance: 10;" +
    "text-min-distance: 10;" +
    "}" +
    "#{{table_name}}[romney_wins='true'] {" +
    "polygon-fill:#BB2D3C;" +
    "}",
    infowindow: {
        fields: [{ name: 'county_name', title: true }, { name: 'state_name', title: true }],
        template: "<div>{{#content.fields}} <div class='{{#title}}{{title}}{{/title}}' >{{value}}</div> {{/content.fields}}</div>"
    },
}
