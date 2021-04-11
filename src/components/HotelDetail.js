import { Button, Dropdown, Menu } from 'antd';
import React, { useState } from 'react';
import ReactStars from "react-rating-stars-component";
import useWindowDimensions from '../hook/useWindowDimensions';
import './../css/hotelDetail.scss'
import Comentarios from './Comentarios';
import history from './../history';
import "./../css/video-react.css"
import { Player } from 'video-react';
import { CloseOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const HotelDetail = ({ id }) => {
    const { height, width } = useWindowDimensions();
    const [visible, setVisible] = useState(false);
    const [video, setvideo] = useState(false);
    const hotel = useSelector(state => state.hoteles.find(hotel => hotel.identificador === id));

    const goMap = () => {
        history.push('./Recomended/' + id);
    }
    const goWeb = () => {
        window.open(hotel.contacte.xarxes.web, "_blank")
    }

    const menu = (
        <Menu>
            <Menu.Item key="1" onClick={() => goWeb()}>Ir al sitio</Menu.Item>
            <Menu.Item key="2" onClick={() => goMap()}>Ver tiempo</Menu.Item>
            <Menu.Item key="3" onClick={() => setvideo(true)}>Ver video</Menu.Item>
        </Menu>
    );

    const CargarMedidas = () => {
        return hotel.dadesPropies.Medidas.map((medida, key) => <li key={key} className="hoteldetail-list-element">{medida}</li>)
    }

    return (
        <div className="hoteldetail-main">
            {hotel ?
                <div className="hoteldetail-main-border">
                    <h1 className="hoteldetail-title">{hotel.nom}</h1>
                    <div className="hoteldetail-main-columns">
                        <div className="hoteldetail-main-information">
                            <h3>{hotel.descripcio}</h3>
                            <div className="hoteldetail-main-information-covid">
                                <div className="hoteldetail-titulo-covid">
                                    <h2 className="hoteldetail-titulo-covid-titulo">Medidas Covid-19</h2>
                                    <img className="hoteldetail-covid" alt="Covid imagen" src={process.env.PUBLIC_URL + '/images/coronavirus.png'}></img>
                                </div>
                                <hr></hr>
                                <ul>
                                    {CargarMedidas()}
                                </ul>
                                <div className="hoteldetail-buttons">
                                    <Button className="hoteldetail-button" onClick={() => goMap()}>Mapa</Button>
                                    <Button className="hoteldetail-button" onClick={() => setVisible(true)}>Ver comentarios</Button>
                                    {width >= 1900 ?
                                        <Dropdown.Button className="hoteldetail-button" overlay={menu}></Dropdown.Button> :
                                        <>
                                            <Button className="hoteldetail-button" onClick={() => goWeb()}> Ir al sitio</Button>
                                            <Button className="hoteldetail-button" onClick={() => goMap()}>Ver tiempo</Button>
                                            <Button className="hoteldetail-button" onClick={() => setvideo(true)}>Ver video</Button>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                        {!video ?
                            <div className="hoteldetail-image" style={{
                                backgroundImage: `url(${hotel.imatges[0]})`
                            }}>
                                <div className="star-main">
                                    <ReactStars
                                        classNames="hoteldetail-stars"
                                        count={5}
                                        value={hotel.puntuacio}
                                        edit={false}
                                        size={width < 1900 ? 40 : 60}
                                        activeColor="#fcc42b"
                                    />
                                </div>
                            </div> :
                            <Player
                                playsInline
                                poster="/assets/poster.png"
                                src={hotel.videos[0].url}
                            />
                        }
                        {video ?
                            <CloseOutlined className="Close-button-player" onClick={() => setvideo(false)} /> :
                            <></>
                        }
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
