import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

let LanguageSelectionForm = props => {
  const {  handleSubmit, pristine, submitting } = props;

  const providedLanguagesItem = this.providedLanguages.map((language)=>{
        return (
            <option key={ language.id } value = {language.id }> {language.name} </option>
        )
    });
 
  return (

      <div>
             <form onSubmit={handleSubmit}>



            <div className="form-group">
                <label htmlFor="language_id">language_id</label>
                <Field
                    name="fetched"
                    component="input"
                    type="text"
                    placeholder="language_id"
                    className="form-control"
                    value = ""
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

LanguageSelectionForm = reduxForm({
  // a unique name for the form
  form: 'languageSelection',
  enableReinitialize : true
})(LanguageSelectionForm)

// connect() to reducer
LanguageSelectionForm = connect(
    state => ({
        initialValues : state.userLanguageState.providedLanguages
    })
  )(LanguageSelectionForm)

export default LanguageSelectionForm;