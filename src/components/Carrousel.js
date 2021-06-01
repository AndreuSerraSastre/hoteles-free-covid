import React from 'react';
import './../css/carrousel.scss'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const Carrousel = () => {

    return (
        <Carousel className="carrousel-main" autoPlay={true} infiniteLoop={true} showThumbs={false} dynamicHeight={false}>
            <div>
                <img className="imagen-hotel-carrousel" alt="imagen hotel" src={'https://firebasestorage.googleapis.com/v0/b/gtask-a9728.appspot.com/o/best-rooftop-views-palma-nakar-hotel-mallorca.jpg?alt=media&token=8c193fb0-7c3c-4ed6-baaa-239fbffa1d7a'} />
                <p className="legend carrousel-title">Hoteles Free Covid</p>
            </div>
            <div>
                <img className="imagen-hotel-carrousel" alt="imagen hotel" src={'https://firebasestorage.googleapis.com/v0/b/gtask-a9728.appspot.com/o/HOME_CABECERA_01.jpg?alt=media&token=97289c6d-2f4b-4d37-aec2-6229d6c1a7f9'} />
                <p className="legend carrousel-title">Hoteles Free Covid</p>
            </div>
            <div>
                <img className="imagen-hotel-carrousel" alt="imagen hotel" src={'https://firebasestorage.googleapis.com/v0/b/gtask-a9728.appspot.com/o/Mobile-Sunrise-cabecera.jpg?alt=media&token=6c20bdc3-6d4e-46ca-a01b-794319b8f807'} />
                <p className="legend carrousel-title">Hoteles Free Covid</p>
            </div>
        </Carousel>
    );
}

export default Carrousel;
