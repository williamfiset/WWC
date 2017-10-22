function display_bar(state_info) {	

  state_id = "";
  state_name = "";
  if (state_info.length == 0) {
    return;
  } else if (state_info.length == 1) {
    state_id = state_info[0]["state_id"];
    state_name = state_info[0]["state_name"];
  } else {
    id1 = state_info[0]["state_id"];
    name1 = state_info[0]["state_name"];
    id2 = state_info[1]["state_id"];
    name2 = state_info[1]["state_name"];
    display_double_bar(id1, name1, id2, name2);
    return;
  }
  
  var MAJORS = [];
  var SALARIES = [];
  var URL = "/major/" + window.year + "/" + state_id;
  
  $.ajax({
    url: URL,
    type: "GET",
    dataType: "json"
  }).done(function(data) {
    data["major_salary_pairs"].forEach(function(pair) {
      MAJORS.push(pair["major"]);
      SALARIES.push(pair["salary"]);
    });
    if (window.myHorizontalBar !== undefined) {
      window.myHorizontalBar.destroy();
    }
    var color = Chart.helpers.color;
    var barChartData = {
      labels: MAJORS,
      datasets: [{
  	label: 'Income',
  	backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
  	borderColor: window.chartColors.blue,
  	borderWidth: 1,
  	data: SALARIES,
      }
      ]
    };
    var ctx = document.getElementById("canvas").getContext("2d");
      window.myHorizontalBar = new Chart(ctx, {
  	type: 'horizontalBar',
  	data: barChartData,
  	options: {
  	    legend: {
  	      display: false,
  	    },
  	    responsive: true,
  	    title: {
  	      display: true,
  	      text: state_name,
  	    },
            tooltips: {
              enabled:false,
            }
          }
      });
  });
}

function display_double_bar(state_id1, state_name1, state_id2, state_name2) {	
  var MAJORS = [];
  var MIN_SALARIES = [];
  var ST1_SALARIES = [];
  var ST2_SALARIES = [];
  var URL1 = "/major/" +  window.year + "/" + state_id1;
  var URL2 = "/major/" +  window.year + "/" + state_id2;

  $.ajax({
    url: URL1,
    type: "GET",
    dataType: "json"
  }).done(function(data) {
    data["major_salary_pairs"].forEach(function(pair) {
      MAJORS.push(pair["major"]);
      MIN_SALARIES.push(pair["salary"]);
      ST1_SALARIES.push(pair["salary"]); 
    }); 
    $.ajax({
      url: URL2,
      type: "GET",
      dataType: "json"
    }).done(function(data2) {
      data2["major_salary_pairs"].forEach(function(pair2) {
        var index = MAJORS.indexOf(pair2["major"]);
        if (MIN_SALARIES[index] > pair2["salary"]) {
          MIN_SALARIES[index] = pair2["salary"];
          ST2_SALARIES.push(0);
        } else {
          ST2_SALARIES.push(pair2["salary"]);
          ST1_SALARIES[index] = 0;
        }
      });
      if (window.myHorizontalBar !== undefined) {
        window.myHorizontalBar.destroy();
      }
      var color = Chart.helpers.color;
      var barChartData = {
        labels: MAJORS,
        datasets: [{
            label: 'Buffer',
            backgroundColor: color(window.chartColors.blue).alpha(0).rgbString(),
            data: MIN_SALARIES,
        },
        {
            label: state_name1 + " > " + state_name2,
            backgroundColor: color(window.chartColors.orange).alpha(0.5).rgbString(),
            borderColor: window.chartColors.orange,
            borderWidth: 1,
            data: ST1_SALARIES,
        },
        {
            label: state_name2 + " > " + state_name1,
            backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
            borderColor: window.chartColors.blue,
            borderWidth: 1,
            data: ST2_SALARIES,
        }]
      };
      var ctx = document.getElementById("canvas").getContext("2d");
      window.myHorizontalBar = new Chart(ctx, {
        type: 'horizontalBar',
        data: barChartData,
        options: {
          legend: {
            filter: function(legendItem, chartData) {
              console.log(legendItem.text);
              if (legendItem.text == 'Buffer') {
                legendItem.hidden = true;
              }
            }
          },
          responsive: true,
          title: {
            display: true,
            text: state_name1 + " vs. " + state_name2,
          },
          tooltips: {
            enabled: false,
          },
          scales: {
            yAxes: [{
              stacked: true,
            }],
            xAxes: [{
              stacked: true,
            }],
          }
        }
      });
    });
  });
}
