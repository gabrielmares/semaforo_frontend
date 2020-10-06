import React from 'react';
import TableList from './TableList'
// import axios from 'axios';
import { Grid } from 'semantic-ui-react'
const ContainerList = () => {

    return (
        <Grid columns="3">
            <Grid.Row>
                <Grid.Column width={3}>

                </Grid.Column>
                <Grid.Column width={10}>
                    <div className="cardcenter">
                        <TableList />
                    </div>
                </Grid.Column>
                <Grid.Column width={3}>

                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default ContainerList;