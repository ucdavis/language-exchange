import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AddLanguage from './AddLanguage';
import EditLanguage from './EditLanguage';
import Home from './Home';
import languageContainer from '../containers/LanguageContainer';
import LanguageDetails from './LanguageDetails';
import Users from './Users';



const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component = {Home} />
            <Route exact path='/languages' component = {languageContainer} />
            <Route exact path='/languages/:id' component = { LanguageDetails } />
            <Route exact path='/languages/add' component = { AddLanguage } />
            <Route exact path='/languages/edit/:id' component = { EditLanguage } />
            <Route exact path='/users' component = { Users } />
           
            
        </Switch>    
    </main>    
)

export default Main;