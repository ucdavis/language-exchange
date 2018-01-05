import React from 'react';
import { Field, reduxForm } from 'redux-form';


let SearchUserForm = props => {
  const {  handleSubmit, pristine, submitting } = props;
  return (
      <div>
      <h4>Find a partner</h4>
            <form onSubmit = { handleSubmit }>

            <div className="form-group">
                <label>Gender</label>
                    <Field name="gender" component="select" className="form-control custom-select">
                        <option />
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="undeclared">Undeclared</option>
                    </Field>
            </div>

            <div className="form-group">
                <button type="submit" className="btn btn-success" disabled={pristine || submitting}>
                Search
                </button>
 
            </div>
            </form>

        </div>         
  )
}

SearchUserForm = reduxForm({
  form: 'search',
})(SearchUserForm)


export default SearchUserForm;