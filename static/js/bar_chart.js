function display_bar(state_id, state_name) {
        console.log(state_id);
        console.log(state_name);
        console.log(window.year);
        var MAJORS = [];
	var SALARIES = [];
        var URL = "/major/" + window.year + "/" + state_id

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
	    }]
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
		    }
		}
	    });
	});
}
