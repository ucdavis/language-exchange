import React from 'react';
import { Field, reduxForm } from 'redux-form';


let LanguageSelectionForm = props => {
  const {  handleSubmit, pristine, submitting,languages, abilities } = props;


 
  return (

      <div className="well">
             <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label className="col-sm-12col-form-label">Language</label>
                <div className="col-sm-12 ">
                    <Field name="language_id" component="select">
                        <option value="">Select language &nbsp;</option>
                        {languages.map(language => (
                        <option value={language.id} key={language.id}>
                            {language.name}
                        </option>
                        ))}
                    </Field>
                </div>
                </div>

                <div className="form-group">
                    <label className="col-sm-12 col-form-label">Ability</label>
                    <div className="col-sm-12">
                    <Field name="ability" component="select">
                        <option value="">Select ability</option>
                        {abilities.map(ability => (
                        <option value={ability.id} key={ability.id}>
                            {ability.name}
                        </option>
                        ))}
                    </Field>
                </div>
                </div>

            
                    <button type="submit" className="btn btn-success" disabled={pristine || submitting}>
                    Add Language
                    </button>
    
                
            </form>

        </div>         
  )
}

LanguageSelectionForm = reduxForm({
  // a unique name for the form
  form: 'languageSelection',

})(LanguageSelectionForm)


export default LanguageSelectionForm;