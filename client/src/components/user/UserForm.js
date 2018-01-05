import React from 'react';
import { Field, reduxForm } from 'redux-form';


let UserForm = props => {
  const {  handleSubmit, pristine, submitting } = props;
  return (
      <div>
      <h1>User Profile</h1>
            <form onSubmit={handleSubmit}>

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

            {/* <div className="form-group">
                <label className="form-text text-muted">Authenticated Username : { casUser }</label>
            </div> */}

            <div className="form-group">
                <label htmlFor="userName">User Name</label>
                <Field
                    name="userName"
                    component="input"
                    type="text"
                    placeholder="User Name"
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                    name="email"
                    component="input"
                    type="email"
                    placeholder="Email"
                    className="form-control"
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
                <div className="form-check">
                    <label className="form-check-label">
                        <Field
                            name="emailConfirmed"
                            component="input"
                            type="checkbox"
                            className="form-check-input"
                        /> Email Confirmed
                    </label>
                </div>
            </div>

            

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
                    <label>University Affiliation</label>
                    <Field name="affiliation" component="select" className="form-control">
                        <option />
                        <option value="Not Specified">Not Specified</option>
                        <option value="Undergraduate Student">Undergraduate Student</option>
                        <option value="Graduate Student">Graduate Student</option>
                        <option value="Faculty">Faculty</option>
                        <option value="Staff">Staff</option>
                    </Field>
            </div>

            <div className="form-group">
                <label htmlFor="field">Major or Field of Study</label>
                <Field
                    name="field"
                    component="input"
                    type="text"
                    placeholder="Major"
                    className="form-control"
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="aditionalInformation">Additional Information</label>
                <br />
                <small id="aditionalInformationHelp" className="form-text text-muted">
                    Including any languages you know or are learning which fall under the 'Other' category below
                </small>
                <Field
                    name="aditionalInformation"
                    component="textarea"
                    placeholder="Type here..."
                    className="form-control"
                />
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
  // a unique name for the form
  form: 'user',
  destroyOnUnmount : true
})(UserForm)

export default UserForm;