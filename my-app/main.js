import './style.css';
import {Map, View,Feature} from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Point from 'ol/geom/Point';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

let estaciones;

fetch("estaciones.json").then(response => response.json()).then((data) => {
  Object.keys(data).forEach(function(key,index){
    estaciones = (data[key])
  })
}).then(() => {

  const map = new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    view: new View({
      center: [0, 0],
      zoom: 2
    })
  });
  

  
  const vectorLayer = new VectorLayer({
    title:"POI",
    source: new VectorSource({
      features:[]
    })
  })

  let markers = []

  estaciones.forEach(el => {
    const marker = new Feature({
      geometry: new Point(new fromLonLat([el.longitud,el.latitud])),
      type: "hospital",
      name:"test"
    });
    markers.push(marker)

  })

  vectorLayer.getSource().addFeatures(markers)
  map.addLayer(vectorLayer)

})



