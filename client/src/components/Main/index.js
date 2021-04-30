import React from 'react';
import { Switch, Route } from 'react-router-dom';
import OverviewPage from '../OverviewPage';
import PredictionPage from '../PredictionPage';

const Main = () => {
    return (
        <Switch>
            <Route exact path="/" component={OverviewPage} />
            <Route exact path="/predict" component={PredictionPage} />
        </Switch>
    );
}

export default Main;
