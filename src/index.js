import { csv } from 'd3-fetch';

import image from './components/Image';
import orderedList from './components/orderedList';
import { showChart } from './hike-chart';
import { makeLine } from './components/makeLine';
import { getBarChart } from './components/barChart';

import twoHikersLogo from './assets/images/two-hikers.svg';

import './styles.css';

const siteHeader = document.getElementById('siteheader');
const siteLogo = image(twoHikersLogo);
siteHeader.appendChild(siteLogo);

const dimensions = {
  w: 1000,
  h: 400,
  padding: 20,
};
const dataset = [
  { distance: 4.2,   elevationChange: 721, name: 'Daniel Ridge', location: 'Pisgah National Forest' },
  { distance: 1.2,   elevationChange: 173, name: 'Moore Cove Falls', location: 'Pisgah National Forest' },
  { distance: 3.6,   elevationChange: 1082, name: 'Stone Mountain Hike', location: 'Dupont State Forest' },
  { distance: 0.6,   elevationChange: 39, name: 'Hooker Falls', location: 'Dupont State Forest' },
  { distance: 2.3,   elevationChange: 321, name: 'Triple Falls Loop', location: 'Dupont State Forest' },
  { distance: 4.0,   elevationChange: 702, name: 'Ivestor Gap Trail to Tennent Mountain and Black Balsam Knob', location: 'Shining Rock Wilderness' },
  { distance: 4.3,   elevationChange: 1800, name: 'Blood Mountain', location: 'Chattahoochee National Forest' }
];

const difficultyChartElement = document.getElementById('difficulty-chart');
const hikeChart = showChart(dimensions, dataset);
difficultyChartElement.appendChild(hikeChart);

const hikeChartLegend = orderedList(dataset);
difficultyChartElement.appendChild(hikeChartLegend);

const lineChartElement = document.querySelector('#line-chart');
makeLine(lineChartElement);

csv('assets/data/highest_mountains_in_nc.csv')
  .then(function(data) {
    // data is now whole data set
    // draw chart in here!
    const parsedHeights = data.map(d => {
      return {
        value: +d['Elevation, ft'],
        label: d['Summit'],
      };
    });
    const baseForSummitChart = 6000;
    const heightChart = getBarChart(dimensions, parsedHeights, baseForSummitChart);

    const barChartElement = document.querySelector('#highest-nc-mountains');
    barChartElement.appendChild(heightChart);
  });

