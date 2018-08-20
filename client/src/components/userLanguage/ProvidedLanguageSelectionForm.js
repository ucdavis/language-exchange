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

  const buttonStyle = {
    position: 'relative',
    top:25,
  };

  const SelectField = ({ input, label, type, meta: { touched, error, warning }, children }) => (
    <div>
      <label className="control-label">{label}</label>
      <div>
      <select {...input} className= "form-control">
        {children}
      </select>
        
      </div>
      {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  )

let ProvidedLanguageSelectionForm = props => {
  const { handleSubmit, pristine, submitting, providedLanguagesSelect, abilities } = props;

  return (
    <div>
            <div className="card bg-secondary m-3" id="selector">
            <div className="card-header">
            Select name and level of the languages <strong>you know well.</strong>
            </div>
            <div className="card-body">

                    <form onSubmit={handleSubmit}>
                        <div className="row">
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
                            <Field name="ability" component={SelectField}>
                                <option value="">-- Level -- </option>
                                {abilities.filter(ability =>{
                                    return ability.id > 1})
                                .map(ability => (
                                <option value={ability.id} key={ability.id}>
                                    {ability.name}
                                </option>
                                ))}
                            </Field>
                            </div>
                            <div className="form-group col-md-4" style={buttonStyle}>
                                <button type="submit" className="btn btn-success" disabled={pristine || submitting}>
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