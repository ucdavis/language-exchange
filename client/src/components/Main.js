import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateLanguage from '../containers/language/CreateLanguage';
import UpdateLanguage from '../containers/language/UpdateLanguage';
import Home from './Home';
import LanguageContainer from '../containers/language/LanguageContainer';
import LanguageDetails from '../containers/language/LanguageDetails';
import Users from './user/Users';
import CreateUser from "../containers/user/CreateUser";


const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component = {Home} />
            <Route exact path='/languages' component = {LanguageContainer} />
            <Route exact path='/languages/add' component = { CreateLanguage } />
            <Route exact path='/languages/edit/:id' component = { UpdateLanguage } />
            <Route exact path='/languages/:id' component = { LanguageDetails } /> 
            <Route exact path='/users' component = { Users } />
            <Route exact path='/users/add' component = { CreateUser } />            
        </Switch>    
    </main>    
)

export default Main;