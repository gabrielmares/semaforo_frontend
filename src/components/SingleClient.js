import React from 'react';
import { Table, Icon } from 'semantic-ui-react'
import { Inputdate } from '../Helpers'
import axios from 'axios'
import generateDoc from '../components/GeneratorDocs'

const Individual = ({ renovacion }) => {
    if (!renovacion) return false

    const handlePrint = async CODIGO => {
        // console.log(CODIGO)
        const nuevaSolicitud = await axios.get('http://localhost:81/renovacion', {
            params: {
                CODIGO
            },
            timeout: '50000'
            
        })
        console.log(nuevaSolicitud)
        // generateDoc(nuevaSolicitud.data);
    }


    return (
        <div className="solicitudIndividual" >
            <Table celled striped structured>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={5}>Nombre</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Centro</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Grupo</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Contrato y saldo actual</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Porcentaje Pagado</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Ultimo Abono</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Generar solicitud</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body >
                    {renovacion.map((sol, index) => {
                        const { CLIENTE, CODIGO, SALDO, CONTRATO, CENTRO, GRUPO, PORCPAGADO, ULTIMO } = sol;
                        const newDate = Inputdate(ULTIMO);
                        return (

                            <Table.Row key={index}>
                                <Table.Cell width={5}>{CLIENTE}</Table.Cell>
                                <Table.Cell width={2}>{CENTRO}</Table.Cell>
                                <Table.Cell width={2}>{GRUPO}</Table.Cell>
                                <Table.Cell width={4}><b>{CONTRATO}, $ {SALDO.toFixed(2)}</b></Table.Cell>
                                <Table.Cell width={2}>{PORCPAGADO.toFixed(2)}%</Table.Cell>
                                <Table.Cell width={2}>{newDate}</Table.Cell>
                                <Table.Cell width={3}><label onClick={() => handlePrint(CODIGO)}><Icon color="blue" name="file word" size="large" /></label></Table.Cell>
                            </Table.Row>

                        )

                    })}
                </Table.Body>
            </Table>
        </div >
    );
}

export default Individual;

/*
 <Table.Body>
                    <Table.Row>
                    <Table.Cell>{CLIENTE}</Table.Cell>
                        <Table.Cell>{CENTRO}</Table.Cell>
                        <Table.Cell>{GRUPO}</Table.Cell>
                        <Table.Cell>{CONTRATO}</Table.Cell>
                        <Table.Cell>{CREDITO}</Table.Cell>
                        <Table.Cell></Table.Cell>
                    </Table.Row>
                </Table.Body>


<Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Nombre</Table.HeaderCell>
                        <Table.HeaderCell>Centro</Table.HeaderCell>
                        <Table.HeaderCell>Grupo</Table.HeaderCell>
                        <Table.HeaderCell>Contrato actual</Table.HeaderCell>
                        <Table.HeaderCell>Saldo</Table.HeaderCell>
                        <Table.HeaderCell>Generar solicitud</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.row>
                        <Table.Cell>{CLIENTE}</Table.Cell>
                        <Table.Cell>{CENTRO}</Table.Cell>
                        <Table.Cell>{GRUPO}</Table.Cell>
                        <Table.Cell>{CONTRATO}</Table.Cell>
                        <Table.Cell>{CREDITO}</Table.Cell>
                        <Table.Cell></Table.Cell>
                    </Table.row>
                </Table.Body>
            </Table>

            */