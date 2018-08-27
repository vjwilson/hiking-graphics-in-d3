import image from './components/Image';
import orderedList from './components/orderedList';
import { showChart } from './hike-chart';
import { makeLine } from './components/makeLine';

import twoHikersLogo from './assets/images/two-hikers.svg';

console.log('It really works!');

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

const siteMain = document.getElementById('sitemain');
const hikeChart = showChart(dimensions, dataset);
siteMain.appendChild(hikeChart);

const hikeChartLegend = orderedList(dataset);
siteMain.appendChild(hikeChartLegend);

makeLine();
