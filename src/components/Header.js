import React from 'react';
import Search from 'antd/lib/input/Search';
import history from './../history'
import { Dropdown, Menu } from 'antd';
import './../css/header.scss'
import Modal from 'antd/lib/modal/Modal';
import { useState } from 'react';
import LoginDemo from './Login';
import Register from './Register';
import useWindowDimensions from './../hook/useWindowDimensions'
import { AUTHORIZATION, FILTRO } from '../constants';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {

    const [ModalVisible, setModalVisible] = useState(false);
    const [Registrarse, setRegistrarse] = useState(false);
    const { width } = useWindowDimensions();
    let auth = useSelector(state => state.authorization.auth);
    let usuario = useSelector(state => state.authorization.usuario);
    let filtro = useSelector(state => state.filtro);
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch({ type: AUTHORIZATION, payload: { token: '', auth: false, usuario: null } });
    };

    const onSearch = (text) => {
        dispatch({ type: FILTRO, payload: { filtro: text } });
    }

    const goHome = () => {
        history.push('/')
    }

    const goRecomended = () => {
        history.push('./Recomended')
    }

    const menu = (
        <Menu>
            <Menu.Item>
                <h3 className="header-menu-item" target="_blank" rel="noopener noreferrer" onClick={goHome}>Ir al Home</h3>
            </Menu.Item>
            <Menu.Item>
                <h3 className="header-menu-item" target="_blank" rel="noopener noreferrer" onClick={goRecomended}>Recomendaciones</h3>
            </Menu.Item>
        </Menu>
    );

    const cerrarSesion = (
        <Menu>
            <Menu.Item>
                <h3 className="header-menu-item" target="_blank" rel="noopener noreferrer" onClick={logOut}>Cerrar Sesión</h3>
            </Menu.Item>
        </Menu>
    );


    return (
        <header className="header-main">
            {width < 1900 ?
                <></> :
                <img alt="home" className="header-image" onClick={goHome} src={process.env.PUBLIC_URL + '/images/signo-de-hotel.svg'}></img>
            }
            <Search placeholder="Buscar..." allowClear onSearch={onSearch} defaultValue={filtro} style={{ width: 400 }} />
            <div className="header-buttons">
                <Dropdown className="header-menu" overlay={menu} placement="bottomCenter" arrow>
                    <h3 onClick={e => e.preventDefault()}>
                        Menú
                    </h3>
                </Dropdown>
                {!auth ?
                    <h3 className="header-login" onClick={() => setModalVisible(true)}>Login</h3> :
                    <Dropdown className="header-menu" overlay={cerrarSesion} placement="bottomCenter" arrow>
                        <h3 onClick={e => e.preventDefault()}>
                            {usuario.nombre}
                        </h3>
                    </Dropdown>
                }
            </div>
            <Modal
                centered
                visible={ModalVisible}
                onOk={() => setModalVisible(false)}
                onCancel={() => setModalVisible(false)}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                {!Registrarse ?
                    <LoginDemo setRegistrarse={setRegistrarse} setModalVisible={setModalVisible}></LoginDemo> :
                    <Register setRegistrarse={setRegistrarse} setModalVisible={setModalVisible}></Register>
                }

            </Modal>
        </header>
    );
}

export default Header;


