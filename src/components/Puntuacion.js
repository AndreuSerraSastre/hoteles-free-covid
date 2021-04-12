import React from 'react';
import Avatar from 'antd/lib/avatar/avatar';
import './../css/comentarios.scss'
import ReactStars from "react-rating-stars-component";

const Puntuacion = ({ puntuacion }) => {

    const obtenerFecha = () => {
        var fecha = new Date(puntuacion.fecha);
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return fecha.toLocaleDateString("es-ES", options)
    }

    return (

        <div className="comentario-main">
            <div className="comentario-usuario">
                <Avatar className="comentario-avatar" style={{ verticalAlign: 'middle' }} size="large">
                    {puntuacion.nombre.charAt(0)}
                </Avatar>
                <div className="comentario-usuario-info">
                    <h2 className="comentario-usuario-info-nombre">{puntuacion.nombre}</h2>
                    <h5>Puntuó el: {obtenerFecha()}</h5>
                </div>
            </div>
            <h4>{puntuacion.comentario}</h4>
            <ReactStars
                count={5}
                value={puntuacion.puntuacion}
                edit={false}
                size={35}
                activeColor="#fcc42b"
            />
            <hr></hr>
        </div>

    );
}

export default Puntuacion;

