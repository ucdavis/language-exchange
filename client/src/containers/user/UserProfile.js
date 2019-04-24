import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions";
import * as userLanguageActions from "../../actions/userLanguageActions";
import ProvidedLanguageDetail from "../../components/userLanguage/ProvidedLanguageDetail";
import DesiredLanguageDetail from "../../components/userLanguage/DesiredLanguageDetail";
import Img from 'react-image';
import { Link, Redirect } from 'react-router-dom';
import UserAvatar from '../../components/user/UserAvatar';


class userProfile extends Component{

    componentDidMount(){
        this.props.fetchCurrentUser();
        if(this.props.userState.current){
            const id = this.props.userState.current.id;
            this.props.fetchUserProvidedLanguages(id);
            this.props.fetchUserDesiredLanguages(id);
        }
    }

    render(){
        const authUser = this.props.userState.current;
        if(!authUser){
            return <Redirect to='/' />
          }
        else{
            let user = authUser;
            let no_image = '/api/storages/images/download/no_image.png';
            let userImage = () => <Img src={no_image} alt="avatar"/>;
            let avatar_file_name = user.avatar_file_name;
            let notFound = userImage;
            if (avatar_file_name) {
                var url = `/api/storages/${user.id}/download/${user.avatar_file_name}`;
                userImage = () => <Img src={ url } className="img-thumbnail" unloader={ notFound() }/>
            }else{
                userImage = () => <Img src={ no_image } alt="avatar" unloader={ notFound() } />;
            }
            
            return (   
                
                <div>
                <div className="card mt-3">
                <div className="card-header bg-dark text-white">
                    My Profile
                </div>
                <div className="card-body">
                        <div className="row">
                            <div className="col-sm-4">               
                                <div className="card mt-3">               
                                    <ul className="list-group">
                                        <li className="list-group-item text-center" >
                                        <UserAvatar userImage = { userImage() } userState = { this.props.userState } userLanguageState = {this.props.userLanguageState}/>
                                        
                                        </li>
                                        <li className="list-group-item bg-secondary"> 
                                            <Link to="/users/avatar" className="btn btn-default btn-block" >Change Image</Link>
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
                                        <li className="list-group-item bg-secondary"> 
                                            <Link to="/users/edit" className="btn btn-default btn-block" >Edit Profile</Link>
                                        </li>
                                    </ul>
                                    
                                </div>
                            </div>
                            
                            <div className="col-sm-8">
                                <div className="card mt-3">
                                    <div className="card-header bg-secondary">
                                        <h5>{user.user_name}</h5>
                                    </div>
                                    <div className="card-body">

                                        <div> 
                                        <h5>Description</h5>
                                            { user.description }
                                        </div>
                                        <br/>
                                        <div> 
                                            <ProvidedLanguageDetail state={this.props.userLanguageState}/>
                                        </div>
                                        <br/>
                                        <div> 
                                            <DesiredLanguageDetail state={this.props.userLanguageState}/>
                                        </div>
                                        
                                    </div>
                                    <div className="card-footer  bg-secondary">
                                        <Link to="/users/languages" className="btn btn-default btn-block" >Edit Languages</Link>
                                    </div>
                                </div>
                            
                            </div>
                            </div>
                            

                        </div> 
                    
                    </div>    
                    </div>   
            )
        }
    }
}

function mapStateToProps(state){
    return{ userState: state.userState, userLanguageState: state.userLanguageState, }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetchCurrentUser: userActions.fetchCurrentUser,
        fetchUserProvidedLanguages:userLanguageActions.fetchUserProvidedLanguages,
        fetchUserDesiredLanguages:userLanguageActions.fetchUserDesiredLanguages,
    }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(userProfile);