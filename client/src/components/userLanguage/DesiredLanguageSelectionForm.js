import React from 'react';
import { Field, reduxForm } from 'redux-form';

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



let DesiredLanguageSelectionForm = props => {
  const { handleSubmit, pristine, submitting, languages, abilities } = props;



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

        <label>Select name and level of the language you are learning.</label>
             <form onSubmit={handleSubmit}>

                <div className="form-group">
        
                    <Field name="language_id" label="Language:" component={SelectField}>
                        <option />
                        {languages.map(language => (
                            <option value={language.id} key={language.id}>
                                {language.name}
                            </option>
                        ))}
                    </Field>
                </div>

                <div className="form-group">
                    <Field name="ability" label="Ability:" component={SelectField}>
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


DesiredLanguageSelectionForm = reduxForm({
  destroyOnUnmount: true,
  validate,
  enableReinitialize: true

})(DesiredLanguageSelectionForm)


export default DesiredLanguageSelectionForm;