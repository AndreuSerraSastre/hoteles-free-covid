import React from 'react';
import Avatar from 'antd/lib/avatar/avatar';
import './../css/comentarios.scss'
import ReactStars from "react-rating-stars-component";

const Puntuacion = () => {

    return (

        <div className="comentario-main">
            <div className="comentario-usuario">
                <Avatar className="comentario-avatar" style={{ verticalAlign: 'middle' }} size="large">
                    {'J'}
                </Avatar>
                <div className="comentario-usuario-info">
                    <h2 className="comentario-usuario-info-nombre">Juan pablo</h2>
                    <h5>Puntuó en: 31 de julio de 2019</h5>
                </div>
            </div>
            <h4>El apartamento es espacioso, cómodo y con mobiliario de diseño. Cerca de Monti, y las anfitrionas son amabilísimas. Espero volver pronto.</h4>
            <ReactStars
                count={5}
                value={3}
                edit={false}
                size={35}
                activeColor="#fcc42b"
            />
            <hr></hr>
        </div>

    );
}

export default Puntuacion;

