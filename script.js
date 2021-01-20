var map;
var countriesDetails = [];
var sortedCountriesCases = [];
var sortedCountriesDeaths = [];
const myLatLang = { lat: 56.130, lng: -106.347 };

fetch("https://disease.sh/v3/covid-19/countries")
   .then(response => response.json())
   .then(data => {
      var countriesCases = [];
      var countriesDeaths = [];

      for (var x = 0; x < data.length; x++) {
         countriesDetails.push([data[x].country, data[x].countryInfo.lat, data[x].countryInfo.long, data[x].cases, data[x].deaths]);
         countriesCases.push(countriesDetails[x][3] + " " + countriesDetails[x][0]);
         countriesDeaths.push(countriesDetails[x][4] + " " + countriesDetails[x][0]);
      }

      var newArray = [];
      var newArray2 = [];
      for (var i = 0; i < countriesCases.length; i++) {
        s = countriesCases[i].split(/(?<=^\S+)\s/);
        newArray.push(s);
      }
      newArray.sort(([a, b], [c, d]) => c - a);
  
      for (var j = 0; j < newArray.length; j++) {
        sortedCountriesCases.push(newArray[j][0] + " " + newArray[j][1]);
      }

      for (var i = 0; i < countriesDeaths.length; i++) {
        s = countriesDeaths[i].split(/(?<=^\S+)\s/);
        newArray2.push(s);
      }
      newArray2.sort(([a, b], [c, d]) => c - a);
  
      for (var j = 0; j < newArray2.length; j++) {
        sortedCountriesDeaths.push(newArray2[j][0] + " " + newArray2[j][1]);
      }

      document.getElementById("countriesByCases").appendChild(createList(sortedCountriesCases));
      document.getElementById("deathsByCases").appendChild(createList(sortedCountriesDeaths));
});

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: myLatLang,
    zoom: 3,
    minZoom: 1
  });

  var iconBase = "http://maps.google.com/mapfiles/kml/pal3/";
  
  var infowindow = new google.maps.InfoWindow( {
    maxWidth: 100
  });

  for (var i = 0; i < countriesDetails.length; i++) {
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(countriesDetails[i][1], countriesDetails[i][2]),
        map: map, 
        icon: iconBase + 'icon38.png'
    });
    marker.addListener('click', (function(marker, i) {
      return function() {
        infowindow.setContent(countriesDetails[i][0] + "\nCases: " + countriesDetails[i][3] + "\nDeaths: " + countriesDetails[i][4]);
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

function createList(arr) {
  var list = document.createElement("ul");
  for (var i = 0; i < arr.length; i++) {
    // Create list item
    var item = document.createElement("li");
    // Set contents of item
    item.appendChild(document.createTextNode(arr[i]));
    // Add it to the list
    list.appendChild(item);
  }
  return list;
}

console.log(sortedCountriesDeaths);