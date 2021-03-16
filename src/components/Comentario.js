import React from 'react';
import Avatar from 'antd/lib/avatar/avatar';
import './../css/comentarios.scss'

const Comentario = () => {

    return (

        <div className="comentario-main">
            <div className="comentario-usuario">
                <Avatar className="comentario-avatar" style={{ verticalAlign: 'middle' }} size="large">
                    {'J'}
                </Avatar>
                <div className="comentario-usuario-info">
                    <h2 className="comentario-usuario-info-nombre">Juan pablo</h2>
                    <h5>Comentó en: 31 de julio de 2019</h5>
                </div>
            </div>
            <h4>La primera vez que fuí nos lo pasamos muy bien. Los niños se divierten mucho.</h4>
            <hr></hr>
        </div>

    );
}

export default Comentario;


