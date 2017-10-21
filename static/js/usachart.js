var map = AmCharts.makeChart( "chartdiv", {

  "type": "map",
  "theme": "light",
  "colorSteps": 10,

  "titles": [
    {
      "size": 15,
      "text": "USA Wealth Heatmap"
    }
  ],

  "areasSettings": {
    "autoZoom": false,
    "selectedColor": "#CC0000",
    "selectable": true
  },

  "valueLegend": {
    "right": 10,
    "minValue": "Poor",
    "maxValue": "Rich"
  },

  "export": {
    "enabled": true
  },

  "dataLoader": {
    "url": "/heat_map",
    "format": "json"
  },

  "zoomOnDoubleClick": false,

});

console.log(map);