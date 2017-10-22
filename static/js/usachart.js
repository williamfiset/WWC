var currentInfo = [];
var lastStateClicked = undefined;

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
    "selectedColor": "#eb3812",
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
    display_bar(currentInfo);
}

function triggerSelectedStateClick(clickEvent) {

    console.log(clickEvent);

  var state = clickEvent.mapObject;
  var stateName = state.title;
  var stateId = state.id;

  state.showAsSelected = !state.showAsSelected;
  clickEvent.chart.returnInitialColor(state);

  var states = getSelectedStates();

  if (states.length === 3) {

    // Toggle last selected state color
    lastStateClicked.showAsSelected = !lastStateClicked.showAsSelected;
    clickEvent.chart.returnInitialColor(lastStateClicked);

  }

  states = getSelectedStates();
  currentInfo = getStateInfo(states);
  console.log(currentInfo);

  lastStateClicked = state;

  // Rebecca here
  bar_call();

}

function getStateInfo(states) {
  var info = [];
  for (var i = 0; i < states.length; i++) {
    var state = states[i];
    info.push({
      'state_name':state.title,
      'state_id': state.id.substring(3)
    });
  }
  return info;
}

function getSelectedStates() {
  var selected = [];
  for(var i = 0; i < map.dataProvider.areas.length; i++) {
    if(map.dataProvider.areas[i].showAsSelected) {
      // var stateId = map.dataProvider.areas[i].id;
      selected.push(map.dataProvider.areas[i]);
    }
  }
  return selected;
}

map.addListener("clickMapObject", triggerSelectedStateClick);

function on_complete() {
    bar_call();

    for (var i = 0; i < currentInfo.length; i++) {
        selected_state = currentInfo[i];
    }

    var min = 1000000000, max = 0;
    for (var i = 0; i < map.dataProvider.areas.length; i++) {
        var info = map.dataProvider.areas[i];
        if (info["value"] < min) {
            min = info["value"];
        }
        if (info["value"] > max) {
            max = info["value"];
        }

        for (var j = 0; j < currentInfo.length; j++) {
            var check = currentInfo[j];
            if (info["id"].substring(3) == check["state_id"]) {
                info.showAsSelected = true;
            }
        }

    }

    map.valueLegend.minValue = "$" + min;
    map.valueLegend.maxValue = "$" + max;

    map.validateData();

}
