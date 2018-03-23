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


let DesiredLanguagesForm = props => {
  let {  handleSubmit, submitting, user_id, languageName, desiredLanguageId, deleteDesiredLanguage, ability} = props;
  console.log(props);



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
                <button type="button" onClick={()=>deleteDesiredLanguage(desiredLanguageId,user_id)} disabled={submitting} className="btn btn-danger btn-sm">
                  Remove
                </button>
            </div>
            
            </form>

        </div>         
  )
}

DesiredLanguagesForm = reduxForm({
  validate
})(DesiredLanguagesForm)

 


export default DesiredLanguagesForm;