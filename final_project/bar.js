var margin = {top: 80, right: 20, bottom: 70, left: 40},
    width = 480 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Parse the date / time

var x = d3.scaleBand().padding(0.1).rangeRound([0, width]);

var y = d3.scaleLinear().range([height, 0]);

var xAxis = d3.axisBottom()
    .scale(x);

var yAxis = d3.axisLeft()
    .scale(y);

var svg = d3.select("#barchart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

data = [];

d3.csv("https://raw.githubusercontent.com/rauan-assabayev/data_visualisation/master/final_project/industry.csv").then(function(local_data) {
  data = local_data;
  
  var dataset = []
  
  var i = 1;

  mapSelected.forEach(function(d) {
      dataset.push({id: i, title:d, value:data[2019 - selectedYear][d]});
      i = i + 1;
  });

  console.log(dataset);

  dataset.forEach(function(d) {
      d.value = parseInt(d.value);
  });



  x.domain(dataset.map(function(d) { return d.id; }));
  y.domain([0, d3.max(dataset, function(d) { return d.value; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Value ($)");

  svg.selectAll("bar")
      .data(dataset)
      .enter()
      .append("rect")
      .style("fill", "steelblue")
      .attr("x", function(d) { return x(d.id); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });

})
.catch(function(error){
   console.log(error);  
})


function check(){

  

}

