import React, { Component} from 'react';
import axios from 'axios';

class EditLanguage extends Component{
    constructor(props){
        super(props);
        this.state = {
            id : '',
            name : ''
        }

        this.handleInputChange = this.handleInputChange.bind(this)
    }

    componentWillMount(){
        this.getLanguage();
    }

    getLanguage(){
        let languageId = this.props.match.params.id;
        axios.get(`http://localhost:3000/api/languages/${languageId}`)
        .then(response => {
            this.setState({
                id : response.data.id,
                name: response.data.name,
                created_at : response.data.created_at
                
            });
        }).catch(err =>console.log("There was an error fetching the language"))
    }

    editLanguage(newLanguage){
        axios.request({
            method: 'put',
            url : `http://localhost:3000/api/languages/${this.state.id}`,
            data: newLanguage
        }).then(response => {
            this.props.history.push('/languages');
        }).catch(err =>console.log("There was an error trying to save the new language"))

    }


    onDelete(){
        let languageId = this.state.id;
        axios.delete(`http://localhost:3000/api/languages/${languageId}`)
        .then(response => {
        this.props.history.push('/languages');
        })
        .catch(err => console.log("There was an error trying to delete the language"));
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
        console.log(this.props.location.search)
        let message = '';
        if (this.props.location.search === '?delete'){
            message = 'Are you sure you want to delete this language?'
        }
        return(
            <div>
                <h1>Edit Language</h1>
                <h4>{ message } </h4>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="name" className="control-label">Language Name:</label>
                        <input type="text" className="form-control" ref="name" name = "name" id="name" placeholder="type here" value={this.state.name} onChange={this.handleInputChange.bind(this)}/>
                    </div> 
                    <input type="submit" value="Save" className="btn btn-success" />
                    <button onClick={this.onDelete.bind(this)} className="btn btn-danger pull-right" > Delete </button> 
                </form>
            </div>    
        )
    }

}

export default EditLanguage;