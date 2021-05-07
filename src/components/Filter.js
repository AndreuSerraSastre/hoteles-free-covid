import { Button } from "antd";
import MUIDataTable from "mui-datatables";
import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FILTERLIST } from './../constants'

const Filter = ({ hoteles, comentarios, puntuaciones, setFilter }) => {

    const dispatch = useDispatch();
    const filterList = useSelector(state => state.filterList);

    const columns = [
        {
            name: "Estrellas",
            options: {
                filter: true,
                filterList: filterList[0],
                customFilterListOptions: { render: v => `Estrellas: ${v}` }
            }
        },
        {
            name: "Número de medidas",
            options: {
                filter: true,
                filterList: filterList[1],
                customFilterListOptions: { render: v => `Medidas: ${v}` }
            }
        }, {
            name: "Número de comentarios",
            options: {
                filter: true,
                filterList: filterList[2],
                customFilterListOptions: { render: v => `Comentarios: ${v}` }
            }
        }, {
            name: "Número de puntuaciones",
            options: {
                filter: true,
                filterList: filterList[3],
                customFilterListOptions: { render: v => `Puntuaciones: ${v}` }
            }
        }, {
            name: "Disponibilidad",
            options: {
                filter: true,
                filterList: filterList[4],
                customFilterListOptions: { render: v => `Disponibilidad: ${v}` }
            }
        }];

    const data = () => {
        let dat = [];

        hoteles.forEach(hotel => {
            const puntuacionesHotel = puntuaciones?.find(x => x.identificador === hotel.identificador)
            const comentariosHotel = comentarios?.find(x => x.identificador === hotel.identificador)
            dat.push([hotel.puntuacio, hotel.dadesPropies.Medidas.length, comentariosHotel?.comentarios.length, puntuacionesHotel?.puntuaciones.length, hotel.dadesPropies.disponibilidad + " %"]);
        });

        return dat;
    }

    useEffect(() => {
        setFilter(filterList)
    },)

    const handleFilterSubmit = applyFilters => {
        let filterList = applyFilters();
        setFilter(filterList)
        dispatch({ type: FILTERLIST, payload: { filterList: filterList } });
    };

    const options = {
        filterType: 'checkbox',
        search: false,
        download: false,
        print: false,
        viewColumns: false,
        confirmFilters: true,

        // Calling the applyNewFilters parameter applies the selected filters to the table 
        customFilterDialogFooter: (currentFilterList, applyNewFilters) => {
            return (
                <div style={{ marginTop: '40px' }}>
                    <Button variant="contained" onClick={() => handleFilterSubmit(applyNewFilters)}>Aplicar filtros</Button>
                </div>
            );
        },
        onFilterChange: (column, filterList, type) => {
            if (type === 'chip') {
                var newFilters = () => (filterList);
                handleFilterSubmit(newFilters);
            }
        },
        textLabels: {
            filter: {
                all: "Todo",
                title: "FILTROS",
                reset: "RESTABLECER",
            },
            toolbar: {
                filterTable: "Filtrar tabla",
            },
        },
    };
    return (
        <MUIDataTable
            title={"Filtros"}
            data={data()}
            columns={columns}
            options={options}
        />
    );
}

export default Filter;
