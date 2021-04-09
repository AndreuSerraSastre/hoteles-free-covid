import React, { useState } from 'react';
import ReactWeather, { useOpenWeather } from 'react-open-weather';

const ReactWeatherComponent = () => {

    const [lng, setLng] = useState(2.6500);
    const [lat, setLat] = useState(39.5695);

    const { data, isLoading, errorMessage } = useOpenWeather({
        key: '45cdf11aab3ea5515644ae6f583108e3',
        lat: lat,
        lon: lng,
        lang: 'es',
        unit: 'metric', // values are (metric, standard, imperial)
    });

    return (
        <div>
            <ReactWeather
                isLoading={isLoading}
                errorMessage={errorMessage}
                data={data}
                lang="es"
                locationLabel="Mallorca"
                unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
                showForecast
            />
        </div>
    );
}

export default ReactWeatherComponent;
