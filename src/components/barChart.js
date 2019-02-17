import { create } from "d3-selection";
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from "d3-array";
import { axisBottom, axisLeft } from 'd3-axis';

export function getBarChart(dimensions = { w: 1000, h: dimensions.h, padding: 20 }, dataset = [], baseHeight = 0) {
  //Width and height
  const w = dimensions.w;
  const h = dimensions.h;
  const padding = dimensions.padding;
  const barPadding = 8;

  const values = dataset.map(d => +d.value);
  const labels = dataset.map(d => d.label);

  const xScaleValues = scaleBand()
          .domain(values)
          .rangeRound([padding, w - padding * 3])
          .paddingInner(0.1);

  const xScaleLabels = scaleBand()
          .domain(labels)
          .rangeRound([padding, w - padding * 3])
          .paddingInner(0.1);

  const yScale = scaleLinear()
            .domain([baseHeight, max(values, function(d) { return d; })])
            .range([h - padding, padding]);

  const svg = create('svg')
              .attr("width", w)
              .attr("height", h + 100);

  svg.selectAll("rect")
     .data(values)
     .enter()
     .append("rect")
     .attr("x", function(d, i) {
            return xScaleValues(d);
     })
     .attr("y", function(d) {
        return yScale(d);
     })
     .attr("transform", "translate(" + padding + ", 0)")
     .attr("width", w / values.length - barPadding)
     .attr("height", function(d) {
        return yScale(baseHeight) - yScale(d);
     })
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em");

  const xAxis = axisBottom()
                .scale(xScaleLabels);

  const yAxis = axisLeft()
                .scale(yScale)
                .ticks(9);

  svg.append("g")
      .attr("class", "axis") //Assign "axis" class
      .attr("transform", "translate(" + padding + "," + (h - padding) + ")")
      .call(xAxis)
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

  svg.append("g")
      .attr("class", "axis") //Assign "axis" class
      .attr("transform", "translate(" + padding * 2 + ", 0)")
      .call(yAxis);

    return svg.node();
  }
