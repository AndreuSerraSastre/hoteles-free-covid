import React, {useState} from 'react';
import 'antd/dist/antd.css';
import './../css/login.css';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import Loading from './Loading'

const Register = ({ setRegistrarse }) => {

    const [loading, setLoading] = useState(false);

    const onFinish = values => {
        setLoading(true);
        console.log('Received values of form: ', values);
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