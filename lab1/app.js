const margin = { 
  top: 50, 
  right: 50, 
  bottom: 50, 
  left: 50
};

const width = 700 - margin.left - margin.right;
const height = 700 - margin.top - margin.bottom;

const svg = d3.select('body').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);


d3.csv("https://raw.githubusercontent.com/rauan-assabayev/data_visualisation/main/lab1/pokemon.csv", function(d) {
  	d.name = d.name
    d.attack = d.attack
    d.defense = d.defense
    d.sp_attack = d.sp_attack
    d.height_m = Number(d.height_m)
    return d;
}).then(function(data) {

	var x = d3.scaleLinear()
		.domain([0, 300])
		.range([ 0, width ]);
		svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x));

	var y = d3.scaleLinear()
		.domain([0, 300])
		.range([ height, 0]);
		svg.append("g")
		.call(d3.axisLeft(y));

	svg.append('g')
		.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		  .attr("cx", function (d) { return x(d.attack) })
		  .attr("cy", function (d) { return y(d.defense) })
		  .attr("r",  function (d) { return d.height_m })
		  .style("fill", "#0a2463");

	svg.append('g')
		.selectAll("rect")
		.data(data)
		.enter()
		.append("rect")
		  .attr("x", function (d) { return x(d.sp_attack) })
		  .attr("y", function (d) { return y(d.defense) })
		  .attr("width",  function (d) { return d.height_m })
		  .attr("height",  function (d) { return d.height_m })
		  .style("fill", "red");

	svg.append("text")             
	      .attr("transform",
	            "translate(" + (width/2) + " ," + (height - 10 + margin.top) + ")")
	      .style("text-anchor", "middle")
	      .text("Attack / Speed Attack (rect)");

	 svg.append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 0 - margin.left)
	      .attr("x",0 - (height / 2))
	      .attr("dy", "1em")
	      .style("text-anchor", "middle")
	      .text("Defense");


});