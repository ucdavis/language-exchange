import React from 'react';
import { reduxForm, Field } from 'redux-form';

const validate = values => {
    const errors = {}
    if (!values.userName) {
      errors.userName = 'Required'
    } else if (values.userName.length < 2) {
      errors.userName = 'Please use a more descriptive name'
    } else if (values.userName.length > 10) {
        errors.userName = 'Must be 10 characters or less'
      }

    if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

    if (!values.field){
        errors.field = 'Required'
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



let UserForm = props => {
  const {  handleSubmit, pristine, submitting } = props;

  const InputField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
      <label className="control-label">{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} className="form-control" />
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

  const SelectField = ({ input, label, type, meta: { touched, error, warning }, children }) => (
    <div>
      <label className="control-label">{label}</label>
      <div>
      <select {...input} className= "form-control custom-select">
        {children}
      </select>
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

  const TextAreaField = ({ input, label, meta: { touched, error, warning } }) => (
    <div>
      <label className="control-label">{label}</label><br/>
        <small id="description" className="form-text text-muted">
            Please give your partners a brief background about yourself.
        </small>
      <div>
        <textarea {...input} placeholder={label}  rows="3" className="form-control" />
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

  return (
      <div>
      <h2>Registration Form</h2>
            <form onSubmit={handleSubmit}>

            {/* <input type="hidden" value={this.props.cas_user} /> */}

            <div className="well">
                <div className="form-check">
                    <label className="form-check-label">
                        <Field
                            name="available"
                            component="input"
                            type="checkbox"
                            className="form-check-input"
                        /> Available
                            <small id="availableHelp" className="form-text text-muted">
                            <br /> If you uncheck this box your data will not show up in search results for others to contact you.
                            <br /> You can come back to re-check the box when you are available again.
                            </small>
                    </label>
                </div>
            </div>


            <div className="form-group">
                <Field
                    name="userName"
                    component={InputField}
                    type="text"
                    label="User Name"
                />
            </div>

            <div className="form-group">
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
                            name="emailNotifications"
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
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="undeclared">Undeclared</option>
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
                    name="field"
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
            
            <div className="form-group">
                <button type="submit" className="btn btn-success" disabled={pristine || submitting}>
                Save Changes
                </button>
 
            </div>
            </form>

        </div>         
  )
}

UserForm = reduxForm({
  form: 'createUser',
  validate,
  destroyOnUnmount : true,

})(UserForm)

export default UserForm;