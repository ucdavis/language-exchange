import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as languageActions from "../../actions/languageActions";
import { withRouter } from 'react-router-dom'

class CreateLanguage extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            name : '',
            title: 'New Language'
        }

        this.handleInputChange = this.handleInputChange.bind(this)
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
         return(
            <div>
                <h1>{this.state.title } </h1>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="name" className="control-label">Language Name:</label>
                        <input type="text" className="form-control" ref="name" name = "name" id="name" value={this.state.name} onChange={this.handleInputChange} />
                    </div> 
                    <input type="submit" value="Save" className="btn btn-success" />
                </form>
            </div>  
        )
    }

}

function mapStateToProps(state){
   return { languageState : state.languageState }
}

function mapDispatchToProps(dispatch){
   return  bindActionCreators({ createLanguage:languageActions.createLanguage}, dispatch)
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(CreateLanguage));