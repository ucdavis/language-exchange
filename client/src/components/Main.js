import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Languages from './Languages';
import Users from './Users';
import LanguageDetails from './LanguageDetails';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/languages' component = {Languages} />
            <Route exact path='/users' component = { Users } />
            <Route exact path='/languages/:id' component = { LanguageDetails } />
        </Switch>    
    </main>    
)

export default Main;