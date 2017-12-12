import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AddLanguage from './AddLanguage';
import UpdateLanguage from '../containers/language/UpdateLanguage';
import Home from './Home';
import LanguageContainer from '../containers/language/LanguageContainer';
import LanguageDetails from '../containers/language/LanguageDetails';
import Users from './Users';



const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component = {Home} />
            <Route exact path='/languages' component = {LanguageContainer} />
            <Route exact path='/languages/:id' component = { LanguageDetails } />
            <Route exact path='/languages/add' component = { AddLanguage } />
            <Route exact path='/languages/edit/:id' component = { UpdateLanguage } />
            <Route exact path='/users' component = { Users } />          
        </Switch>    
    </main>    
)

export default Main;