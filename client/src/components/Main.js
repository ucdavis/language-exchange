import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateLanguage from '../containers/language/CreateLanguage';
import UpdateLanguage from '../containers/language/UpdateLanguage';
import Home from './Home';
import Guide from '../components/home/Guide';
import LanguageContainer from '../containers/language/LanguageContainer';
import LanguageDetails from '../containers/language/LanguageDetails';
import Users from '../containers/user/ReadUsers';
import UserProfile from '../containers/user/UserProfile';
import UserDetails from '../containers/user/UserDetails';
import CreateUser from '../containers/user/CreateUser';
import UpdateUser from '../containers/user/UpdateUser';
import MessageBoard from "../containers/message/MessageBoard";
import QuickMessage from "../containers/message/QuickMessage";
import UserLanguagesBoard from '../containers/userLanguages/UserLanguagesBoard';
import UploadAvatar from '../containers/user/UploadAvatar';
import Chart from '../containers/charts/Chart'


const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component = {Home} />
            <Route exact path='/guide' component = {Guide} />
            <Route exact path='/languages' component = {LanguageContainer} />
            <Route exact path='/languages/add' component = { CreateLanguage } />
            <Route exact path='/languages/edit/:id' component = { UpdateLanguage } />
            <Route exact path='/languages/:id' component = { LanguageDetails } /> 
            <Route exact path='/users' component = { Users } />
            <Route exact path='/users/register' component = { CreateUser } />
            <Route exact path='/users/languages' component = { UserLanguagesBoard } />
            <Route exact path='/users/messages' component ={ MessageBoard } />
            <Route exact path='/users/profile' component = { UserProfile } />
            <Route exact path='/users/edit' component = { UpdateUser } />
            <Route exact path='/users/avatar' component ={ UploadAvatar } />
            <Route exact path='/users/:id' component = { UserDetails } /> 
            
            <Route exact path='/users/contact/:id' component ={ QuickMessage } />
            <Route exact path='/admin/dashboard' component ={ Chart } />

        </Switch>    
    </main>    
)

export default Main;