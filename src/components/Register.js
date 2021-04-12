import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './../css/login.css';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import Loading from './Loading'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { createUser, usuarioGet } from '../actions/usuarioAction';

const Register = ({ setRegistrarse, setModalVisible }) => {

    const [loading, setLoading] = useState(false);
    let usuarios = useSelector(state => state.usuarios);
    const dispatch = useDispatch();
    const alert = useAlert()

    const onFinish = async values => {
        setLoading(true);
        if (!usuarios || usuarios.length === 0) {
            usuarios = await dispatch(usuarioGet());
        }
        const response = await dispatch(createUser(values.username, values.password, values.mail, usuarios));
        if (response.status === 400) {
            alert.show(response.err)
        } else if (response.status === 404 || response.status === 500) {
            alert.show('ERROR DE CONEXIÓN CON EL SERVIDOR.')
        } else {
            setModalVisible(false);
        }
        setLoading(false);
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Introduce tu nombre de usuario',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nombre de usuario" />
            </Form.Item>

            <Form.Item
                name="mail"
                rules={[
                    {
                        required: true,
                        message: 'Introduce tu correo electrónico',
                    },
                ]}
            >
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Correo electrónico" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Contraseña"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Registrarse
        </Button>
                <div className="login-form-register-main">
                    O <h4 className="login-form-register" onClick={() => setRegistrarse(false)}>iniciar sesión!</h4>
                </div>
            </Form.Item>
            <Loading loading={loading}></Loading>
        </Form>
    );
};

export default Register;