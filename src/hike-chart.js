import { create } from "d3-selection";
import { scaleLinear } from 'd3-scale';
import { max } from "d3-array";
import { axisBottom, axisLeft } from 'd3-axis';

import './hike-chart.css';

export function showChart(dimensions = { w: 1000, h: dimensions.h, padding: 20 }, dataset = []) {
  //Width and height
  const w = dimensions.w;
  const h = dimensions.h;
  const padding = dimensions.padding;

  const xScale = scaleLinear()
            .domain([0, max(dataset, function(d) { return d.distance; })])
            .range([padding, w - padding * 3]);

  const yScale = scaleLinear()
            .domain([0, max(dataset, function(d) { return d.elevationChange; })])
            .range([h - padding, padding]);

  const rScale = scaleLinear()
            .domain([0, max(dataset, function(d) { return d.elevationChange; })])
            .range([2, 5]);

  //Create SVG element
  const svg = create('svg')
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

  const xAxis = axisBottom()
                .scale(xScale)
                .ticks(5);

  const yAxis = axisLeft()
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


//   const legend = dataset.map(function(hike) {
//       const element = `
//           <li>
//               <strong>${hike.name}</strong>, <em>${hike.location}</em> (Distance: ${hike.distance} mi., Elevation Change: ${hike.elevationChange})
//           </li>
//       `;
//       return element;
//   }).join('');

//   const body = document.getElementsByTagName('body');
//   const orderedList = document.createElement('ol');
//   orderedList.innerHTML = legend;
//   body[0].append(orderedList);

  return svg.node();
}
