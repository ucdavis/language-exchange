import React, { Component} from 'react';
import axios from 'axios';

class AddLanguage extends Component{

    addLanguage(newLanguage){
        axios.request({
            method: 'post',
            url : 'http://localhost:3000/api/languages/',
            data: newLanguage
        }).then(response => {
            this.props.history.push('/languages');
        }).catch(err =>console.log("There was an error trying to save the new language", err))
    }

    onSubmit(e){
        e.preventDefault();
        const newLanguage = {
            name : this.refs.languageName.value
        }
        this.addLanguage(newLanguage);
    }
    render(){
        return(
            <div>
                <h1>Add Language</h1>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="languageName" className="control-label">Language Name:</label>
                        <input type="text" className="form-control" ref="languageName" id="languageName" placeholder="type here" />
                    </div> 
                    <input type="submit" value="Save" className="btn btn-success" />
                </form>
            </div>    
        )
    }

}

export default AddLanguage;