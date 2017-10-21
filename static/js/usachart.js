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
    "accessibleLabel": "",
    "autoZoom": false,
    "selectedColor": "#CC0000",
    "selectable": true,
    "balloonText": "<b>[[title]]</b><br />Average Annual Income: $[[value]]",
    "descriptionWindowWidth": 0,
    "descriptionWindowHeight": 0
  },

  "valueLegend": {
    "right": 5,
    "minValue": "$28,740",
    "maxValue": "$60,840",
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

map.addListener("clickMapObject", triggerSelectedStateClick);

map.dragMap = false;
