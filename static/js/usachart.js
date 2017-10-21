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
    "autoZoom": true,
    "selectedColor": "#CC0000"
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
    "url": "/json/usa_test.json",
    "format": "json"
  },

  "autoZoom": false
  
});
