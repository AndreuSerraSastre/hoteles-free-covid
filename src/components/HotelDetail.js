import { Button } from 'antd';
import React from 'react';
import ReactStars from "react-rating-stars-component";
import './../css/hotelDetail.scss'

const HotelDetail = () => {

    return (
        <div className="hoteldetail-main">
            <div className="hoteldetail-main-border">
                <h1 className="hoteldetail-title">Blau Punta Reina Family Resort</h1>
                <div className="hoteldetail-main-columns">
                    <div className="hoteldetail-main-information">
                        <h3>El Amic Horizonte es un hotel de gestión familiar con vistas a la bahía de Palma, situado cerca del puerto de Palma. Super bien ubicado, excelente atención.</h3>
                        <div className="hoteldetail-main-information-covid">
                            <div className="hoteldetail-titulo-covid">
                                <h2 className="hoteldetail-titulo-covid-titulo">Medidas Covid-19</h2>
                                <img className="hoteldetail-covid" alt="Covid imagen" src={process.env.PUBLIC_URL + '/images/coronavirus.png'}></img>
                            </div>
                            <hr></hr>
                            <ul>
                                <li className="hoteldetail-list-element">Gel hidroalcolico</li>
                                <li className="hoteldetail-list-element">Comida servida a mesa</li>
                                <li className="hoteldetail-list-element">Mascarillas gratis</li>
                                <li className="hoteldetail-list-element">Test diario de antigenos</li>
                            </ul>
                            <div className="hoteldetail-buttons">
                                <Button className="hoteldetail-button">Ir al sitio</Button>
                                <Button className="hoteldetail-button">Ver comentarios</Button>
                                <Button className="hoteldetail-button">Mapa</Button>
                            </div>
                        </div>
                    </div>
                    <div className="hoteldetail-image" style={{
                        backgroundImage: `url(${process.env.PUBLIC_URL + '/images/best-rooftop-views-palma-nakar-hotel-mallorca.jpg'})`
                    }}>
                        <ReactStars
                            classNames="hoteldetail-stars"
                            count={5}
                            value={3}
                            edit={false}
                            size={60}
                            activeColor="#fcc42b"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HotelDetail;
