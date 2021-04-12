import { Button, Tabs, Form, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react';
import './../css/comentarios.scss'
import Comentario from './Comentario';
import Puntuacion from './Puntuacion';
import ReactStars from "react-rating-stars-component";
import { addComent, comentariosGet } from '../actions/comentarioAction';
import { addPuntua, puntuacionesGet } from '../actions/puntuacionesAction';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import Loading from './Loading';

const Comentarios = ({ visible, setVisible, id }) => {

    const titles = ['Comentarios', 'Puntuaciones'];
    const buttons = ['Añadir comentario', 'Añadir puntuación'];
    const [key, setKey] = useState(1);
    const [value, setValue] = useState(3);
    const dispatch = useDispatch();
    let auth = useSelector(state => state.authorization.auth);
    let usuario = useSelector(state => state.authorization.usuario);
    const [añadirComentario, setañadirComentario] = useState(false);
    const [añadirPuntuacion, setañadirPuntuacion] = useState(false);
    const [loading, setLoading] = useState(false);

    const alert = useAlert()
    let comentarios = useSelector(state => state.comentarios);
    let puntuaciones = useSelector(state => state.puntuaciones);

    const { TabPane } = Tabs;

    const callback = (item) => {
        setKey(item);
        setañadirComentario(false);
        setañadirPuntuacion(false);
    }

    const añadir = () => {
        if (auth) {
            if (Number(key) === 1) {
                setañadirComentario(!añadirComentario);
            } else {
                setañadirPuntuacion(!añadirPuntuacion);
            }
        } else {
            alert.show('ES NECESARIO ESTAR REGISTRADO.')
        }
    }

    const addComentario = async (comentarioForm) => {
        setLoading(true);
        const comentario = {
            nombre: usuario.nombre,
            fecha: new Date(),
            comentario: comentarioForm.comentario
        }
        const response = await dispatch(addComent(comentarios, comentario, id));
        if (response.status === 400) {
            alert.show(response.err)
        } else if (response.status === 404 || response.status === 500) {
            alert.show('ERROR DE CONEXIÓN CON EL SERVIDOR.')
        } else {
            setañadirComentario(false);
        }
        setLoading(false);
    }

    const addPuntuacion = async (puntuacionForm) => {
        console.log(puntuacionForm)
        setLoading(true);
        const puntuacion = {
            nombre: usuario.nombre,
            fecha: new Date(),
            comentario: puntuacionForm.comentario,
            puntuacion: value
        }
        const response = await dispatch(addPuntua(puntuaciones, puntuacion, id));
        if (response.status === 400) {
            alert.show(response.err)
        } else if (response.status === 404 || response.status === 500) {
            alert.show('ERROR DE CONEXIÓN CON EL SERVIDOR.')
        } else {
            setañadirPuntuacion(false);
        }
        setLoading(false);
    }

    const CargarComentarios = () => {
        return comentarios.find(comentario => comentario.identificador === id)?.comentarios.map((comentario, key) => <Comentario comentario={comentario}></Comentario>)
    }

    const CargarPuntuaciones = () => {
        return puntuaciones.find(puntuacion => puntuacion.identificador === id)?.puntuaciones.map((puntuacion, key) => <Puntuacion puntuacion={puntuacion}></Puntuacion>)
    }

    useEffect(async () => {
        if (!comentarios || comentarios.length === 0) {
            comentarios = await dispatch(comentariosGet());
        }
        if (!puntuaciones || puntuaciones.length === 0) {
            puntuaciones = await dispatch(puntuacionesGet());
        }
    }, [])

    const setValorEstrella = (valor) => {
        setValue(valor)
    }

    return (
        <Modal
            visible={visible}
            title={titles[key - 1]}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            footer={[
                <Button key="back" onClick={() => setVisible(false)}>
                    {'Cancelar'}
                </Button>,
                <Button key="submit" type="primary" onClick={añadir}>
                    {buttons[key - 1]}
                </Button>
            ]}
        >
            <Tabs defaultActiveKey={key} onChange={callback}>
                <TabPane tab="Comentarios" key="1">
                    <div>
                        {añadirComentario ?
                            <Form className="add-comentario" onFinish={addComentario}>
                                <h3>Añade tu comentario:</h3>
                                <Form.Item
                                    name="comentario"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Introduce el comentario',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Añade tu comentario"></Input>
                                </Form.Item>
                                <Button type="primary" htmlType="submit" >Enviar</Button>
                                <hr></hr>
                            </Form> :
                            <></>
                        }
                        <div className="lista-comentarios">
                            {CargarComentarios()}
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="Puntuaciones" key="2">
                    <div>
                        {añadirPuntuacion ?
                            <Form className="add-comentario" onFinish={addPuntuacion}>
                                <h3>Añade tu puntuación:</h3>
                                <Form.Item
                                    className="form-comentario"
                                    name="comentario"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Introduce el comentario',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Añade tu comentario"></Input>
                                </Form.Item>
                                <div className="starfocus">
                                    <ReactStars
                                        count={5}
                                        value={value}
                                        size={35}
                                        activeColor="#fcc42b"
                                        onChange={setValorEstrella}
                                    />
                                </div>
                                <Button type="primary" htmlType="submit" >Enviar</Button>
                                <hr></hr>
                            </Form> :
                            <></>
                        }
                        <div className="lista-comentarios">
                            {CargarPuntuaciones()}
                        </div>
                    </div>
                </TabPane>
            </Tabs>
            <Loading loading={loading}></Loading>
        </Modal>
    );
}

export default Comentarios;


