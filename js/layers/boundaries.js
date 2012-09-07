window.layers? null: window.layers = {};
layers.boundaries = {
  type: 'cartodb',
  visible: true,
  user_name: 'saleiva',
  table_name: 'usa_adm1',
  query: 'SELECT * FROM {{table_name}}',
  tile_style:
    "#{{table_name}}::glow {" +
    "line-color:#000;" +
    "line-opacity:.15;" +
    "polygon-opacity:0;" +
    "line-width:3;" +
    "[zoom>=5]{" +
    "line-width:5;" +
    "}" +
    "[zoom>=6]{" +
    "line-width:7;" +
    "}" +
    "}" +
    "#{{table_name}} {" +
    "line-color:#FFFFFF;" +
    "line-width:1.5;" +
    "line-opacity:1;" +
    "polygon-opacity:0;" +
    "[zoom>=5]{" +
    "line-width:2.5;" +
    "}" +
    "[zoom>=6]{" +
    "line-width:3.5;" +
    "}" +
    "}"
}
