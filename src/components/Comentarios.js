import { Button, Tabs, Form, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import './../css/comentarios.scss'
import Comentario from './Comentario';
import Puntuacion from './Puntuacion';
import ReactStars from "react-rating-stars-component";

const Comentarios = ({ visible, setVisible }) => {

    const titles = ['Comentarios', 'Puntuaciones'];
    const buttons = ['Añadir comentario', 'Añadir puntuación'];
    const [key, setKey] = useState(1);

    const [añadirComentario, setañadirComentario] = useState(false);
    const [añadirPuntuacion, setañadirPuntuacion] = useState(false);

    const { TabPane } = Tabs;

    const callback = (item) => {
        setKey(item);
        setañadirComentario(false);
        setañadirPuntuacion(false);
    }

    const añadir = () => {
        if (key === 1) {
            setañadirComentario(true);
        } else {
            setañadirPuntuacion(true);
        }
    }

    const addComentario = (comentario) => {

    }

    const addPuntuacion = (puntuacion) => {

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
                                <Button type="primary" >Enviar</Button>
                                <hr></hr>
                            </Form> :
                            <></>
                        }
                        <div className="lista-comentarios">
                            <Comentario></Comentario>
                            <Comentario></Comentario>
                            <Comentario></Comentario>
                            <Comentario></Comentario>
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
                                        value={3}
                                        size={35}
                                        activeColor="#fcc42b"
                                    />
                                </div>
                                <Button type="primary" >Enviar</Button>
                                <hr></hr>
                            </Form> :
                            <></>
                        }
                        <div className="lista-comentarios">
                            <Puntuacion></Puntuacion>
                            <Puntuacion></Puntuacion>
                            <Puntuacion></Puntuacion>
                            <Puntuacion></Puntuacion>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </Modal>
    );
}

export default Comentarios;


