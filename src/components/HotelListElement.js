import React from 'react';
import './../css/hotelList.scss'
import Rating from '@material-ui/lab/Rating';
import { Divider } from 'antd';
import history from './../history';
import { Helmet } from 'react-helmet';

const HotelListElement = ({ Horizontal, id, hotel }) => {

    const hotelSelected = () => {
        if (history.location.pathname.split('/')[1] === "Recomended") {
            history.push("/Recomended/" + hotel.identificador);
        } else {
            history.push(`./` + hotel.identificador);
        }
    }

    const structuredDataSingle = () => {

        let data = {
            "@context": "http://schema.org/",
            "@type": "Hotel",
            "name": `${hotel.nom}`,
            "image": hotel.imatges[0],
            "description": hotel.descripcio,
            "address": hotel.geoposicionament1.address,
            "priceRange": hotel.preu.import,
            "telephone": hotel.contacte.telf,
            "starRating": {
                "@type": "Rating",
                "ratingValue": hotel.puntuacio
            },
            "email": hotel.contacte.email,
            "legalName": hotel.nom,
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": hotel.geoposicionament1.lat,
                "longitude": hotel.geoposicionament1.long
            },
        };

        return JSON.stringify(data);
    };

    return (
        <div className={`Hotel-list-element${Horizontal} `} onClick={() => hotelSelected()}>
            <div itemscope itemtype="http://schema.org/Hotel" className={`Hotel-list-element-no-divider ${id === hotel.identificador ? 'Hotel-list-element-selected' : ''}`}>
                <h1 itemprop="legalName" className="Hotel-list-element-name">{hotel.nom}</h1>
                <div className="Hotel-list-element-image" style={{
                    backgroundImage: `url(${hotel.imatges[0]})`
                }}>
                    <div className="star-main">
                        <Rating itemprop="starRating" name="read-only" size="large" className="Hotel-list-element-stars" value={hotel.puntuacio} readOnly />
                    </div>
                </div>
            </div>
            {!Horizontal ?
                <Divider /> :
                <></>
            }
            <Helmet>
                <script className='structured-data-list' type="application/ld+json">{structuredDataSingle()}</script>
            </Helmet>
        </div>
    );
}

export default HotelListElement;