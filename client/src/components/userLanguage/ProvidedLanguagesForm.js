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
        <div className="card mb-3 text-center border-info" >
            <form onSubmit={handleSubmit}>
              <div className="card-header bg-dark text-white">
                <strong>{languageName}</strong>
              </div>

              <div className="card-body text-center">
                Level<br/><strong>({ability.id}) {ability.name}</strong>
              </div>

              <div className="card-footer text-center">
                  <button type="button" onClick={()=>deleteProvidedLanguage(providedLanguageId,user_id)} disabled={submitting} className="btn btn-danger btn-sm">
                    Remove
                  </button>
              </div>
            </form>

        </div>        
      </div>             
  )
}

ProvidedLanguagesForm = reduxForm({
  form:"ProvidedLanguagesForm",
  validate
})(ProvidedLanguagesForm)

export default ProvidedLanguagesForm;