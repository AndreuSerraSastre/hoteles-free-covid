import { Button } from 'antd';
import React, { useState } from 'react';
import ReactStars from "react-rating-stars-component";
import useWindowDimensions from '../hook/useWindowDimensions';
import './../css/hotelDetail.scss'
import Comentarios from './Comentarios';
import history from './../history';

const HotelDetail = ({ id }) => {
    const { height, width } = useWindowDimensions();
    const [visible, setVisible] = useState(false);

    const goMap = () => {
        history.push('./Recomended/' + id);
    }

    return (
        <div className="hoteldetail-main">
            {id ?
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
                                    <Button className="hoteldetail-button" onClick={() => setVisible(true)}>Ver comentarios</Button>
                                    <Button className="hoteldetail-button" onClick={() => goMap()}>Mapa</Button>
                                </div>
                            </div>
                        </div>
                        <div className="hoteldetail-image" style={{
                            backgroundImage: `url(${process.env.PUBLIC_URL + '/images/best-rooftop-views-palma-nakar-hotel-mallorca.jpg'})`
                        }}>
                            <div className="star-main">
                                <ReactStars
                                    classNames="hoteldetail-stars"
                                    count={5}
                                    value={3}
                                    edit={false}
                                    size={width < 1900 ? 40 : 60}
                                    activeColor="#fcc42b"
                                />
                            </div>
                        </div>
                        <Comentarios visible={visible} setVisible={setVisible}></Comentarios>
                    </div>
                </div> :
                <div className="Hotel-No-Seleccionado">
                    <h1 className="Hotel-No-Seleccionado-texto">Hotel no seleccionado</h1>
                </div>
            }
        </div>
    );
}

export default HotelDetail;
