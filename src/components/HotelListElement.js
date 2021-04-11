import React from 'react';
import './../css/hotelList.scss'
import ReactStars from "react-rating-stars-component";
import { Divider } from 'antd';
import history from './../history';

const HotelListElement = ({ Horizontal, id, hotel, refrescar }) => {

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
                        {refrescar ?
                            <ReactStars
                                classNames="Hotel-list-element-stars"
                                count={5}
                                value={hotel.puntuacio}
                                edit={false}
                                size={30}
                                activeColor="#fcc42b"
                            /> :
                            <div>
                                <ReactStars
                                    classNames="Hotel-list-element-stars"
                                    count={5}
                                    value={hotel.puntuacio}
                                    edit={false}
                                    size={30}
                                    activeColor="#fcc42b"
                                />
                            </div>
                        }
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