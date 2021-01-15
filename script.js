var map;
var countriesLocation = [];
const myLatLang = { lat: 56.130, lng: -106.347 };

fetch("https://disease.sh/v3/covid-19/countries")
   .then(response => response.json())
   .then(data => {
      for (var x = 0; x < data.length; x++) {
         countriesLocation.push([data[x].country, data[x].countryInfo.lat, data[x].countryInfo.long, data[x].cases, data[x].deaths]);
      }
});

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: myLatLang,
    zoom: 3,
    minZoom: 1
  });
  
  var infowindow = new google.maps.InfoWindow( {
    maxWidth: 100
  });

  for (var i = 0; i < countriesLocation.length; i++) {
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(countriesLocation[i][1], countriesLocation[i][2]),
        map: map
    });
    marker.addListener('click', (function(marker, i) {
      return function() {
        infowindow.setContent(countriesLocation[i][0] + "\nCases: " + countriesLocation[i][3] + "\nDeaths: " + countriesLocation[i][4]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
}

function getTotalGlobalCases() {
  var globalCases = document.getElementById("globalCases");

  fetch("https://disease.sh/v3/covid-19/all")
   .then(response => response.json())
   .then(data => {
      var totalGlobalCases = data.cases;
      document.getElementById("globalCasesNumber").textContent = totalGlobalCases;
  });
}

function getTotalGlobalDeaths() {
  var globalDeaths = document.getElementById("globalDeaths");

  fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      var totalGlobalDeaths = data.deaths;
      document.getElementById("globalDeathsNumber").textContent = totalGlobalDeaths;
  });
}

getTotalGlobalCases();
getTotalGlobalDeaths();
