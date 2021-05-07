import React, { useState } from 'react';
import './../css/hotelList.scss'
import 'react-perfect-scrollbar/dist/css/styles.css';
import HotelListElement from './HotelListElement';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { OPCION } from '../constants';
import Filter from './Filter';
import { useEffect } from 'react';
import { comentariosGet } from '../actions/comentarioAction';
import { puntuacionesGet } from '../actions/puntuacionesAction';
import Loading from './Loading';

const HotelList = ({ Horizontal, id }) => {

  const { Option } = Select;
  let hoteles = useSelector(state => state.hoteles);
  let comentarios = useSelector(state => state.comentarios);
  let puntuaciones = useSelector(state => state.puntuaciones);
  let opcion = useSelector(state => state.opcion);
  const [value, setValue] = useState(opcion);
  const [filter, setFilter] = useState([[], [], [], [], []]);
  let filtro = useSelector(state => state.filtro);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const changeValue = (value) => {
    setValue(value);
    dispatch({ type: OPCION, payload: { opcion: value } });
  }

  const filtrarDatos = (value, filter) => {
    let hotelesFilter = hoteles.filter(hotel => hotel.nom.toLowerCase().includes(filtro.toLowerCase()));

    if (filter[0].length !== 0) {
      hotelesFilter = hotelesFilter.filter(hotel => filter[0].includes(hotel.puntuacio));
    }
    if (filter[1].length !== 0) {
      hotelesFilter = hotelesFilter.filter(hotel => filter[1].includes(hotel.dadesPropies.Medidas.length));
    }
    if (filter[2].length !== 0) {
      hotelesFilter = hotelesFilter.filter(hotel => filter[2].includes(comentarios.find(x => x.identificador === hotel.identificador).comentarios.length));
    }
    if (filter[3].length !== 0) {
      hotelesFilter = hotelesFilter.filter(hotel => filter[3].includes(puntuaciones?.find(x => x.identificador === hotel.identificador).puntuaciones.length));
    }
    if (filter[4].length !== 0) {
      hotelesFilter = hotelesFilter.filter(hotel => filter[4].includes(hotel.dadesPropies.disponibilidad + " %"));
    }

    switch (value) {
      case "asc-stars":
        hotelesFilter = hotelesFilter.sort((a, b) => {
          if (a.puntuacio > b.puntuacio) {
            return -1;
          } else if (a.puntuacio < b.puntuacio) {
            return 1;
          } else {
            return 0;
          }
        })
        break;
      case "desc-stars":
        hotelesFilter = hotelesFilter.sort((a, b) => {
          if (a.puntuacio > b.puntuacio) {
            return 1;
          } else if (a.puntuacio < b.puntuacio) {
            return -1;
          } else {
            return 0;
          }
        })
        break;
      case "namea-z":
        hotelesFilter = hotelesFilter.sort((a, b) => {
          if (a.nom > b.nom) {
            return 1;
          } else if (a.nom < b.nom) {
            return -1;
          } else {
            return 0;
          }
        })
        break;
      case "asc-comentados":
        hotelesFilter = hotelesFilter.sort((a, b) => {
          const comentariosA = comentarios?.find(x => x.identificador === a.identificador)
          const comentariosB = comentarios?.find(x => x.identificador === b.identificador)
          if (comentariosA.comentarios.length > comentariosB.comentarios.length) {
            return -1;
          } else if (comentariosA.comentarios.length < comentariosB.comentarios.length) {
            return 1;
          } else {
            return 0;
          }
        })
        break;
      case "desc-comentados":
        hotelesFilter = hotelesFilter.sort((a, b) => {
          const comentariosA = comentarios?.find(x => x.identificador === a.identificador)
          const comentariosB = comentarios?.find(x => x.identificador === b.identificador)
          if (comentariosA.comentarios.length > comentariosB.comentarios.length) {
            return 1;
          } else if (comentariosA.comentarios.length < comentariosB.comentarios.length) {
            return -1;
          } else {
            return 0;
          }
        })
        break;
      case "asc-puntuaciones":
        hotelesFilter = hotelesFilter.sort((a, b) => {
          const puntuacionesA = puntuaciones?.find(x => x.identificador === a.identificador)
          const puntuacionesB = puntuaciones?.find(x => x.identificador === b.identificador)
          if (puntuacionesA.puntuaciones.length > puntuacionesB.puntuaciones.length) {
            return -1;
          } else if (puntuacionesA.puntuaciones.length < puntuacionesB.puntuaciones.length) {
            return 1;
          } else {
            return 0;
          }
        })
        break;
      case "desc-puntuaciones":
        hotelesFilter = hotelesFilter.sort((a, b) => {
          const puntuacionesA = puntuaciones?.find(x => x.identificador === a.identificador)
          const puntuacionesB = puntuaciones?.find(x => x.identificador === b.identificador)
          if (puntuacionesA.puntuaciones.length > puntuacionesB.puntuaciones.length) {
            return 1;
          } else if (puntuacionesA.puntuaciones.length < puntuacionesB.puntuaciones.length) {
            return -1;
          } else {
            return 0;
          }
        })
        break;
      case "asc-disponibilidad":
        hotelesFilter = hotelesFilter.sort((a, b) => {
          if (a.dadesPropies.disponibilidad > b.dadesPropies.disponibilidad) {
            return 1;
          } else if (a.dadesPropies.disponibilidad < b.dadesPropies.disponibilidad) {
            return -1;
          } else {
            return 0;
          }
        })
        break;
      case "desc-disponibilidad":
        hotelesFilter = hotelesFilter.sort((a, b) => {
          if (a.dadesPropies.disponibilidad > b.dadesPropies.disponibilidad) {
            return -1;
          } else if (a.dadesPropies.disponibilidad < b.dadesPropies.disponibilidad) {
            return 1;
          } else {
            return 0;
          }
        })
        break;
      case "asc-medidas":
        hotelesFilter = hotelesFilter.sort((a, b) => {
          if (a.dadesPropies.Medidas.length > b.dadesPropies.Medidas.length) {
            return -1;
          } else if (a.dadesPropies.Medidas.length < b.dadesPropies.Medidas.length) {
            return 1;
          } else {
            return 0;
          }
        })
        break;
      case "desc-medidas":
        hotelesFilter = hotelesFilter.sort((a, b) => {
          if (a.dadesPropies.Medidas.length > b.dadesPropies.Medidas.length) {
            return 1;
          } else if (a.dadesPropies.Medidas.length < b.dadesPropies.Medidas.length) {
            return -1;
          } else {
            return 0;
          }
        })
        break;

      default:
        break;
    }
    return hotelesFilter;
  }

  const comentariosGetPage = async () => {
    setLoading(true);
    const response = await dispatch(comentariosGet());
    if (response.status === 400) {
      alert.show(response.err)
    } else if (response.status === 404 || response.status === 500) {
      alert.show('ERROR DE CONEXIÓN CON EL SERVIDOR.')
    }
    setLoading(false);
  }

  const puntuacionesGetPage = async () => {
    setLoading(true);
    const response = await dispatch(puntuacionesGet());
    if (response.status === 400) {
      alert.show(response.err)
    } else if (response.status === 404 || response.status === 500) {
      alert.show('ERROR DE CONEXIÓN CON EL SERVIDOR.')
    }
    setLoading(false);
  }

  useEffect(() => {
    if (!comentarios || comentarios.length === 0) {
      comentariosGetPage();
    }
    if (!puntuaciones || puntuaciones.length === 0) {
      puntuacionesGetPage();
    }
  })

  const CargarHoteles = (value, filter) => {
    if (hoteles != null) {
      let hotelesFilter = filtrarDatos(value, filter);
      return hotelesFilter.map((hotel, key) => <HotelListElement key={key} Horizontal={Horizontal} id={id} hotel={hotel}></HotelListElement>)
    }
    return (<h2>No hay hoteles</h2>);
  }

  return (
    <div className={`PerfectScrollbar-MAIN${Horizontal}`}>
      <div className="filterList">
        <Select placeholder="Ordernar por: " className="PerfectScrollbar-select" onChange={changeValue} defaultValue={value}>
          <Option value="asc-stars">Mejor puntuación</Option>
          <Option value="desc-stars">Peor puntuación</Option>
          <Option value="namea-z">Alfabéticamente</Option>
          <Option value="asc-comentados">Más comentados</Option>
          <Option value="desc-comentados">Menos comentados</Option>
          <Option value="asc-puntuaciones">Más puntuaciones</Option>
          <Option value="desc-puntuaciones">Menos puntuaciones</Option>
          <Option value="asc-disponibilidad">Mayor disponibilidad</Option>
          <Option value="desc-disponibilidad">Menor disponibilidad</Option>
          <Option value="asc-medidas">Más medidas</Option>
          <Option value="desc-medidas">Menos medidas</Option>
        </Select>
        {hoteles !== 0 && comentarios.length !== 0 && puntuaciones !== 0 ?
          <Filter hoteles={hoteles} comentarios={comentarios} puntuaciones={puntuaciones} setFilter={setFilter}></Filter> :
          <></>
        }
      </div>
      <Loading loading={loading}></Loading>
      <div className={`PerfectScrollbar${Horizontal}`}>
        {CargarHoteles(value, filter)}
      </div>
    </div>
  );
}

export default HotelList;