import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

  class SearchForm extends Component {
    render() {
      const {  handleSubmit, pristine, submitting } = this.props;

      const languages = this.props.languages.map((language)=>{
          return(
              <option key={language.id} value={language.id}>
                  { language.name }
              </option>    
          )
      });

  return (
    <div>
        <div className="row">
            <div className="col-sm-12">
                    <form onSubmit={handleSubmit} className="form-row">   
 
                        <div className="form-group col-md-4">
                            <label>Who Speaks :</label>
                                <Field name="provided" component="select" className="form-control custom-select">
                                    <option />
                                    { languages }
                                </Field>
                        </div>

                        <div className="form-group col-md-4">
                            <label>And wants to learn :</label>
                                <Field name="desired" component="select" className="form-control custom-select">
                                    <option />
                                    { languages }
                                </Field>
                        </div>

                        <div className="form-group col-md-4">
                            <label>Gender :</label>
                                <Field name="gender" component="select" className="form-control custom-select">
                                    <option value="Any">Any</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Undeclared">Undeclared</option>
                                    <option value="Other">Other</option>
                                </Field>
                        </div> 
                        
                        <div className="form-group col-sm-12 text-center">
                            <button type="submit" className="btn btn-success" disabled={pristine || submitting}>
                                Search
                            </button>
            
                        </div>
                </form>
             </div>
        </div>
    </div>
                  
  )
}
}

SearchForm = reduxForm({
  form: 'search',
  destroyOnUnmount : false 
})(SearchForm)


export default SearchForm;