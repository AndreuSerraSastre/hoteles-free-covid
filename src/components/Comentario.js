import React from 'react';
import Avatar from 'antd/lib/avatar/avatar';
import './../css/comentarios.scss'

const Comentario = ({ comentario }) => {

    const obtenerFecha = () => {
        var fecha = new Date(comentario.fecha);
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return fecha.toLocaleDateString("es-ES", options)
    }

    return (

        <div className="comentario-main">
            <div className="comentario-usuario">
                <Avatar className="comentario-avatar" style={{ verticalAlign: 'middle' }} size="large">
                    {comentario.nombre.charAt(0)}
                </Avatar>
                <div className="comentario-usuario-info">
                    <h2 className="comentario-usuario-info-nombre">{comentario.nombre}</h2>
                    <h5>Comentó el: {obtenerFecha()}</h5>
                </div>
            </div>
            <h4>{comentario.comentario}</h4>
            <hr></hr>
        </div>

    );
}

export default Comentario;


