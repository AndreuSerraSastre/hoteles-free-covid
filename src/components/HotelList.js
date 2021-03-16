import React from 'react';
import './../css/hotelList.scss'
import 'react-perfect-scrollbar/dist/css/styles.css';
import HotelListElement from './HotelListElement';
import { Select } from 'antd';

const HotelList = ({ Horizontal }) => {

  const { Option } = Select;

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (
    <div className={`PerfectScrollbar-MAIN${Horizontal}`}>
      <Select placeholder="Ordernar por: " className="PerfectScrollbar-select" onChange={handleChange} allowClear>
        <Option value="asc-stars">Mejor puntuación</Option>
        <Option value="desc-stars">Peor puntuación</Option>
        <Option value="namea-z">Alfabéticamente</Option>
        <Option value="coments">Más comentados</Option>
      </Select>
      <div className={`PerfectScrollbar${Horizontal}`}>
        <HotelListElement Horizontal={Horizontal}></HotelListElement>
        <HotelListElement Horizontal={Horizontal}></HotelListElement>
        <HotelListElement Horizontal={Horizontal}></HotelListElement>
        <HotelListElement Horizontal={Horizontal}></HotelListElement>
        <HotelListElement Horizontal={Horizontal}></HotelListElement>
        <HotelListElement Horizontal={Horizontal}></HotelListElement>
        <HotelListElement Horizontal={Horizontal}></HotelListElement>
        <HotelListElement Horizontal={Horizontal}></HotelListElement>
        <HotelListElement Horizontal={Horizontal}></HotelListElement>
      </div>
    </div>
  );
}

export default HotelList;