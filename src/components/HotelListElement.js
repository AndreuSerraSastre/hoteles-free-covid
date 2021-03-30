import React from 'react';
import './../css/hotelList.scss'
import ReactStars from "react-rating-stars-component";
import { Divider } from 'antd';
import history from './../history';

const HotelListElement = ({ Horizontal, id }) => {

    const hotelSelected = () => {
        if(history.location.pathname.split('/')[1] === "Recomended"){
        history.push(`${history.location.pathname.split('/')[1]}/dasdasd65ac16`);
        }else{
            history.push(`./dasdasd65ac16`);
        }
    }

    return (
        <div className={`Hotel-list-element${Horizontal} `} onClick={() => hotelSelected('dasdasd65ac16')}>
            <div className={`Hotel-list-element-no-divider ${id === 'dasdasd65ac16' ? 'Hotel-list-element-selected' : ''}`}>
                <h1 className="Hotel-list-element-name">Blau Punta Reina Family Resort</h1>
                <div className="Hotel-list-element-image" style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL + '/images/best-rooftop-views-palma-nakar-hotel-mallorca.jpg'})`
                }}>
                    <div className="star-main">
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
            </div>
            {!Horizontal ?
                <Divider /> :
                <></>
            }
        </div>
    );
}

export default HotelListElement;