import { select } from "d3-selection";
import { scaleLinear } from 'd3-scale';
import { max } from "d3-array";
import { axisBottom, axisLeft } from 'd3-axis';

import './hike-chart.css';

export function showChart() {
  //Width and height
  var w = 1000;
  var h = 400;
  var dataset = [
        { distance: 4.2,   elevationChange: 721, name: 'Daniel Ridge', location: 'Pisgah National Forest' },
        { distance: 1.2,   elevationChange: 173, name: 'Moore Cove Falls', location: 'Pisgah National Forest' },
        { distance: 3.6,   elevationChange: 1082, name: 'Stone Mountain Hike', location: 'Dupont State Forest' },
        { distance: 0.6,   elevationChange: 39, name: 'Hooker Falls', location: 'Dupont State Forest' },
        { distance: 2.3,   elevationChange: 321, name: 'Triple Falls Loop', location: 'Dupont State Forest' },
        { distance: 4.0,   elevationChange: 702, name: 'Ivestor Gap Trail to Tennent Mountain and Black Balsam Knob', location: 'Shining Rock Wilderness' },
        { distance: 4.3,   elevationChange: 1800, name: 'Blood Mountain', location: 'Chattahoochee National Forest' }
    ];
  var padding = 40;

  var xScale = scaleLinear()
            .domain([0, max(dataset, function(d) { return d.distance; })])
            .range([padding, w - padding * 3]);

  var yScale = scaleLinear()
            .domain([0, max(dataset, function(d) { return d.elevationChange; })])
            .range([h - padding, padding]);

  var rScale = scaleLinear()
            .domain([0, max(dataset, function(d) { return d.elevationChange; })])
            .range([2, 5]);

  //Create SVG element
  var svg = select("body")
              .append("svg")
              .attr("width", w)
              .attr("height", h);

  svg.selectAll("circle")  // <-- No longer "rect"
      .data(dataset)
      .enter()
      .append("circle")     // <-- No longer "rect"
      .attr("cx", function(d) {
          return xScale(d.distance);  //Returns scaled value
    })
    .attr("cy", function(d) {
          return yScale(d.elevationChange);
    })
    .attr("r", function(d) {
      return rScale(d.elevationChange * d.distance / 2);
  });

  svg.selectAll("text")  // <-- Note "text", not "circle" or "rect"
      .data(dataset)
      .enter()
      .append("text")     // <-- Same here!
      .text(function(d, i) {
          return i + 1;
    })
  .attr("x", function(d) {
          return xScale(d.distance) + 10;
      })
      .attr("y", function(d) {
          return yScale(d.elevationChange);
      })
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "#cc0000");

  var xAxis = axisBottom()
                .scale(xScale)
                .ticks(5);

  var yAxis = axisLeft()
                .scale(yScale)
                .ticks(4);

  svg.append("g")
      .attr("class", "axis") //Assign "axis" class
      .attr("transform", "translate(0," + (h - padding) + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "axis") //Assign "axis" class
      .attr("transform", "translate(" + padding + ", 0)")
      .call(yAxis);


  var legend = dataset.map(function(hike) {
      var element = `
          <li>
              <strong>${hike.name}</strong>, <em>${hike.location}</em> (Distance: ${hike.distance} mi., Elevation Change: ${hike.elevationChange})
          </li>
      `;
      return element;
  }).join('');

  var body = document.getElementsByTagName('body');
  var orderedList = document.createElement('ol');
  orderedList.innerHTML = legend;
  body[0].append(orderedList);
}
