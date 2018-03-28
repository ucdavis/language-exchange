import React from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
    const errors = {}
   

    if (!values.provided_language_id){
        errors.provided_language_id = 'Required'
    }  

    if (!values.provided_ability){
        errors.provided_ability = 'Required'
    }  

    return errors
  } 



let ProvidedLanguageSelectionForm = props => {
  const { handleSubmit, pristine, submitting, providedLanguagesSelect, abilities } = props;



  const SelectField = ({ input, label, type, meta: { touched, error, warning }, children }) => (
    <div>
      <label className="control-label">{label}</label>
      <div>
      <select {...input} className= "form-control custom-select form-control-sm">
        {children}
      </select>
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )



  return (

      <div>

        <label>Select name and level of the languages you know</label>
             <form onSubmit={handleSubmit}>

                <div className="form-group">
        
                    <Field name="provided_language_id" label="Language:" component={SelectField}>
                        <option />
                        {providedLanguagesSelect.map(language => (
                            <option value={language.id} key={language.id}>
                                {language.name}
                            </option>
                        ))}
                    </Field>
                </div>

                <div className="form-group">
                    <Field name="provided_ability" label="Ability:" component={SelectField}>
                        <option />
                        {abilities.map(ability => (
                        <option value={ability.id} key={ability.id}>
                            {ability.name}
                        </option>
                        ))}
                    </Field>
                </div>
            
                    <button type="submit" className="btn btn-success " disabled={pristine || submitting}>
                        Add Language
                    </button>
                
            </form>
        </div>
              
  )
}


ProvidedLanguageSelectionForm = reduxForm({
    form:"ProvidedLanguageForm",
    destroyOnUnmount: true,
    validate
})(ProvidedLanguageSelectionForm)


export default ProvidedLanguageSelectionForm;