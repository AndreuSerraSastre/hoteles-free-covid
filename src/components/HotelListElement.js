import React from 'react';
import './../css/hotelList.scss'
import ReactStars from "react-rating-stars-component";
import { Divider } from 'antd';

const HotelListElement = ({ Horizontal }) => {

    return (
        <div className={`Hotel-list-element${Horizontal}`}>
            <div className="Hotel-list-element-no-divider">
                <h1 className="Hotel-list-element-name">Blau Punta Reina Family Resort</h1>
                <div className="Hotel-list-element-image" style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL + '/images/best-rooftop-views-palma-nakar-hotel-mallorca.jpg'})`
                }}>
                    <ReactStars
                        classNames="Hotel-list-element-stars"
                        count={5}
                        value={3}
                        edit={false}
                        size={30}
                        activeColor="#fcc42b"
                    />
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