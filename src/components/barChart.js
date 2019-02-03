import { create } from "d3-selection";
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from "d3-array";
import { axisBottom, axisLeft } from 'd3-axis';

export function getBarChart(dimensions = { w: 1000, h: dimensions.h, padding: 20 }, dataset = []) {
  //Width and height
  const w = dimensions.w;
  const h = dimensions.h;
  const padding = dimensions.padding;
  const barPadding = 8;

  console.log('in function dataset: ', dataset)

  const xScale = scaleBand()
          .domain(dataset)
          .rangeRound([0, w - padding * 3])
          .paddingInner(0.05);

  const yScale = scaleLinear()
            .domain([6000, max(dataset, function(d) { return d; })])
            .range([h - padding, padding]);

  const svg = create('svg')
              .attr("width", w)
              .attr("height", h);

  svg.selectAll("rect")
     .data(dataset)
     .enter()
     .append("rect")
     .attr("x", function(d, i) {
            return xScale(d);
     })
     .attr("y", function(d) {
        return yScale(d);
     })
     .attr("transform", "translate(" + padding * 2 + ", 0)")
     .attr("width", w / dataset.length - barPadding)
     .attr("height", function(d) {
        return d - 6000 - padding * 2;
     });

  const xAxis = axisBottom()
                .scale(xScale);

  const yAxis = axisLeft()
                .scale(yScale)
                .ticks(4);

  svg.append("g")
      .attr("class", "axis") //Assign "axis" class
      .attr("transform", "translate(" + padding * 2 + "," + (h - padding) + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "axis") //Assign "axis" class
      .attr("transform", "translate(" + padding * 2 + ", 0)")
      .call(yAxis);

    return svg.node();
  }
