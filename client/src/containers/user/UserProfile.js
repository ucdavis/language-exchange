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
        this.props.checkUserDirectory(id);
        
    }

    render(){
        const server = "http://localhost:3000";
        let user = this.props.userState.current;
        let no_image = `${server}/api/storages/images/download/no_image.png`
        let userImage = () => <Img src={no_image} alt="avatar"/>;
        let avatar_file_name = user.avatar_file_name;
        let notFound = userImage;
        if (avatar_file_name) {
            console.log("file name not equal to null nor empty")
            var url = `${server}/api/storages/${user.id}/download/${user.avatar_file_name}`;
            userImage = () => <Img src={ url } className="img-thumbnail" unloader={ notFound() }/>
           }else{
            userImage = () => <Img src={ no_image } alt="avatar" unloader={ notFound() } />;
           }
        
        return (   
               
            <div>
                <h3>User Profile</h3>
                <hr />

                    <div className="row">
                        <div className="col-sm-4">                       
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
                        
                        <div className="col-sm-8">
                            <div className="card ">
                                <div className="card-header bg-dark text-white">
                                    <h5>{user.user_name}</h5></div>
                                <div className="card-body">

                                    <div > 
                                    <h5>Description</h5>
                                        { user.description }
                                    </div>
                                    <br />
                                    <div > 
                                        <ProvidedLanguageDetail state={this.props.userLanguageState}/>
                                    </div>
                                    <br />
                                    <div > 
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
        fetchUserDesiredLanguages:userLanguageActions.fetchUserDesiredLanguages,
        checkUserDirectory : userActions.checkUserDirectory
    }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(userProfile);