import React, { useRef, useEffect, useState } from 'react';
// import HotelList from '../components/HotelList';
// import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
// import './../css/recomended.scss'
// import ReactDOMServer from "react-dom/server";

// mapboxgl.workerClass = MapboxWorker;
// mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmV1c2VycmEiLCJhIjoiY2ttNTZqazA1MGJrZzJxa256ZG9oeHVkMCJ9.kNz4v3PWG42gsH0atnjqog';

const Recomended = () => {

    // const mapContainer = useRef();
    // const [lng, setLng] = useState(2.6500);
    // const [lat, setLat] = useState(39.5695);
    // const [zoom, setZoom] = useState(12);

    // const EnRadianes = (number) => {
    //     return (Math.PI / 180) * number;
    // }

    // const CalcularDistancia = (lt, lg) => {
    //     const R = 6378; // Radio de la tierra
    //     const difLatitud = EnRadianes(lt - lat);
    //     const difLongitud = EnRadianes(lg - lng);

    //     var a = Math.pow(Math.sin(difLatitud / 2), 2) +
    //         Math.cos(EnRadianes(lat)) *
    //         Math.cos(EnRadianes(lt)) *
    //         Math.pow(Math.sin(difLongitud / 2), 2);

    //     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    //     return (R * c)?.toFixed(2);
    // }

    // const CreatePopUp = (hotel, lg, lt) => {
    //     return (
    //         ReactDOMServer.renderToStaticMarkup(
    //             <div className="popup-main">
    //                 <img className='imagen-popup' alt="imagen hotel" src={process.env.PUBLIC_URL + '/images/best-rooftop-views-palma-nakar-hotel-mallorca.jpg'} ></img >
    //                 <div>
    //                     <h3 className="titulo-popup">Blau Punta Reina Family Resort</h3>
    //                     {!hotel ?
    //                         <div>
    //                             <h4>Distancia: {CalcularDistancia(lt, lg)} km</h4>
    //                             <h4>Lat: {lt?.toFixed(4)} Lon: {lg?.toFixed(4)}</h4>
    //                         </div>
    //                         :
    //                         <div>
    //                             <h4>Lat: {lat?.toFixed(4)}</h4>
    //                             <h4>Lon: {lng?.toFixed(4)}</h4>
    //                         </div>
    //                     }

    //                 </div>
    //             </div>
    //         )
    //     )
    // }

    // useEffect(() => {
    //     const map = new mapboxgl.Map({
    //         container: mapContainer.current,
    //         style: 'mapbox://styles/mapbox/streets-v11',
    //         center: [lng, lat],
    //         zoom: zoom,
    //     });

    //     map.on('move', () => {
    //         setLng(map.getCenter().lng.toFixed(4));
    //         setLat(map.getCenter().lat.toFixed(4));
    //         setZoom(map.getZoom().toFixed(2));
    //     });

    //     map.on('style.load', function (e) {
    //         map.addSource('markers', {
    //             "type": "geojson",
    //             "data": {
    //                 "type": "FeatureCollection",
    //                 "features": [{
    //                     "type": "Feature",
    //                     "geometry": {
    //                         "type": "Point",
    //                         "coordinates": [lng, lat]
    //                     },
    //                     "properties": {
    //                         "modelId": 1,
    //                     },
    //                 }]
    //             }
    //         });
    //         map.addLayer({
    //             "id": "circles1",
    //             "source": "markers",
    //             "type": "circle",
    //             "paint": {
    //                 "circle-radius": 50,
    //                 "circle-color": "#fdd700",
    //                 "circle-opacity": 0.3,
    //                 "circle-stroke-width": 1,
    //             },
    //             "filter": ["==", "modelId", 1],
    //         });
    //     });

    //      new mapboxgl.Marker({
    //         color: "#FF0000",
    //         draggable: false,
    //     })
    //         .setLngLat([lng, lat])
    //         .setPopup(new mapboxgl.Popup().setHTML(CreatePopUp(true)))
    //         .addTo(map);

    //     new mapboxgl.Marker({
    //         color: "#FF0000",
    //         draggable: false,
    //     })
    //         .setLngLat([lng + 0.05, lat])
    //         .setPopup(new mapboxgl.Popup().setHTML(CreatePopUp(false, lng + 0.05, lat)))
    //         .addTo(map);

    //     return () => map.remove();
    // }, []);

    return (
        <div className="recomended-main">
            {/* <HotelList Horizontal="Horizontal"></HotelList>
            <div className="map-container-main">
                <div className="sidebar">
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
                <div className="map-container" ref={mapContainer} />
            </div> */}
        </div>
    );
}

export default Recomended;
