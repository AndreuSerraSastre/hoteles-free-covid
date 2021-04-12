import { AUTHORIZATION, USUARIOS } from '../constants';
import usuarios from './../json/usuario.json'

export const usuarioGet = () => {
    return async dispatch => {
        if (usuarios) {
            dispatch({ type: USUARIOS, payload: { usuarios } });
            return usuarios;
        }
    }
}

export const autentificate = (username, password, usuarios) => {
    return async dispatch => {
        if (usuarios) {
            const usuario = usuarios.find(usuario => usuario.username === username)
            if (!usuario) {
                return {
                    status: 400,
                    err: "ERROR: CONTRASEÑA O USUARIO INCORRECTOS"
                }
            } else {
                if (usuario.contraseña === password) {
                    dispatch({ type: AUTHORIZATION, payload: { auth: true, usuario: usuario } });
                } else {
                    return {
                        status: 400,
                        err: "ERROR: CONTRASEÑA O USUARIO INCORRECTOS"
                    }
                }
            }
            dispatch({ type: USUARIOS, payload: { usuarios } });
            return usuarios;
        } else {
            return {
                status: 400,
                err: "ERROR AL ENCONTRAR LOS USUARIOS"
            }
        }
    }
}

export const createUser = (username, password, mail, usuarios) => {
    return async dispatch => {
        if (usuarios) {
            let usuario = usuarios.find(usuario => usuario.username === username)
            if (usuario) {
                return {
                    status: 400,
                    err: "ERROR: ESTE USERNAME YA EXISTE"
                }
            }

            usuario = usuarios.find(usuario => usuario.correo === mail)
            if (usuario) {
                return {
                    status: 400,
                    err: "ERROR: ESTE CORREO YA EXISTE"
                }
            }
            const lastuser = usuarios.sort((a, b) => b.id - a.id)[0];
            usuario = {
                "id": lastuser.id,
                "nombre": username,
                "username": username,
                "correo": mail,
                "contraseña": password,
            }
            usuarios.push(usuario)
            dispatch({ type: USUARIOS, payload: { usuarios } });
            dispatch({ type: AUTHORIZATION, payload: { auth: true, usuario: usuario } });
            return usuarios;
        } else {
            return {
                status: 400,
                err: "ERROR AL ENCONTRAR LOS USUARIOS"
            }
        }
    }
}