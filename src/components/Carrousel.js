import React from 'react';
import { Carousel } from 'antd';
import './../css/carrousel.scss'
const Carrousel = () => {

    return (
        <Carousel autoplay >
            <div className="carrousel-div carrousel-div-1">
                <h1 className="carrousel-title">Hoteles Free Covid</h1>
            </div>
            <div className="carrousel-div carrousel-div-2">
                <h1 className="carrousel-title">Hoteles Free Covid</h1>
            </div>
            <div className="carrousel-div carrousel-div-3">
                <h1 className="carrousel-title">Hoteles Free Covid</h1>
            </div>
            <div className="carrousel-div carrousel-div-4">
                <h1 className="carrousel-title">Hoteles Free Covid</h1>
            </div>
        </Carousel>
    );
}

export default Carrousel;
