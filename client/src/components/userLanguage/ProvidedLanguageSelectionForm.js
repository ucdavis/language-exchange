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
      <select {...input} className= "form-control">
        {children}
      </select>
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

  return (
    <div>
        {/* <div className="text-right"> <button
                className="btn btn-success"
                type="button"
                data-toggle="collapse"
                data-target="#selector"
                aria-expanded="false"
                aria-controls="selector">
            + Add
            </button>
        </div> */}

      
            <div className="card bg-secondary" id="selector">
      
                <div className="card-body">
                
                    <label>Select name and level of the languages you know well</label>
                        <form onSubmit={handleSubmit}>
                        <div className="form-row align-items-center">
                            <div className="form-group  col-md-4">
                    
                                <Field name="provided_language_id" component={SelectField}>
                                <option value="">-- Language --</option>
                                    {providedLanguagesSelect.map(language => (
                                        <option value={language.id} key={language.id}>
                                            {language.name}
                                        </option>
                                    ))}
                                </Field>
                            </div>

                            <div className="form-group  col-md-4">
                                <Field name="provided_ability"  component={SelectField}>
                                    <option value="">-- Level -- </option>
                                    {abilities.map(ability => (
                                    <option value={ability.id} key={ability.id}>
                                        {ability.name}
                                    </option>
                                    ))}
                                </Field>
                            </div>
                            <div className="form-group  col-md-4">
                                <button type="submit" className="btn btn-success " disabled={pristine || submitting}>
                                    Add Language
                                </button>
                            </div>    
                        </div>    
                            
                        </form>
                    </div>
                </div>
        </div>

              
  )
}


ProvidedLanguageSelectionForm = reduxForm({
    form:"ProvidedLanguageForm",
    destroyOnUnmount: true,
    validate
})(ProvidedLanguageSelectionForm)


export default ProvidedLanguageSelectionForm;