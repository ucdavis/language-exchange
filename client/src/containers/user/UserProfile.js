import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions";
import * as userLanguageActions from "../../actions/userLanguageActions";
import ProvidedLanguageDetail from "../../components/userLanguage/ProvidedLanguageDetail";
import DesiredLanguageDetail from "../../components/userLanguage/DesiredLanguageDetail";
import Img from 'react-image';
import { Link } from 'react-router-dom';
import UserAvatar from '../../components/user/UserAvatar';


class userProfile extends Component{

    componentDidMount(){
        this.props.fetchCurrentUser();
        const id = this.props.userState.current.id;
        this.props.fetchUserProvidedLanguages(id);
        this.props.fetchUserDesiredLanguages(id);
        
    }

    
    render(){
        // const server = "http://localhost:3000";
        let user = this.props.userState.current;
        let userImage = () => <Img src="/api/storages/images/download/no_image.png" alt="avatar"/>;
        let notFound = userImage;
        if (user.avatar_file_name !== null || user.avatar_file_name !== "" ) {
            var url = `/api/storages/images/download/${user.avatar_file_name}`;
            userImage = () => <Img src={ url } className="img-thumbnail" unloader={ notFound() }/>
           }else{
            url = "/api/storages/images/download/no_image.png";
            userImage = () => <Img src={ url } alt="avatar" unloader={ notFound() } />;
           }
        
        return (   
               
            <div>
                <h2><span className="glyphicon glyphicon glyphicon-user" aria-hidden="true"></span>&nbsp;User Profile</h2>
                <hr />

                    <div className="row">
                        <div className="col-sm-4">                       
                            <ul className="list-group">
                                <li className="list-group-item text-center" >
                                  <UserAvatar userImage = { userImage() } userState = { this.props.userState } userLanguageState = {this.props.userLanguageState}/>
                                   
                                </li>
                                <Link to="/users/avatar" className="btn btn-default btn-block" >Change Image</Link>
                                <li className="list-group-item">  
                                    <label>Description:</label> 
                                    <p>{user.description}</p> 
                                </li>
                                <li className="list-group-item">  
                                    <label>Gender :&nbsp;</label>
                                    {user.gender}
                                </li>     
                                <li className="list-group-item">  
                                    <label>Field of Study:</label>
                                    <p> {user.field_of_study} </p>
                                </li>                                  
                                <li className="list-group-item">  
                                    <label>University Affiliation:</label>
                                    <p>{user.affiliation} </p>
                                </li>
                                <Link to="/users/edit" className="btn btn-default btn-block" >Edit Profile</Link>
                            </ul>
                            
                        </div>
                        
                        <div className="col-sm-8">
                            <div className="card">
                            <div className="card-header">
                                <h4>{user.user_name}</h4></div>
                            <div className="card=block">
                                <div className="well well-small"> 
                                    <ProvidedLanguageDetail state={this.props.userLanguageState}/>
                                </div>
                                <div className="well well-small"> 
                                    <DesiredLanguageDetail state={this.props.userLanguageState}/>
                                </div>
                                <Link to="/users/languages" className="btn btn-default btn-block" >Edit Languages</Link>
                            </div>
                            </div>
                           
                        </div>
                        

                    </div> 
                
                </div>    
        )
    }
}

function mapStateToProps(state){
    return{ userState: state.userState, userLanguageState: state.userLanguageState, }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetchCurrentUser: userActions.fetchCurrentUser,
        fetchUserProvidedLanguages:userLanguageActions.fetchUserProvidedLanguages,
        fetchUserDesiredLanguages:userLanguageActions.fetchUserDesiredLanguages
    }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(userProfile);