import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class LanguageSelection extends Component{


    render(){
        const {  handleSubmit, pristine, submitting } = this.props;

        const languageItems = this.props.languages.map((language) => {
            return(
                <option key={language.id} value={language.id}>{language.name}</option>
            )  
        });

        const languageAbility = this.props.abilities.map((ability) => {
            return(
                <option key={ability.id} value={ability.id}>{ability.name}</option>
            )
        })


        return (
            <div className="row">

             <form onSubmit={handleSubmit}>   
                <div>
                    <label>Please select a language and your level of proficiency, then add it to the list of languages you want to learn</label> 
                </div>    
                <div className="table-responsive">
                    <table className="table table-responsive table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Language</th>
                        <th scope="col">Ability</th>
                        <th scope="col">Add</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>    
                        <td>
                        <Field name="language" component="select" className="form-control custom-select form-control-sm">
                            <option />
                            {languageItems}
                        </Field>
                        </td>
                        <td>
                        <Field name="ability" component="select" className="form-control custom-select form-control-sm">
                            <option />
                            {languageAbility}
                        </Field>                        
                        </td>
                        <td><button className="btn btn-sm btn-success">Add</button></td>  
                    </tr>    
                    </tbody>
                    </table> 
                </div>
                </form >   
            </div>    
        )
    }
}

LanguageSelection = reduxForm({
    form: 'languageSelectForm',
    destroyOnUnmount : false 
  })(LanguageSelection)

export default LanguageSelection;