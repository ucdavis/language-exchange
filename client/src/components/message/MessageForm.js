import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

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

let MessageForm = props => {
  const { handleSubmit, pristine, submitting, recipient, recipient_id  } = props;

  return (
      <div>
        <h3 className="text-right">New Message</h3>
        <div className="card">
        <div className="card-header">
         To: <Link to={ `/users/${recipient_id}`}> { recipient } </Link>
         </div>

          <div className="card-body">
            <form onSubmit={ handleSubmit }>
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
      </div>         
    </div>         
  )
}

MessageForm = reduxForm({
  form: 'messageForm',
  validate,
  destroyOnUnmount : true
})(MessageForm)

export default MessageForm;