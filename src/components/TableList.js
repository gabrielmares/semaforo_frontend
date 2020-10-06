import React from 'react';
import Individual from './SingleClient'
import axios from 'axios'
import { Dropdown } from 'semantic-ui-react'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const TableList = () => {

    let sucursales = [
        {
            key: 0,
            value: 0,
            text: null
        },
        {
            key: 1,
            value: 1,
            text: 'Obregon'
        },
        {
            key: 2,
            value: 2,
            text: 'Huatabampo'
        },
        {
            key: 3,
            value: 3,
            text: 'Navojoa'
        }
    ]

    const [clientes, setClientes] = React.useState({
        pending: true,
        listado: null,
        noRows: null
    })

    const [sucursal, setSucursal] = React.useState(null)
    const [loaderSpin, setLoaderSpin] = React.useState(false)


    const { pending, listado, noRows } = clientes;

    React.useEffect(() => {
        if ((sucursal > 0) && pending) {
            const get = async () => {
                try {
                    const api = await axios.get(`${process.env.REACT_APP_SERVIDOR}/listas`, {
                        params: {
                            sucursal
                        }
                    });
                    setClientes({
                        pending: false,
                        listado: api.data
                    })
                    setLoaderSpin(false);
                } catch (error) {
                    setClientes({
                        pending: false,
                        listado: null,
                        noRows: true
                    })
                    setLoaderSpin(false);
                }
            }
            get();
        }

    }, [pending, setClientes, sucursal, setLoaderSpin])


    const change = (e, { value }) => {
        if (value === 0) return false
        setLoaderSpin(true);

        if (!value) return false
        setSucursal(value);
        setClientes({
            pending: true,
            listado: null
        })
    }


    return (

        <div className="centerItems">
            
            <div className="solicitudIndividual">
                <Dropdown
                    disabled={loaderSpin}
                    key={1}
                    placeholder="Seleccione sucursal"
                    options={sucursales}
                    selection
                    onChange={(e, value) => change(e, value)}
                />
            </div>
            {loaderSpin && (
                <div className="block">

                    <Loader
                        type="Circles"
                        color="#00BFFF"
                        height={230}
                        width={260}
                    />
                    <h3 style={{ paddingLeft: '25px' }}><b>Recuperando informacion...</b></h3>
                </div>
            )}
            {noRows && (<h3>No se encontraron solicitudes</h3>)}
            {(!listado) ? (null) : (<Individual renovacion={listado} key={listado.length} />)}

        </div>

    );
}

export default TableList;

/*

 {loaderSpin && (

                    <Loader
                        className="block"
                        type="Puff"
                        color="#00BFFF"
                        height={200}
                        width={200}
                    />
                    // <div className="spinner">
                    //     <Segment >
                    //         <Dimmer active inverted>
                    //             <Loader content='Leyendo informacion, espere por favor' size="massive" />
                    //         </Dimmer>

                    //     </Segment>
                    // </div>
                )}

                */