function tpschart(){
	var dps = []; // dataPoints


	var chart = new CanvasJS.Chart("chartContainer",{
		title :{
			text: "Transaction Per Second"
		},
		axisX:{
        valueFormatString: "HH:mm:ss",
				labelFontSize: 10,
				interval: 1,
				intervalType: "second",
    },
		toolTip:{
			content: "transaction : {y}"
		},
		data: [{
			type: "line",
			xValueType: "dateTime",
			xvalueFormatString: "HH:mm:ss",
			dataPoints: dps
		}]
	});

	var xVal = new Date;
	var yVal = 0;
	var updateInterval = 1000;
	var dataLength = 20; // number of dataPoints visible at any point

	var updateChart = function (count) {
		xVal.setMilliseconds(0);

		// count = count || 1;
		count = 1;
		// count is number of times loop runs to generate random dataPoints.

		for (var j = 0; j < count; j++) {
			yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
			dps.push({
				x: xVal.getTime(),
				y: yVal
			});
		};
		xVal.setTime(xVal.getTime()+ updateInterval);
		if (dps.length > dataLength)
		{
			dps.shift();
		}

		chart.render();

	};

	// generates first set of dataPoints
	updateChart(dataLength);

	// update chart after specified time.
	setInterval(function(){updateChart()}, updateInterval);

};
