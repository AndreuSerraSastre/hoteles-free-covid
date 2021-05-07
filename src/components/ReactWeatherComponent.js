import React from 'react';
import ReactWeather, { useOpenWeather } from 'react-open-weather';

const ReactWeatherComponent = ({ hotel }) => {

    const { data, isLoading, errorMessage } = useOpenWeather({
        key: '45cdf11aab3ea5515644ae6f583108e3',
        lat: hotel?.geoposicionament1.lat,
        lon: hotel?.geoposicionament1.long,
        lang: 'es',
        unit: 'metric', // values are (metric, standard, imperial)
    });

    return (
        <div>
            {hotel ?
                <ReactWeather
                    isLoading={isLoading}
                    errorMessage={errorMessage}
                    data={data}
                    lang="es"
                    locationLabel="Mallorca"
                    unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
                    showForecast
                /> :
                <div></div>
            }
        </div>
    );
}

export default ReactWeatherComponent;
