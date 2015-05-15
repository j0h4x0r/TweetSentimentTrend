(function() {
	function processData() {
		trendData = [{
			key: 'positive',
			color: "#ff7f0e",
			values: [
				{x: 0, y: 2.3},
				{x: 1, y: 3.7},
				{x: 2, y: 1.4},
				{x: 3, y: 7.5},
				{x: 4, y: 6.1},
				{x: 5, y: 2.9},
				{x: 6, y: 3.1},
			]
		}, {
			key: 'negative',
			color: "#1f77b4",
			values: [
				{x: 0, y: 4.9},
				{x: 1, y: 0.7},
				{x: 2, y: 2.38},
				{x: 3, y: 9.4},
				{x: 4, y: 2.1},
				{x: 5, y: 6.4},
				{x: 6, y: 5.4},
			]
		}];
		wordData = ["hello", "computer", "you", "happy", "want", "more", "storm", "cheer"]
			.map(function(d) {
				return {text: d, size: 10 + Math.random() * 90};
			});

		return {trendData: trendData, wordData: wordData};
	}

	function drawWordCloud(data) {
		var fill = d3.scale.category20();
		d3.layout.cloud().size([300, 300])
			.words(data)
			.padding(5)
			.rotate(function() { return ~~(Math.random() * 2) * 90; })
			.font("Impact")
			.fontSize(function(d) { return d.size; })
			.on("end", draw)
			.start();

		function draw(words) {
			d3.select("#words").append("svg")
				.attr("width", 300)
				.attr("height", 300)
				.append("g")
				.attr("transform", "translate(150,150)")
				.selectAll("text")
				.data(words)
				.enter().append("text")
				.style("font-size", function(d) { return d.size + "px"; })
				.style("font-family", "Impact")
				.style("fill", function(d, i) { return fill(i); })
				.attr("text-anchor", "middle")
				.attr("transform", function(d) {
					return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
				})
				.text(function(d) { return d.text; });
		}
	};

	function drawTrendChart(data) {
		nv.addGraph(function() {
			var startDate = new Date(2015, 5, 5);
			var offset = data[0].values.length;
			dates = d3.time.day.range(startDate, d3.time.day.offset(startDate, offset));

			var chart = nv.models.lineWithFocusChart();
			var height = 500

			chart.height(height);

			chart.xAxis.axisLabel("Time")
				.tickFormat(function(d) { 
					return d3.time.format('%x')(dates[d]);
				});
			chart.x2Axis.axisLabel("Time")
				.tickFormat(function(d) { 
					return d3.time.format('%x')(dates[d]);
				});
			chart.yAxis.axisLabel("Sentiment")
				.tickFormat(d3.format(',2f'));

			d3.select('#trend').append('svg')
				.datum(data)
				.transition().duration(500)
				.call(chart);

			// click event
			chart.lines.dispatch.on('elementClick', function(e) {
				var index = e.point.x;
				// TO DO
			})

			nv.utils.windowResize(chart.update);

			return chart;
		});
	}

	$(document).ready(function() {
		var graphData = processData();
		drawTrendChart(graphData.trendData);
		drawWordCloud(graphData.wordData);
	});

})();