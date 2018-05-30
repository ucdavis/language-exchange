import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as languageActions from "../../actions/languageActions";
import { withRouter } from 'react-router-dom';
import * as userActions from "../../actions/userActions";

class CreateLanguage extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            name : '',
            title: 'New Language'
        }

        this.handleInputChange = this.handleInputChange.bind(this)
    }

    componentDidMount(){
        this.props.fetchCurrentUser();
    }

    handleInputChange(event){
        this.setState({
            ...this.state.values,
            name : event.target.value
        })
    }
    
    onSubmit(e){
        e.preventDefault();
        let now = new Date();
        const newLanguage = {
            name : this.refs.name.value,
            updated_at : now,
            created_at : now

        }
        this.props.createLanguage(newLanguage);
    }

    render(){
        const authUser = this.props.userState.current;
        if( authUser.user_type){
        
            return(
                <div>
                    <h3>{this.state.title }</h3>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="name" className="control-label">Language Name:</label>
                            <input type="text" className="form-control" ref="name" name = "name" id="name" value={this.state.name} onChange={this.handleInputChange} />
                        </div> 
                        <input type="submit" value="Save" className="btn btn-success" />
                    </form>
                </div>  
            )
        }else{
            return ( <div> <h4> 403 Forbidden - User Not Authorized </h4></div> )
        }

    }
}

function mapStateToProps(state){
    return{
        languageState: state.languageState,
        userState: state.userState
    }
}

function mapDispatchToProps(dispatch){
   return  bindActionCreators({
       createLanguage:languageActions.createLanguage,
       fetchCurrentUser: userActions.fetchCurrentUser
    }, dispatch)
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(CreateLanguage));