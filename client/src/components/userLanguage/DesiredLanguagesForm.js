import React from 'react';
import { reduxForm, Field } from 'redux-form';

let DesiredLanguagesForm = props => {
  const {  handleSubmit, pristine, submitting, userLanguageState } = props;

  const languageItems = userLanguageState.desiredLanguages.map((desiredLanguage) => {
    return(

      <div className="form-group row" key={desiredLanguage.id}>

          <label className="col-sm-3 col-form-label">{desiredLanguage.language.name}</label>
          <div className="col-sm-9" >
            <Field name={"abilityLanguage["+desiredLanguage.id+"]"} component="select">
              <option value="0"/>
              <option value="5">Native Speaker</option>
              <option value="4">Superior</option>
              <option value="3">Advanced</option>
              <option value="2">Intermediate</option>
              <option value="1">Elementary</option>
            </Field>
          </div>
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