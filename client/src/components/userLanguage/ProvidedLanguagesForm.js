import React from 'react';
import { reduxForm } from 'redux-form';

const validate = values => {
  const errors = {}

  if (!values.language_id){
      errors.language_id = 'Required'
  }  

  if (!values.ability){
      errors.ability = 'Required'
  }  

  return errors
} 


let ProvidedLanguagesForm = props => {
  let {  handleSubmit, submitting, user_id, languageName, providedLanguageId, deleteProvidedLanguage, ability} = props;
  return (
      <div>

            <form onSubmit={handleSubmit}  >
            
            <div className="form-group">
            <label>{languageName}</label>
            </div>
            <div className="form-group">
            <label>{ability}</label>
            </div>

            <div className="form-group">
                <button type="button" onClick={()=>deleteProvidedLanguage(providedLanguageId,user_id)} disabled={submitting} className="btn btn-danger btn-sm">
                  Remove
                </button>
            </div>
            
            </form>

        </div>         
  )
}

ProvidedLanguagesForm = reduxForm({
  form:"ProvidedLanguagesForm",
  validate
})(ProvidedLanguagesForm)

export default ProvidedLanguagesForm;