import image from './components/Image';
import { showChart } from './hike-chart';

import twoHikersLogo from './assets/images/two-hikers.svg';

console.log('It really works!');
console.log(twoHikersLogo);

const siteHeader = document.getElementById('siteheader');
const siteLogo = image(twoHikersLogo);
siteHeader.appendChild(siteLogo);

showChart();
