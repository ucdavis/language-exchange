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

  const buttonStyle = {
    position: 'relative',
    top:25,
  };

let DesiredLanguageSelectionForm = props => {
  const { handleSubmit, pristine, submitting, languages, abilities } = props;



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

 
  return (

        <div>
        <div className="card bg-secondary m-3" id="selector">
            <div className="card-header">
                Select name and level of the languages <strong>you are learning.</strong>
            </div>
        <div className="card-body">

        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="form-group  col-md-4">

                    <Field name="language_id" component={SelectField}>
                        <option value="">-- Language --</option>
                        {languages.map(language => (
                            <option value={language.id} key={language.id}>
                                {language.name}
                            </option>
                        ))}
                    </Field>
                </div>

                <div className="form-group col-md-4">
                    <Field name="ability" component={SelectField}>
                        <option value="">-- Level -- </option>
                        {abilities.filter(ability =>{
                            return ability.id < 5})
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


DesiredLanguageSelectionForm = reduxForm({
  destroyOnUnmount: true,
  validate,
  enableReinitialize: true

})(DesiredLanguageSelectionForm)


export default DesiredLanguageSelectionForm;