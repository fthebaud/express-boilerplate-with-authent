'use strict';

function initMap() { // eslint-disable-line
  const coordinates = {lat: -25.363, lng: 131.044};

  const map = new google.maps.Map(document.querySelector('#map'), {
    zoom: 4,
    center: coordinates
  });

  const marker = new google.maps.Marker({ // eslint-disable-line
    position: coordinates,
    map
  });
}
