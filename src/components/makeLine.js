import { select } from "d3-selection";
import { line } from "d3-shape";
import { scaleLinear, scaleTime } from 'd3-scale';
import { extent } from "d3-array";
import { axisBottom, axisLeft } from 'd3-axis';
import { timeFormat } from "d3-time-format";

export function makeLine(element) {
  const stepDays = [
    { date: new Date('2018-08-05'), value: 13536, },
    { date: new Date('2018-08-06'), value: 14126, },
    { date: new Date('2018-08-07'), value: 7195, },
    { date: new Date('2018-08-08'), value: 16231, },
    { date: new Date('2018-08-09'), value: 14313, },
    { date: new Date('2018-08-10'), value: 13486, },
    { date: new Date('2018-08-11'), value: 24750, },
    { date: new Date('2018-08-12'), value: 15484, },
    { date: new Date('2018-08-13'), value: 13327, },
    { date: new Date('2018-08-14'), value: 17176, },
    { date: new Date('2018-08-15'), value: 15881, },
    { date: new Date('2018-08-16'), value: 17126, },
    { date: new Date('2018-08-17'), value: 11413, },
    { date: new Date('2018-08-18'), value: 12293, },
    { date: new Date('2018-08-19'), value: 14950, },
    { date: new Date('2018-08-20'), value: 15163, },
    { date: new Date('2018-08-21'), value: 20271, },
    { date: new Date('2018-08-22'), value: 14334, },
    { date: new Date('2018-08-23'), value: 20136, },
    { date: new Date('2018-08-24'), value: 14834, },
    { date: new Date('2018-08-25'), value: 15704, },
  ];

  const width = 700;
  const height = 400;
  const padding = 40;

  const minDate = stepDays[0].date;
  const maxDate = stepDays[20].date;

  const xScale = scaleTime()
    .domain([minDate, maxDate])    // values between for month of january
    .range([padding, width - padding * 2]);

  // define the y axis
  var xAxis = axisBottom()
    .scale(xScale)
    .tickFormat(timeFormat('%m-%d-%y'));

  const yExtent = extent(stepDays, (d) => d.value);
  // define the y scale  (vertical)
  var yScale = scaleLinear()
//    .domain(yExtent)    // values between 0 and 100
    .domain([5000, 25000])    // values between 0 and 100
    .range([height - padding, padding]);   // map these to the chart height, less padding.
    //REMEMBER: y axis range has the bigger number first because the y value of zero is at the top of chart and increases as you go down.

  // define the y axis
  var yAxis = axisLeft()
    .scale(yScale);

  const stepLine = line()
    .x((d) => { return xScale(d.date); })
    .y((d) => { return yScale(d.value); });

  const vis = select(element).
    append("svg")
      .attr("width", width)
      .attr("height", height);

      console.log(stepLine(stepDays));

  vis.append('path')
    .attr('d', stepLine(stepDays))
    .attr("stroke", "black")
    .attr("fill", "none");

  // draw x axis with labels and move to the bottom of the chart area
  vis.append("g")
    .attr("class", "xaxis")   // give it a class so it can be used to select only xaxis labels  below
    .attr("transform", "translate(0," + (height - padding) + ")")
    .call(xAxis);
  // draw y axis with labels and move in from the size by the amount of padding
  vis.append("g")
    .attr("transform", "translate("+padding+",0)")
    .call(yAxis);

}
