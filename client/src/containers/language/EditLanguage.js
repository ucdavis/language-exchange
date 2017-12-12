import React, { Component } from 'react';


class EditLanguage extends Component{
    constructor(props){
        super(props);
        this.state = {
            id : '',
            name : ''
        }
    }

    onSubmit(e){
        e.preventDefault();
        let now = new Date();
        const newLanguage = {
            name : this.refs.name.value,
            updated_at : now,
            created_at : this.state.created_at

        }

        this.editLanguage(newLanguage);
    }

    handleInputChange(e){
        const value = e.target.value
        const name = e.target.name
        this.setState({
            [name]: value
        })
    }
    
    render(){
        return(
            <div>
                <h1>Edit Language Container</h1>
               
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="name" className="control-label">Language Name:</label>
                        <input type="text" className="form-control" ref="name" name = "name" id="name" placeholder="type here" value={this.state.name} onChange={this.handleInputChange.bind(this)}/>
                    </div> 
                    <input type="submit" value="Save" className="btn btn-success" />
                    <button className="btn btn-success pull-right" > Edit with Redux </button> 
                    <button className="btn btn-danger pull-right" > Delete </button> 
                </form>
            </div>    
        )
    }

}

export default EditLanguage;
