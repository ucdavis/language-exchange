import React from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
    const errors = {}
    if (!values.subject) {
      errors.subject = 'Required'
    } else if (values.subject.length < 2) {
      errors.subject = 'Please use a more descriptive subject'
    }

    if (!values.content) {
        errors.content = 'Required'
      } else if (values.content.length < 2) {
        errors.lastName = 'Please use a more descriptive message'
      }
    return errors
  } 


let MessageForm = props => {
  const { handleSubmit, pristine, submitting, recipient  } = props;

  const InputField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
      <label className="control-label">{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} className="form-control" />
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

  const TextAreaField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
      <label className="control-label">{label}</label>
      <div>
        <textarea {...input} placeholder={label} type={type} className="form-control" />
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

 
  
  return (
      <div>
      <h2>New Message</h2>
      <form onSubmit={ handleSubmit }>

      <div className="form-group">
        <label>To: {recipient}</label>   
      </div>

      <div className="form-group">
        <Field name="subject" component={InputField} label="Subject" />
      </div>

      <div className="form-group">
        <Field name="content" component={TextAreaField}  label="Message" />
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