import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

const validate = values => {
    const errors = {}
    if (!values.user_name) {
      errors.user_name = 'Required'
    } else if (values.user_name.length < 2) {
      errors.user_name = 'Please use a more descriptive name'
    } else if (values.user_name.length > 15) {
        errors.user_name = 'Must be 15 characters or less'
      }

    if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

    if (!values.field_of_study){
        errors.field_of_study = 'Required'
    }  

    if (!values.gender){
        errors.gender = 'Required'
    }  

    if (!values.affiliation){
        errors.affiliation = 'Required'
    }  

    if (!values.description){
        errors.description = 'Required'
    }  

    return errors
  } 

  const InputField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label">{label}</label>
      <div className="col-sm-10">
        <input {...input} placeholder={label} type={type} className="form-control" />
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

  const SelectField = ({ input, label, type, meta: { touched, error, warning }, children }) => (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label">{label}</label>
      <div className="col-sm-10">
      <select {...input} className= "form-control custom-select">
        {children}
      </select>
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

  const TextAreaField = ({ input, label, meta: { touched, error, warning } }) => (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label">{label}</label><br/>
        
      <div className="col-sm-10">
        <textarea {...input} placeholder={label}  rows="3" className="form-control" />
        <small id="description" className="form-text text-muted">
            Please give your partners a brief background about yourself.
        </small>
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

  let UserForm = props => {
    const {  handleSubmit, pristine, submitting } = props;
  

  
    return (
        <div>

              <form onSubmit={handleSubmit}>
              
              <div className="card bg-secondary mb-3 col-sm-12">
                  <div className="card-body">
                  <div >
                          <Field
                              name="available"
                              component="input"
                              type="checkbox"
                              className="form-check-input"
                          /> Available
                              <small id="availableHelp" className="form-text text-muted">
                              If you uncheck this box your data will not show up in search results for others to contact you.<br />
                              You can come back to re-check the box when you are available again.
                              </small>
                     
                  </div>
                  </div>
              </div>
  
  
              <div>
                  <Field
                      name="user_name"
                      component={InputField}
                      type="text"
                      label="User Name"
                  />
              </div>
  
              <div>
                  <Field
                      name="email"
                      component={InputField}
                      type="email"
                      label="Email"
  
                  />               
              </div>
  
              <div className="form-group">
                  <div className="form-check">
                      <label className="form-check-label">
                          <Field
                              name="notify_by_email"
                              component="input"
                              type="checkbox"
                              className="form-check-input"
                          /> Send me email notifications
                      </label>
                  </div>
              </div>
  
              <div className="form-group">
                      <Field name="gender" component={SelectField} label="Gender" >
                          <option />
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Undeclared">Undeclared</option>
                      </Field>
              </div>
  
              <div className="form-group">
                      <Field name="affiliation" component={SelectField} label="University Affiliation" >
                          <option />
                          <option value="Not Specified">Not Specified</option>
                          <option value="Undergraduate Student">Undergraduate Student</option>
                          <option value="Graduate Student">Graduate Student</option>
                          <option value="Faculty">Faculty</option>
                          <option value="Staff">Staff</option>
                      </Field>
              </div>
  
              <div className="form-group">
                  <Field
                      name="field_of_study"
                      component={InputField}
                      type="text"
                      label="Field of Study"
                  />
              </div>
              
  
              <div className="form-group">
                  
                  <Field
                      name="description"
                      component={TextAreaField} 
                      label="Description" />
                  
              </div>                       
              
              <div className="form-group row">
                <div className="col-xs-6">  
                    <button type="submit" className="btn btn-success" disabled={pristine || submitting}>
                        Save Changes
                    </button>
                </div>
              <div className="col-xs-6">
                  <Link to={ '/users/profile'} className="btn btn-primary" disabled={submitting}>
                    View Profile
                  </Link >
              </div>
              </div>
              </form>
  
          </div>         
    )
  }

UserForm = reduxForm({
  form: 'user',
  validate,
  enableReinitialize : true
})(UserForm)

// connect() to user reducer
UserForm = connect(
    state => ({
        initialValues : state.userState.current
    })
  )(UserForm)

export default UserForm;