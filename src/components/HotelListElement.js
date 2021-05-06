import React from 'react';
import './../css/hotelList.scss'
import Rating from '@material-ui/lab/Rating';
import { Divider } from 'antd';
import history from './../history';

const HotelListElement = ({ Horizontal, id, hotel }) => {

    const hotelSelected = () => {
        if (history.location.pathname.split('/')[1] === "Recomended") {
            history.push("/Recomended/" + hotel.identificador);
        } else {
            history.push(`./` + hotel.identificador);
        }
    }

    return (
        <div className={`Hotel-list-element${Horizontal} `} onClick={() => hotelSelected()}>
            <div className={`Hotel-list-element-no-divider ${id === hotel.identificador ? 'Hotel-list-element-selected' : ''}`}>
                <h1 className="Hotel-list-element-name">{hotel.nom}</h1>
                <div className="Hotel-list-element-image" style={{
                    backgroundImage: `url(${hotel.imatges[0]})`
                }}>
                    <div className="star-main">
                        <Rating name="read-only" size="large" classNames="Hotel-list-element-stars" value={hotel.puntuacio} readOnly />
                    </div>
                </div>
            </div>
            {!Horizontal ?
                <Divider /> :
                <></>
            }
        </div>
    );
}

export default HotelListElement;