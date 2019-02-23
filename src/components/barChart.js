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
          .domain(dataset.map(d => +d.value))
          .rangeRound([padding, w - padding * 3])
          .paddingInner(0.1);

  const xScaleLabels = scaleBand()
          .domain(dataset.map(d => d.label))
          .rangeRound([padding, w - padding * 3])
          .paddingInner(0.1);

  const exactYMax = max(dataset, function(d) { return +d.value; });
  const roundedYMax = roundUp(exactYMax, 100);
  const yScale = scaleLinear()
            .domain([baseHeight, roundedYMax])
            .range([h - padding, padding]);

  const svg = create('svg')
              .attr("width", w)
              .attr("height", h + 100);

  svg.selectAll("rect")
     .data(dataset)
     .enter()
     .append("rect")
     .attr("x", function(d, i) {
            return xScaleValues(+d.value);
     })
     .attr("y", function(d) {
        return yScale(+d.value);
     })
     .attr("transform", "translate(" + padding + ", 0)")
     .attr("width", w / values.length - barPadding)
     .attr("height", function(d) {
        return yScale(baseHeight) - yScale(+d.value);
     });

     svg.selectAll("text")
       .data(dataset)
       .enter()
       .append("text")
       .text(function(d) {
           return d.value;
       })
       .style("text-anchor", "middle")
       .attr("x", function(d, i) {
          return xScaleValues(+d.value) + padding *2;
       })
       .attr("y", function(d) {
           return yScale(+d.value) + padding;
       })
       .attr("font-family", "sans-serif")
       .attr("font-size", "11px")
       .attr("fill", "white");

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

  function roundUp(max, clamp = 10) {
    let x = max;
    let i = 0;
    while (x > clamp) {
      i = i + 1;
      x = x / 10;
    }

    if (i) {
      x = Math.ceil(x);
      x = x * (10 ** i);
    }
    return x;
  }
