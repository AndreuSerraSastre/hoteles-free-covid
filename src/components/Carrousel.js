import React from 'react';
import './../css/carrousel.scss'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const Carrousel = () => {

    return (
        <Carousel className="carrousel-main" autoPlay={true} infiniteLoop={true} showThumbs={false} dynamicHeight={false}>
            <div>
                <img className="imagen-hotel-carrousel" alt="imagen hotel" src={process.env.PUBLIC_URL + '/images/best-rooftop-views-palma-nakar-hotel-mallorca.jpg'} />
                <p className="legend carrousel-title">Hoteles Free Covid</p>
            </div>
            <div>
                <img className="imagen-hotel-carrousel" alt="imagen hotel" src={process.env.PUBLIC_URL + '/images/HOME_CABECERA_01.jpg'} />
                <p className="legend carrousel-title">Hoteles Free Covid</p>
            </div>
            <div>
                <img className="imagen-hotel-carrousel" alt="imagen hotel" src={process.env.PUBLIC_URL + '/images/Mobile-Sunrise-cabecera.jpg'} />
                <p className="legend carrousel-title">Hoteles Free Covid</p>
            </div>
        </Carousel>
    );
}

export default Carrousel;
