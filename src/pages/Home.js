import React from 'react';
import { useEffect, useState } from 'react/cjs/react.production.min';
import Carrousel from '../components/Carrousel';
import HotelDetail from '../components/HotelDetail';
import HotelList from '../components/HotelList';
import useWindowDimensions from '../hook/useWindowDimensions';
import './../css/home.scss'

const Home = ({ id }) => {
    const { height, width } = useWindowDimensions();

    console.log(id);

    return (
        <div className="Home-main">
            <Carrousel></Carrousel>
            <div className="Home-hotel">
                {width < 1900 ?
                    <HotelList Horizontal={"Horizontal"} id={id}></HotelList> :
                    <HotelList Horizontal={""} id={id}></HotelList>
                }
                <HotelDetail id={id}></HotelDetail>
            </div>
        </div>
    );
}

export default Home;




