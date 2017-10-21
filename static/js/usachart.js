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
    "selectable": true,
    "balloonText": "[[description]]"
  },

  "valueLegend": {
    "right": 5,
    "minValue": "Poor",
    "maxValue": "Rich",
    "showAsGradient": true
  },

  "export": {
    "enabled": false
  },

  "dataLoader": {
    "url": "/heat_map",
    "format": "json"
  },

  "zoomControl": {
    "zoomControlEnabled": false
  },

  "zoomOnDoubleClick": false,

});

function triggerSelectedStateClick(clickEvent) {

  var stateId = clickEvent.mapObject.id;
  var stateName = clickEvent.mapObject.title;

  console.log(stateId + " " + stateName);

  display_bar(stateId.substring(3), stateName);

}

console.log(map);

map.addListener("clickMapObject", triggerSelectedStateClick);
