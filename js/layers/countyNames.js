window.layers? null: window.layers = {};
layers.countyNames = {
  type: 'cartodb',
  user_name: 'viz2',
  table_name: 'map_guardian_gop',
  active: true,
  visible: true,
  opacity: 0.99,
  query: 'SELECT cartodb_id, county_name, state_name, romney_percentage, ST_SIMPLIFY(the_geom_webmercator,1) as the_geom_webmercator,ST_ASGEOJSON(ST_SIMPLIFY(the_geom,0.0001)) as geometry FROM {{table_name}}',
  interactivity: "geometry, cartodb_id",
  textName: 'county_name',
  __getTyleStyle: function() {
    var styles = '@font_reg:"DejaVu Sans Book";';
    if(this.textName) {
      styles += "#{{table_name}}::labels[zoom>=5] {" +
      "text-face-name:@font_reg;" +
      'text-name:"['+this.textName+']";' +
      "text-fill:#FFF;" +
      "text-halo-fill:rgba(0,0,0,0.5);" +
      "text-halo-radius:1;" +
      "text-size:11;" +
      "text-allow-overlap: false;" +
      "text-clip: false;" +
      "text-label-position-tolerance: 10;" +
      "text-min-distance: 10;" +
      "}"
    }
    return styles;
  }
}
layers.countyNames.tile_style = layers.countyNames.__getTyleStyle();
