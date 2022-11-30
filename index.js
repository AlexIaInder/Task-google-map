const {maps} = google;

const svgMarker = {
  path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
  fillColor: "blue",
  fillOpacity: 0.6,
  strokeWeight: 0,
  rotation: 0,
  scale: 2,
  anchor: new google.maps.Point(15, 30),
};

const locations = [{
  name: 'Dynamica Labs',
  coordinates: {
    x: 51.530723,
    y: -0.093546,
  },
  title: 'Office',
},
  {
    name: 'Sweet Home',
    coordinates: {
      x:  50.501459,
      y: 30.422565,
    },
    title: 'Home',
  },
  {
    name: 'Microsoft',
    coordinates: {
      x: 51.5194444,
      y: -0.1813889,
    },
    title: 'Office',
  },
  {
    name: 'The Wenlock Arms',
    coordinates: {
      x: 51.5314180,
      y:  -0.0940091,
    },
    title: 'Pub',
  },
  ];


function initialize() {
  const {x: startX, y: startY} = locations[0].coordinates
  const myLatlng = new maps.LatLng(startX, startY);
  const myOptions = {
    zoom: 8,
    center: myLatlng,
    mapTypeId: maps.MapTypeId.ROADMAP,
  }
  const map = new maps.Map(document.getElementById("map_canvas"), myOptions);

  locations.forEach(({name,title, coordinates:{x, y}})=> {
    const position = new maps.LatLng(x, y);
    const contentString = `<div id="content">${name}</div>`;
    const infoWindow = new maps.InfoWindow({
      content: contentString
    });

    const marker = new maps.Marker({
      position,
      map,
      icon: svgMarker,
      title,
    });

    maps.event.addListener(marker, 'click', () => {
      infoWindow.open(map, marker);
    });
  })

  const searchInput = document.getElementById('search');

  searchInput.addEventListener('change', e => {
    const value = e.target.value;
    const foundLocation = locations.find(({name}) => name.toLowerCase().includes(value.toLowerCase()));
    const foundLocationTitle = locations.find(({title}) => title.toLowerCase().includes(value.toLowerCase()));

    if (foundLocation) {
      const {x, y } = foundLocation.coordinates;
      const position = new maps.LatLng(x, y);

      map.panTo(position);
    }
    else if (foundLocationTitle) {
      const {x, y } = foundLocationTitle.coordinates;
      const position = new maps.LatLng(x, y);
      map.panTo(position);
    }

  })
}

  initialize();

