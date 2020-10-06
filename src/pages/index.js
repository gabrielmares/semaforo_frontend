import React from 'react';
import { Switch, Route } from 'react-router-dom'


import HeaderComponent from '../components/Header'
import ContainerList from '../components/Table';


const Main = () => {
    return (
        <div>
            <div className="header">
                <HeaderComponent />
            </div>
            <div className="body">
                <Switch>
                    <Route exact path='/' component={ContainerList} />
                </Switch>
            </div>

        </div>
    );
}

export default Main;