import React from 'react';
import { reduxForm, Field } from 'redux-form';

let DesiredLanguagesForm = props => {
  const {  handleSubmit, pristine, submitting, languages } = props;


  const SelectField = ({ input, label, type, meta: { touched, error, warning }, children}) => (
    <div>
      <label className="col-sm-3 col-form-label">{label}</label>
      <div className="col-sm-5">
      <select {...input} className= "form-control  input-sm">
        {children}
      </select>
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

  const languageItems = languages.map((language) => {
    return(

        <div className="form-group row" key={language.id}>
                    <Field name={language.id} component={SelectField} label={language.name}  >
                    <option />
                    <option value="5">Native Speaker</option>
                    <option value="4">Superior</option>
                    <option value="3">Advanced</option>
                    <option value="2">Intermediate</option>
                    <option value="1">Elementary</option>
                    </Field>
        </div>
    )  
});


  return (
      <div>

            <form onSubmit={handleSubmit}>

                {languageItems}
            
            <div className="form-group">
                <button type="submit" className="btn btn-success" disabled={pristine || submitting}>
                Save Changes
                </button>
 
            </div>
            </form>

        </div>         
  )
}

DesiredLanguagesForm = reduxForm({
  form: 'DesiredLanguagesForm',
})(DesiredLanguagesForm)

export default DesiredLanguagesForm;