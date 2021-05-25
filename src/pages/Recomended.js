import React, { useRef, useEffect, useState } from 'react';
import HotelList from '../components/HotelList';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import './../css/recomended.scss'
import ReactDOMServer from "react-dom/server";
import ReactWeatherComponent from '../components/ReactWeatherComponent';
import { useDispatch, useSelector } from 'react-redux';
import { datosExternosGet } from '../actions/datosExternosAction';
import Loading from '../components/Loading';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmV1c2VycmEiLCJhIjoiY2ttNTZqazA1MGJrZzJxa256ZG9oeHVkMCJ9.kNz4v3PWG42gsH0atnjqog';

const Recomended = ({ id }) => {

    const mapContainer = useRef();
    const hotel = useSelector(state => state.hoteles.find(hotel => hotel.identificador === id));
    let datosExternos = useSelector(state => state.datosExternos);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [zoom] = useState(12);

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

    const CreatePopUp = (hotelbool, object) => {
        return (
            ReactDOMServer.renderToStaticMarkup(
                <div itemscope itemtype="http://schema.org/Hotel" className="popup-main">
                    {hotelbool ?
                        <img className='imagen-popup' alt="imagen hotel" src={hotel.imatges[0]} ></img > :
                        <img className='imagen-popup' alt="imagen" src={object.imatges[0]} ></img >
                    }
                    <div>
                        {hotelbool ?
                            <h3 itemprop="legalName" className="titulo-popup">{hotel.nom}</h3> :
                            <h3 className="titulo-popup">{object.nom}</h3>
                        }
                        {!hotelbool ?
                            <div>
                                <h4 className="info-popup">Distancia: {CalcularDistancia(object.geoposicionament1.lat, object.geoposicionament1.long)} km</h4>
                                <h4 className="info-popup">Lat: {object.geoposicionament1.lat?.toFixed(2)} Lon: {object.geoposicionament1.long?.toFixed(2)}</h4>
                                <h5 className="info-popup">{object.geoposicionament1.address}</h5>
                                <h5 className="info-popup">Telf: {object.contacte.telf}</h5>
                            </div>
                            :
                            <div>
                                <h4 itemprop="geo" className="info-popup">Lat: {hotel.geoposicionament1.lat?.toFixed(2)} Lon: {hotel.geoposicionament1.long?.toFixed(2)}</h4>
                                <h5 itemprop="address" className="info-popup">{hotel.geoposicionament1.address}</h5>
                                <h5 itemprop="telephone" className="info-popup">Telf: {hotel.contacte.telf}</h5>
                            </div>
                        }
                    </div>
                </div>
            )
        )
    }

    const datosExternosGetPage = async () => {
        setLoading(true);
        const response = await dispatch(datosExternosGet());
        if (response.status === 400) {
            alert.show(response.err)
        } else if (response.status === 404 || response.status === 500) {
            alert.show('ERROR DE CONEXIÓN CON EL SERVIDOR.')
        }
        setLoading(false);
    }

    const cargarDatosMapa = () => {
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

        navigator.geolocation.getCurrentPosition(function (position) {
            var el1 = document.createElement('div');
            el1.className = 'marker';

            new mapboxgl.Marker(el1)
                .setLngLat([position.coords.longitude, position.coords.latitude])
                .addTo(map);
        });
        if (datosExternos[0]) {
            for (let index = 0; index < datosExternos[0].length; index++) {
                var el2 = document.createElement('div');
                el2.className = 'playas';

                const playa = datosExternos[0][index];

                new mapboxgl.Marker(el2)
                    .setLngLat([playa.geoposicionament1.long, playa.geoposicionament1.lat])
                    .setPopup(new mapboxgl.Popup().setHTML(CreatePopUp(false, playa)))
                    .addTo(map);
            }
        }

        if (datosExternos[1]) {
            for (let index = 0; index < datosExternos[1].length; index++) {
                var el3 = document.createElement('div');
                el3.className = 'bares';

                const bar = datosExternos[1][index];

                new mapboxgl.Marker(el3)
                    .setLngLat([bar.geoposicionament1.long, bar.geoposicionament1.lat])
                    .setPopup(new mapboxgl.Popup().setHTML(CreatePopUp(false, bar)))
                    .addTo(map);
            }
        }

        if (datosExternos[2]) {
            for (let index = 0; index < datosExternos[2].length; index++) {
                var el4 = document.createElement('div');
                el4.className = 'ferias';

                const feria = datosExternos[2][index];

                new mapboxgl.Marker(el4)
                    .setLngLat([feria.geoposicionament1.long, feria.geoposicionament1.lat])
                    .setPopup(new mapboxgl.Popup().setHTML(CreatePopUp(false, feria)))
                    .addTo(map);
            }
        }

        if (datosExternos[3]) {
            for (let index = 0; index < datosExternos[3].length; index++) {
                var el5 = document.createElement('div');
                el5.className = 'calas';

                const cala = datosExternos[3][index];

                new mapboxgl.Marker(el5)
                    .setLngLat([cala.geoposicionament1.long, cala.geoposicionament1.lat])
                    .setPopup(new mapboxgl.Popup().setHTML(CreatePopUp(false, cala)))
                    .addTo(map);
            }
        }

        if (datosExternos[4]) {
            for (let index = 0; index < datosExternos[4].length; index++) {
                var el6 = document.createElement('div');
                el6.className = 'mercados';

                const mercado = datosExternos[4][index];

                new mapboxgl.Marker(el6)
                    .setLngLat([mercado.geoposicionament1.long, mercado.geoposicionament1.lat])
                    .setPopup(new mapboxgl.Popup().setHTML(CreatePopUp(false, mercado)))
                    .addTo(map);
            }
        }

        new mapboxgl.Marker({
            color: "#FF0000",
            draggable: false,
        })
            .setLngLat([hotel.geoposicionament1.long, hotel.geoposicionament1.lat])
            .setPopup(new mapboxgl.Popup().setHTML(CreatePopUp(true)))
            .addTo(map);

        return () => map.remove();
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        if (!datosExternos || datosExternos.length === 0) {
            datosExternosGetPage();
        }
        if (hotel && datosExternos && datosExternos.length !== 0) {
            cargarDatosMapa();
        }
    });

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
            {hotel ?
                <ReactWeatherComponent hotel={hotel}></ReactWeatherComponent> :
                <></>
            }
            <br></br>
            <br></br>
            <Loading loading={loading}></Loading>
        </div>
    );
}

export default Recomended;
