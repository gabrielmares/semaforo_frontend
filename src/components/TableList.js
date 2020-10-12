import React from 'react';
import Individual from './SingleClient'
import axios from 'axios'
import { Dropdown, Button as SemanticButton, Input as InputSemantic, Grid } from 'semantic-ui-react'
import Loader from 'react-loader-spinner'
import { CambiarFecha } from '../Helpers'
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
        pending: false,
        listado: null,
        noRows: null
    })

    const [date, setDate] = React.useState({
        from: "",
        to: ""
    })
    const [loaderSpin, setLoaderSpin] = React.useState(false)
    const [filter, setFilter] = React.useState({
        sucursal: null,
        from: "",
        to: "",
        lastCredit: CambiarFecha(sumaFechas(new Date(), -15)).replaceAll('-', "")
    })

    const { sucursal } = filter;
    const { from, to } = date

    const { pending, listado, noRows } = clientes;

    React.useEffect(() => {
        if ((sucursal > 0) && pending) {
            const get = async () => {
                try {
                    console.log('llamando a la api')
                    const api = await axios.get(`${process.env.REACT_APP_SERVIDOR}/listas`, {
                        params: {
                            // filter
                            sucursal,
                            from: filter.from,
                            to: filter.to,
                            lastCredit: filter.lastCredit
                        },
                        timeout: 350000
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

    }, [pending, setClientes, sucursal, filter, setLoaderSpin])


    const change = (e, { value }) => {
        if (value === 0 || !value) return false
        setFilter({
            ...filter,
            sucursal: value
        })
    }

    function sumaFechas(fecha, dias) {
        fecha.setDate(fecha.getUTCDate() + dias)
        return fecha
    }

    const pickers = e => {
        // e.preventDefault();
        // console.log(sumaFechas(new Date(), 15))
        setDate({
            ...date,
            [e.target.name]: e.target.value
        })
        setFilter({
            ...filter,
            [e.target.name]: e.target.value.replaceAll('-', "")
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(filter)
        if (from === "" || to === "" || sucursal === 0) return false
        setLoaderSpin(true)
        setClientes({
            pending: true,
            listado: null,
            noRows: null
        })

    }

    return (

        <div className="centerItems">
            <div className="filtros">
                <Grid relaxed>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Dropdown
                                className='selectSucursal'
                                disabled={loaderSpin}
                                key={1}
                                placeholder="Seleccione sucursal"
                                options={sucursales}
                                selection
                                onChange={(e, value) => change(e, value)}
                            />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <InputSemantic
                                disabled={loaderSpin}
                                type='date'
                                key={0}
                                name='from'
                                value={from}
                                onChange={(e) => pickers(e)}
                            />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <InputSemantic
                                disabled={loaderSpin}
                                type='date'
                                key={2}
                                value={to}
                                name='to'
                                onChange={(e) => pickers(e)}
                            />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <SemanticButton
                                disabled={loaderSpin}
                                color='violet'
                                onClick={(e) => handleSubmit(e)}
                            >Buscar</SemanticButton>
                        </Grid.Column>
                        
                    </Grid.Row>
                </Grid>

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