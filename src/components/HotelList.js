import React, { useState } from 'react';
import './../css/hotelList.scss'
import 'react-perfect-scrollbar/dist/css/styles.css';
import HotelListElement from './HotelListElement';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { OPCION } from '../constants';

const HotelList = ({ Horizontal, id }) => {

  const { Option } = Select;
  let hoteles = useSelector(state => state.hoteles);
  let opcion = useSelector(state => state.opcion);
  const [value, setValue] = useState(opcion);
  const [refrescar, setRefrescar] = useState(false);
  let filtro = useSelector(state => state.filtro);

  const dispatch = useDispatch();

  const changeValue = (value) => {
    setValue(value);
    setRefrescar(!refrescar);
    dispatch({ type: OPCION, payload: { opcion: value } });
  }

  const filtrarDatos = (value) => {
    let hotelesFilter = hoteles.filter(hotel => hotel.nom.toLowerCase().includes(filtro.toLowerCase()));

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
      default:
        break;
    }
    return hotelesFilter;
  }

  const CargarHoteles = (value) => {
    if (hoteles != null) {
      let hotelesFilter = filtrarDatos(value);
      return hotelesFilter.map((hotel, key) => <HotelListElement key={key} Horizontal={Horizontal} id={id} hotel={hotel} refrescar={refrescar}></HotelListElement>)
    }
    return (<h2>No hay hoteles</h2>);
  }

  return (
    <div className={`PerfectScrollbar-MAIN${Horizontal}`}>
      <Select placeholder="Ordernar por: " className="PerfectScrollbar-select" onChange={changeValue} defaultValue={value}>
        <Option value="asc-stars">Mejor puntuación</Option>
        <Option value="desc-stars">Peor puntuación</Option>
        <Option value="namea-z">Alfabéticamente</Option>
        <Option value="coments">Más comentados</Option>
      </Select>
      <div className={`PerfectScrollbar${Horizontal}`}>
        {CargarHoteles(value)}
      </div>
    </div>
  );
}

export default HotelList;