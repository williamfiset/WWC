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
    "selectedColor": "#CC0000",
    "selectable": true,
    "balloonText": "<b>[[title]]</b><br />Average Annual Income: $[[value]]",
    "descriptionWindowWidth": 0,
    "descriptionWindowHeight": 0
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

// Color Persistence
// Deselect state
// Select state
// 2 global variables

function triggerSelectedStateClick(clickEvent) {
  
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
  var info = getStateInfo(states);
  console.log(info);

  lastStateClicked = state;
  
  // Rebecca here

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

