import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as languageActions from "../../actions/languageActions";
import { withRouter } from 'react-router-dom'

class UpdateLanguage extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name : '' ,
            created_at : '',
            title: this.props.languageState.active.name 
        }

        this.handleInputChange = this.handleInputChange.bind(this)
    }

    componentWillMount(){
        if(this.props.match.params.id){
            this.props.fetchLanguage(this.props.match.params.id);
    }}

    handleInputChange(event){
        this.setState({
            ...this.state.values,
            name : event.target.value
        })
    }
    
    onDelete(){
       this.props.deleteLanguage(this.props.match.params.id);
    }
    
    onSubmit(e){
        e.preventDefault();
        let now = new Date();
        const newLanguage = {
            id : this.props.match.params.id,
            name : this.refs.name.value,
            updated_at : now,
            created_at : this.props.languageState.active.created_at

        }
        this.props.updateLanguage(newLanguage);
    }

    render(){
         return(
            <div>
                <h1>Edit Language : {this.props.languageState.active.name } </h1>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="name" className="control-label">Language Name:</label>
                        <input type="text" className="form-control" ref="name" name = "name" id="name" value={this.state.name} onChange={this.handleInputChange} />
                    </div> 
                    <input type="submit" value="Save" className="btn btn-success" />
                    <button className="btn btn-danger pull-right" onClick={this.onDelete.bind(this)} > Delete </button> 
                </form>
            </div>  
        )
    }

}

function mapStateToProps(state){
   return { languageState : state.languageState }
}

function mapDispatchToProps(dispatch){
   return  bindActionCreators({
       fetchLanguage:languageActions.fetchLanguage, 
       updateLanguage : languageActions.updateLanguage,
       deleteLanguage : languageActions.deleteLanguage
    }, dispatch)
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(UpdateLanguage));