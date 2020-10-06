import React from 'react';
import { Header } from 'semantic-ui-react'

const HeaderComponent = () => {
    return (
        <Header as='h1' textAlign='center' dividing size='huge'>
            Lista de Creditos Por vencer
            <Header.Subheader>
                Imprime solicitudes de credito Pre-llenadas
            </Header.Subheader>
        </Header>
    );
}

export default HeaderComponent;