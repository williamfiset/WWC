function display_bar(state_id, state_name) {	
        console.log(state_id);
        console.log(state_name);

        //display_double_bar(state_id, state_name, "CA", "California");
        //return;


        var MAJORS = [];
	var SALARIES = [];
        var URL = "/major/" + state_id;

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
                }
	    });
	});
}

function display_double_bar(state_id1, state_name1, state_id2, state_name2) {	
        var MAJORS = [];
	var MIN_SALARIES = [];
	var ST1_SALARIES = [];
	var ST2_SALARIES = [];
        var URL1 = "/major/" + state_id1;
        var URL2 = "/major/" + state_id2;

	$.ajax({
	  url: URL1,
	  type: "GET",
	  dataType: "json"
	}).done(function(data) {
	  data["major_salary_pairs"].forEach(function(pair) {
	    MAJORS.push(pair["major"]);
	    MIN_SALARIES.push(pair["salary"]);
            ST1_SALARIES.push(pair["salary"]); 

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
			label: 'State1',
			backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
			borderColor: window.chartColors.red,
			borderWidth: 1,
			data: ST1_SALARIES,
		    },
                    {
			label: 'State2',
			backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
			borderColor: window.chartColors.blue,
			borderWidth: 1,
			data: ST2_SALARIES,
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
				text: state_name1 + " vs. " + state_name2,
			    },
			    tooltips: {
				mode: 'index',
				index: false,
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
	 });
});
}
