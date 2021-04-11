import React, { useRef, useEffect, useState } from 'react';
import HotelList from '../components/HotelList';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import './../css/recomended.scss'
import ReactDOMServer from "react-dom/server";
import ReactWeatherComponent from '../components/ReactWeatherComponent';
import { useSelector } from 'react-redux';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmV1c2VycmEiLCJhIjoiY2ttNTZqazA1MGJrZzJxa256ZG9oeHVkMCJ9.kNz4v3PWG42gsH0atnjqog';

const Recomended = ({ id }) => {

    const mapContainer = useRef();
    const hotel = useSelector(state => state.hoteles.find(hotel => hotel.identificador === id));

    const [zoom, setZoom] = useState(12);

    const EnRadianes = (number) => {
        return (Math.PI / 180) * number;
    }

    const CalcularDistancia = (lt, lg) => {
        const R = 6378; // Radio de la tierra
        const difLatitud = EnRadianes(lt - hotel.geoposicionament1.lat);
        const difLongitud = EnRadianes(lg - hotel.geoposicionament1.long);

        var a = Math.pow(Math.sin(difLatitud / 2), 2) +
            Math.cos(EnRadianes(hotel.geoposicionament1.lat)) *
            Math.cos(EnRadianes(lt)) *
            Math.pow(Math.sin(difLongitud / 2), 2);

        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return (R * c)?.toFixed(2);
    }

    const CreatePopUp = (hotelbool, lg, lt) => {
        return (
            ReactDOMServer.renderToStaticMarkup(
                <div className="popup-main">
                    <img className='imagen-popup' alt="imagen hotel" src={process.env.PUBLIC_URL + '/images/best-rooftop-views-palma-nakar-hotel-mallorca.jpg'} ></img >
                    <div>
                        <h3 className="titulo-popup">Blau Punta Reina Family Resort</h3>
                        {!hotelbool ?
                            <div>
                                <h4 className="info-popup">Distancia: {CalcularDistancia(lt, lg)} km</h4>
                                <h4 className="info-popup">Lat: {lt?.toFixed(2)} Lon: {lg?.toFixed(2)}</h4>
                                <h5 className="info-popup">{hotel.geoposicionament1.address}</h5>
                                <h5 className="info-popup">Telf: {hotel.contacte.telf}</h5>
                            </div>
                            :
                            <div>
                                <h4 className="info-popup">Lat: {hotel.geoposicionament1.lat?.toFixed(2)} Lon: {hotel.geoposicionament1.long?.toFixed(2)}</h4>
                                <h5 className="info-popup">{hotel.geoposicionament1.address}</h5>
                                <h5 className="info-popup">Telf: {hotel.contacte.telf}</h5>
                            </div>
                        }
                    </div>
                </div>
            )
        )
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        if (hotel) {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [hotel.geoposicionament1.long, hotel.geoposicionament1.lat],
                zoom: zoom,
            });

            map.on('style.load', function (e) {
                map.addSource('markers', {
                    "type": "geojson",
                    "data": {
                        "type": "FeatureCollection",
                        "features": [{
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [hotel.geoposicionament1.long, hotel.geoposicionament1.lat]
                            },
                            "properties": {
                                "modelId": 1,
                            },
                        }]
                    }
                });
                map.addLayer({
                    "id": "circles1",
                    "source": "markers",
                    "type": "circle",
                    "paint": {
                        "circle-radius": 50,
                        "circle-color": "#fdd700",
                        "circle-opacity": 0.3,
                        "circle-stroke-width": 1,
                    },
                    "filter": ["==", "modelId", 1],
                });
            });

            new mapboxgl.Marker({
                color: "#FF0000",
                draggable: false,
            })
                .setLngLat([hotel.geoposicionament1.long, hotel.geoposicionament1.lat])
                .setPopup(new mapboxgl.Popup().setHTML(CreatePopUp(true)))
                .addTo(map);

            new mapboxgl.Marker({
                color: "#FF0000",
                draggable: false,
            })
                .setLngLat([hotel.geoposicionament1.long - 0.005, hotel.geoposicionament1.lat])
                .setPopup(new mapboxgl.Popup().setHTML(CreatePopUp(false, hotel.geoposicionament1.long - 0.005, hotel.geoposicionament1.lat)))
                .addTo(map);

            return () => map.remove();
        }
    }, [hotel]);

    return (
        <div className="recomended-main">
            <HotelList Horizontal="Horizontal" id={id}></HotelList>
            {hotel ?
                <div className="map-container-main">

                    <div className="sidebar">
                        Longitud: {hotel.geoposicionament1.long} | Latitud: {hotel.geoposicionament1.lat} | Zoom: {zoom}
                    </div>
                    <div className="map-container" ref={mapContainer} />
                    <div></div>

                </div> :
                <div></div>
            }
            <br></br>
            <br></br>
            <ReactWeatherComponent id={id}></ReactWeatherComponent>
            <br></br>
            <br></br>
        </div>
    );
}

export default Recomended;
