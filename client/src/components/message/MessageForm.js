import React from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
    const errors = {}
    if (!values.subject) {
      errors.subject = 'Required'
    } else if (values.subject.length < 2) {
      errors.firstName = 'Please use a more descriptive subject'
    }

    if (!values.content) {
        errors.content = 'Required'
      } else if (values.content.length < 2) {
        errors.lastName = 'Please use a more descriptive message'
      }
    return errors
  } 


let MessageForm = props => {
  const { handleSubmit, pristine, submitting  } = props;

  

  const inputField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
      <label className="control-label">{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} className="form-control" />
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

  const messageField = ({ textarea, label, type, meta: { touched, error, warning } }) => (
    <div>
      <label className="control-label">{label}</label>
      <div>
        <textarea {...textarea} placeholder={label} type={type} className="form-control" />
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

 
  
  return (
      <div>
      <h1>New Message</h1>
      <form onSubmit={ handleSubmit }>

      <div className="form-group">
        <Field name="subject" component={inputField} label="Subject" />
      </div>
      <div className="form-group">
        <Field name="content" component={messageField}  label="Message" />
      </div>
      <div className="form-group">
        <button type="submit" disabled={pristine || submitting} className="btn btn-success">Send Message</button>
      </div>
    </form>

        </div>         
  )
}

MessageForm = reduxForm({
  form: 'messageForm',
  validate,
  destroyOnUnmount : true
})(MessageForm)

export default MessageForm;