mapboxgl.accessToken = 'pk.eyJ1IjoiMjY4MDMxNHEiLCJhIjoiY2t6eTcwOWM0MDhjdzJ2bzZjb2cyZTF0byJ9.iSy5CQspj657XO-X1VmUfA';
const map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/2680314q/cl087clgf000w14o4yyh2gr16' // replace this with your style URL
  
});


map.on('load', () => {
  
  map.getCanvas().style.cursor = 'default';
map.fitBounds([
  [-4.1518, 55.9642],
  [-4.3642, 55.7642]
]);
  const layers = [
"<10",
"20 ",
"30 ",
"40 ",
"50 ",
"60 ",
"70 ",
"80 ",
"90 ",
"100"
];
const colors = [
 "#67001f",
"#b2182b",
"#d6604d",
"#f4a582",
"#fddbc7",
"#d1e5f0",
"#92c5de",
"#4393c3",
"#2166ac",
"#053061"
];// the rest of the code will go in here
  const legend = document.getElementById('legend');

layers.forEach((layer, i) => {
const color = colors[i];
const key = document.createElement("div");
if (i <= 1 || i >= 8) {
key.style.color = "white";
}
  //place holder
key.className = "legend-key";
key.style.backgroundColor = color;
key.innerHTML = `${layer}`;
legend.appendChild(key);
});
map.addSource("hover", {
type: "geojson",
data: { type: "FeatureCollection", features: [] }
});
map.addLayer({
id: "dz-hover",
type: "line",
source: "hover",
layout: {},
paint: {
"line-color": "black",
"line-width": 4
}
});


});

// create legend

map.on('mousemove', (event) => {
  const dzone = map.queryRenderedFeatures(event.point, {
    layers: ['glasgow']
  });
  document.getElementById('pd').innerHTML = dzone.length
    ? `<h3>${dzone[0].properties.DZname}</h3><p><strong><em>${dzone[0].properties.Percentv2}</strong> people per square mile</em></p>`
    : `<p>Hover over a state!</p>`;
  map.getSource("hover").setData({
type: "FeatureCollection",
features: dzone.map(function (f) {
return { type: "Feature", geometry: f.geometry };
})
});
});

map.addControl(new mapboxgl.NavigationControl(), "top-left");
map.addControl(
new mapboxgl.GeolocateControl({
positionOptions: {
enableHighAccuracy: true
},
trackUserLocation: true,
showUserHeading: true
}),
"top-left"
);