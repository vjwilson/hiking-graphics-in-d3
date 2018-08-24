function orderedList(items = []) {
  const legend = items.map((hike) => {
    const element = `
        <li>
            <strong>${hike.name}</strong>, <em>${hike.location}</em> (Distance: ${hike.distance} mi., Elevation Change: ${hike.elevationChange})
        </li>
    `;
    return element;
  }).join('');
  const orderedList = document.createElement('ol');
  orderedList.innerHTML = legend;

  return orderedList;
}

export default orderedList;
