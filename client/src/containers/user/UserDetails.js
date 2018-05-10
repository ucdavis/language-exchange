import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions";
import * as userLanguageActions from "../../actions/userLanguageActions";
import ProvidedLanguageDetail from "../../components/userLanguage/ProvidedLanguageDetail";
import DesiredLanguageDetail from "../../components/userLanguage/DesiredLanguageDetail";
import Img from 'react-image';
import UserAvatar from '../../components/user/UserAvatar';
import { Link } from 'react-router-dom';


class userDetails extends Component{

    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.fetchUser(id);
        this.props.fetchUserProvidedLanguages(id);
        this.props.fetchUserDesiredLanguages(id);
    }

    
    render(){
        
        let user = this.props.userState.active;
        let no_image = `http://localhost:3000/api/storages/images/download/no_image.png`
        let userImage = () => <Img src={no_image} alt="avatar"/>;
        let avatar_file_name = user.avatar_file_name;
        let notFound = userImage;
        if (avatar_file_name) {
            console.log("file name not equal to null nor empty")
            var url = `http://localhost:3000/api/storages/${user.id}/download/${user.avatar_file_name}`;
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

                            </ul>
                            
                        </div>
                        
                        <div className="col-sm-8">
                            <div className="card">
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
                            <div className="card-footer text-center">
                                <Link to={ `/users/contact/${user.id}`} className="btn btn-success" >Contact</Link>

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
        fetchUser: userActions.fetchUser,
        fetchUserProvidedLanguages:userLanguageActions.fetchUserProvidedLanguages,
        fetchUserDesiredLanguages:userLanguageActions.fetchUserDesiredLanguages
    }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(userDetails);