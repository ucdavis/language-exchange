import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as languageActions from "../../actions/languageActions";

class UpdateLanguage extends Component{
    constructor(props){
        super(props);
        this.state = {nameValue : ""}

        this.handleInputChange = this.handleInputChange.bind(this)
    }

    componentWillMount(){
        const id = this.props.match.params.id;
        this.props.fetchLanguage(id);
        this.setState({
            nameValue: this.props.languageState.active.name
        })
    }

    handleInputChange(e){
        const value = e.target.value
        const nameValue = e.target.nameValue
        this.setState({
            [nameValue]: value
        })
    }
    
    onSubmit(e){
        e.preventDefault();
        let now = new Date();
        const newLanguage = {
            name : this.refs.name.value,
            updated_at : now,
            created_at : this.languageState.active.created_at

        }
        this.editLanguage(newLanguage);
    }

    render(){
        return(
            <div>
                <h1>Edit Language {this.props.languageState.active.name}</h1>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="name" className="control-label">Language Name:</label>
                        <input type="text" className="form-control" ref="name" name = "name" id="name" value={this.state.nameValue} onChange={this.handleInputChange}/>
                    </div> 
                    <input type="submit" value="Save" className="btn btn-success" />
                    <button className="btn btn-success pull-right" > Edit with Redux </button> 
                    <button className="btn btn-danger pull-right" > Delete </button> 
                </form>
            </div>  
        )
    }

}

function mapStateToProps(state){
   return { languageState : state.languageState }
}

function mapDispatchToProps(dispatch){
   return  bindActionCreators({fetchLanguage:languageActions.fetchLanguage}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateLanguage);