window.layers? null: window.layers = {};
layers.percentage = {
  type: 'cartodb',
  user_name: 'viz2',
  table_name: 'map_guardian_gop',
  active: true,
  visible: true,
  opacity: 0.99,
  query: 'SELECT cartodb_id, county_name, state_name, romney_percentage, ST_SIMPLIFY(the_geom_webmercator,0.0001) as the_geom_webmercator,ST_ASGEOJSON(ST_SIMPLIFY(the_geom,0.0001)) as geometry FROM {{table_name}}',
  interactivity: "geometry, cartodb_id",
  featureOver: function(ev,latlng,pos,data) {
    var polygon_style = {color: "#333", weight: 2, opacity:1, fillOpacity: 1, fillColor:"#FFCC00", clickable:false};
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
  tile_style: "#{{table_name}} {" +
              "line-color:#FFFFFF;" +
              "line-width:0;" +
              "line-opacity:1;" +
              "polygon-opacity:1;" +
              "}" +
              "#{{table_name}} [romney_percentage<=100.0]{" +
              "polygon-fill:#BB2D3C;" +
              "}" +
              "#{{table_name}} [romney_percentage<=50]{" +
              "polygon-fill:#D6818A;" +
              "}" +
              "#{{table_name}} [romney_percentage<=30]{" +
              "polygon-fill:#E4ABB1;" +
              "}" +
              "#{{table_name}} [romney_percentage<=15]{" +
              "polygon-fill:#EAC0C4;" +
              "}",
  infowindow: {
    fields: [{ name: 'county_name', title: true },
      { name: 'state_name', title: true },
      {name: 'romney_percentage', title: true}
    ],
    template: "<div>{{#content.fields}} <div class='{{#title}}{{title}}{{/title}}' >{{value}}</div> {{/content.fields}}</div>"
  }
}
