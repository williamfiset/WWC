var MAJORS = [];
var SALARIES = [];

$.ajax({
  url: "/major/AL",
  type: "GET",
  dataType: "json"
}).done(function(data) {
  data["major_salary_pairs"].forEach(function(pair) {
    MAJORS.push(pair["major"]);
    SALARIES.push(pair["salary"]);
  });
});

var color = Chart.helpers.color;
var barChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
	label: 'Income',
	backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
	borderColor: window.chartColors.blue,
	borderWidth: 1,
	data: SALARIES,
    }]

};

window.onload = function() {
    var ctx = document.getElementById("canvas").getContext("2d");
    window.myBar = new Chart(ctx, {
	type: 'bar',
	data: barChartData,
	options: {
	    responsive: true,
	    legend: {
		position: 'top',
	    },
	    title: {
		display: true,
		text: 'STATE'
	    }
	}
    });

};
