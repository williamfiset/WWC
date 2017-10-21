var currentIds = [];
var currentNames = [];

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
    "url": "/heat_map/2016/",
    "format": "json",
    "complete": on_complete
  },

  "zoomControl": {
    "zoomControlEnabled": false
  },

  "dragMap": false,

  "zoomOnDoubleClick": false,

});

function bar_call() {
    if (currentIds.length > 0) {
        display_bar(currentIds[0].substring(3), currentNames[0]);
    }
}

function triggerSelectedStateClick(clickEvent) {

  var stateId = clickEvent.mapObject.id;
  var stateName = clickEvent.mapObject.title;

  if (currentIds.length > 1) {
      currentIds[0] = stateId;
      currentNames[0] = stateName;
  } else {
      currentIds.push(stateId);
      currentNames.push(stateName);
  }

  console.log(stateId + " " + stateName);
  bar_call();
}

map.addListener("clickMapObject", triggerSelectedStateClick);

function on_complete() {
    bar_call();

    var min = 1000000000, max = 0;
    for (var i = 0; i < map.dataProvider.areas.length; i++) {
        var info = map.dataProvider.areas[i];
        if (info["value"] < min) {
            min = info["value"];
        }
        if (info["value"] > max) {
            max = info["value"];
        }
    }

    map.valueLegend.minValue = "$" + min;
    map.valueLegend.maxValue = "$" + max;

    map.validateData();

}
