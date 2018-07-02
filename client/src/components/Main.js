import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateLanguage from '../containers/language/CreateLanguage';
import UpdateLanguage from '../containers/language/UpdateLanguage';
import Home from './Home';
import Login from './Login';
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
import Chart from '../containers/charts/Chart';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component = {Login} />
            <Route exact path='/users/home' component = {Home} />
            <Route exact path='/users/guide' component = {Guide} />
            <Route exact path='/users/register' component = { CreateUser } />
            <Route exact path='/users/languages' component = { UserLanguagesBoard } />
            <Route exact path='/users/messages' component ={ MessageBoard } />
            <Route exact path='/users/profile' component = { UserProfile } />
            <Route exact path='/users/edit' component = { UpdateUser } />
            <Route exact path='/users/avatar' component ={ UploadAvatar } />
            <Route exact path='/users/:id' component = { UserDetails } /> 
            <Route exact path='/users/contact/:id' component ={ QuickMessage } />
            <Route exact path='/admin/dashboard' component ={ Chart } />
            <Route exact path='/admin/languages' component = {LanguageContainer} />
            <Route exact path='/admin/languages/add' component = { CreateLanguage } />
            <Route exact path='/admin/languages/:id' component = { LanguageDetails } /> 
            <Route exact path='/admin/languages/edit/:id' component = { UpdateLanguage } />
            <Route exact path='/admin/users' component = { Users } />
        </Switch>    
    </main>    
)

export default Main;