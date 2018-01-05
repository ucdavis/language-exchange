import React from 'react';
import { Field, reduxForm } from 'redux-form';


let UserForm = props => {
  const {  handleSubmit, pristine, submitting } = props;
  return (
      <div>
      <h4>Search Partner</h4>
            <form onSubmit={handleSubmit}>            

            <div className="form-group">
                <label>Gender</label>
                    <Field name="gender" component="select" className="form-control custom-select">
                        <option />
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Undeclared">Undeclared</option>
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

UserForm = reduxForm({
  // a unique name for the form
  form: 'user',
  destroyOnUnmount : true
})(UserForm)

export default UserForm;