import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions";
import * as userLanguageActions from "../../actions/userLanguageActions";
import ProvidedLanguageDetail from "../../components/userLanguage/ProvidedLanguageDetail";
import DesiredLanguageDetail from "../../components/userLanguage/DesiredLanguageDetail";
import Img from 'react-image';



class userDetails extends Component{

    componentWillMount(){
        const id = this.props.match.params.id;
        this.props.fetchUser(id);
        this.props.fetchUserProvidedLanguages(id);
        this.props.fetchUserDesiredLanguages(id);
    }

    
    render(){
        
        // let created_at = (new Date(this.props.userState.active.created_at)).toString();
        // let updated_at = (new Date(this.props.userState.active.updated_at)).toString();
        let user = this.props.userState.active;
        let notFound = () => <Img src="http://localhost:3000/api/storages/images/download/no_image.png" alt="avatar"/>;
        let userImage = () => <Img src="http://localhost:3000/api/storages/images/download/no_image.png" alt="avatar" />;
        if (user.avatar_file_name !== null) {
            var url = `http://localhost:3000/api/storages/images/download/${user.avatar_file_name}`;
            userImage = () => <Img src={ url } className="img-thumbnail" unloader={ notFound() }/>
           }else{
            userImage = () => <Img src="http://localhost:3000/api/storages/images/download/no_image.png" alt="avatar" unloader={ notFound() } />;
           }
        
        return (   
               
            <div>
                <h2><span className="glyphicon glyphicon glyphicon-user" aria-hidden="true"></span>&nbsp;User Profile</h2>
                <hr />

                        {/* Image column */}
                        <div className="row">
                        <div className="col-sm-4">
                        
                            <ul className="list-group">
                                <li className="list-group-item text-center" >
                                    { userImage() }
                                </li>
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
                            </ul>

                        </div>
                        

                        {/* Languages column */}
                        <div className="col-sm-8">
                        
                            <div className="card">
                                
                            <div className="card-header"> <h4>{user.user_name}</h4></div>
                            <div className="card=block">

                                <div className="well well-small"> 
                                <ProvidedLanguageDetail state={this.props.userLanguageState}/>
                                </div>
                                <div className="well well-small"> 
                                <DesiredLanguageDetail state={this.props.userLanguageState}/>
                                </div>
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