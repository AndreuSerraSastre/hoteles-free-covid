import React from 'react';
import { useEffect, useState } from 'react/cjs/react.production.min';
import Carrousel from '../components/Carrousel';
import HotelDetail from '../components/HotelDetail';
import HotelList from '../components/HotelList';
import useWindowDimensions from '../hook/useWindowDimensions';
import './../css/home.scss'

const Home = () => {
    const { height, width } = useWindowDimensions();

    return (
        <div className="Home-main">
            <Carrousel></Carrousel>
            <div className="Home-hotel">
                {width < 1900 ?
                    <HotelList Horizontal={"Horizontal"}></HotelList> :
                    <HotelList Horizontal={""}></HotelList>
                }
                <HotelDetail></HotelDetail>
            </div>
        </div>
    );
}

export default Home;




