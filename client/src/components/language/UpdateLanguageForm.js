import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const validate = values => {
    const errors = {}

    if (!values.name){
        errors.name = 'Required'
    }  

    if (!values.short_name){
        errors.short_name = 'Required'
    }  

    return errors
  } 

  const InputField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
      <label className="control-label">{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} className="form-control" />
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

  let UpdateLanguageForm = props => {
    const {  handleSubmit, pristine, submitting } = props;

    return (
        <div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <Field
                        name="name"
                        component={InputField}
                        type="text"
                        label="Language Name:"
                    />
                </div>
    
                <div className="form-group">
                    <Field
                        name="short_name"
                        component={InputField}
                        type="text"
                        label="Short Name"
    
                    />               
                </div>          
                <div className="row">
                    <div className="col-sm-6">
                        <button type="submit" className="btn btn-success" disabled={pristine || submitting}>
                        Save Changes
                        </button>
                    </div>

                    <div className="col-sm-6 text-right">
                    <Link to={'/Languages'}  className="btn btn-danger" disabled={ submitting }>Cancel</Link>
                    </div>
              </div>
              </form>
  
          </div>         
    )
  }

  UpdateLanguageForm = reduxForm({
  form: 'UpdateLanguageForm',
  validate,
  enableReinitialize : true
})(UpdateLanguageForm)

// connect() to user reducer
UpdateLanguageForm = connect(
    state => ({
        initialValues : state.languageState.active
    })
  )(UpdateLanguageForm)

export default UpdateLanguageForm;