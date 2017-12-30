import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions";


class userDetails extends Component{

    componentWillMount(){
        const id = this.props.match.params.id;
        this.props.fetchUser(id);
    }
    
    
    render(){ 
        let created_at = (new Date(this.props.userState.active.created_at)).toString();
        let updated_at = (new Date(this.props.userState.active.updated_at)).toString();

        if (!this.props.userState.active) {
            return (<h4>No User</h4>);
        }       
        return (         
            <div>
               <h1>{this.props.userState.active.user_name} </h1>
               
               <label>Available</label>
               <p>{String (this.props.userState.active.available)}</p>
               <label>Email notifications</label>
               <p>{String(this.props.userState.active.notify_by_email)}</p>
               <label>Email</label>
               <p>{this.props.userState.active.email} </p>
               <label>CAS</label>
               <p>{this.props.userState.active.cas_user} </p>
               <label>Description</label>
               <p>{this.props.userState.active.description} </p>
               <label>Field of Study</label>
               <p>{this.props.userState.active.field_of_study} </p>
               <label>Gender </label>
               <p>{this.props.userState.active.gender} </p>
               <label>University Affiliation</label>
               <p>{this.props.userState.active.affiliation} </p>
               <label>Created</label>
               <p>{ created_at }</p>
               <label>Updated</label>
               <p>{ updated_at }</p>
            </div>    
        )
    }
}

function mapStateToProps(state){
    return{ userState: state.userState }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchUser: userActions.fetchUser}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(userDetails);