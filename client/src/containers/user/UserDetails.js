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
        let no_image = `/api/storages/images/download/no_image.png`
        let userImage = () => <Img src={no_image} alt="avatar"/>;
        let avatar_file_name = user.avatar_file_name;
        let notFound = userImage;
        if (avatar_file_name) {
            console.log("file name not equal to null nor empty")
            var url = `/api/storages/${user.id}/download/${user.avatar_file_name}`;
            userImage = () => <Img src={ url } className="img-thumbnail" unloader={ notFound() }/>
           }else{
            userImage = () => <Img src={ no_image } alt="avatar" unloader={ notFound() } />;
           }
        
        return (   
               
            <div>
                <div className="row mt-3">

                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-header bg-dark text-white">
                                {user.user_name}
                            </div>
                            <div className="card-body">                      
                                <ul className="list-group">
                                    <li className="list-group-item text-center" >
                                        <UserAvatar userImage = { userImage() } userState = { this.props.userState } userLanguageState = {this.props.userLanguageState}/>
                                    </li>
                                    <li className="list-group-item">  
                                        <strong>Gender :&nbsp;</strong>
                                        <p>{user.gender}</p>
                                    </li>     
                                    <li className="list-group-item">  
                                        <strong>Field of Study:</strong>
                                        <p> {user.field_of_study} </p>
                                    </li>                                  
                                    <li className="list-group-item">  
                                        <strong>University Affiliation:</strong>
                                        <p>{user.affiliation} </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-sm-8">
                        <div className="card">
                            <div className="card-header bg-dark text-white">
                            Description
                            </div>
                            <div className="card-body">
                                <div > 
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