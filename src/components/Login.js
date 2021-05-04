import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './../css/login.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { autentificate, usuarioGet } from '../actions/usuarioAction';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import Loading from './Loading';
import { useEffect } from 'react';
import { getCookie, setCookie } from '../utils';

const Login = ({ setRegistrarse, setModalVisible }) => {

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  let usuarios = useSelector(state => state.usuarios);
  const dispatch = useDispatch();
  const alert = useAlert()

  const onFinish = async values => {
    setLoading(true);
    if (!usuarios || usuarios.length === 0) {
      usuarios = await dispatch(usuarioGet());
    }
    const response = await dispatch(autentificate(values.username, values.password, usuarios));
    if (response.status === 400) {
      alert.show(response.err)
    } else if (response.status === 404 || response.status === 500) {
      alert.show('ERROR DE CONEXIÓN CON EL SERVIDOR.')
    } else {
      setModalVisible(false);
      setCookie("username", values.username)
      setCookie("password", values.password)
    }
    setLoading(false);
  };

  useEffect(() => {
    setUsername(getCookie("username"))
    setPassword(getCookie("password"))
  }, [])

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        password,
        username,
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
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Recuérdame</Checkbox>
        </Form.Item>

        <h4 className="login-form-forgot">Recuperar contraseña</h4>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Iniciar sesión
        </Button>
        <div className="login-form-register-main">
          O <h4 className="login-form-register" onClick={() => setRegistrarse(true)}>registrate ahora!</h4>
        </div>
      </Form.Item>
      <Loading loading={loading}></Loading>
    </Form>
  );
};

export default Login;