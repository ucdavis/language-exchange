import React from 'react';
import { Field, reduxForm } from 'redux-form';


let LanguageSelectionForm = props => {
  const {  handleSubmit, pristine, submitting,languages, abilities } = props;


 
  return (

      <div className="well">

             <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="language_id">Language</label>             
                    <Field name="language_id" id="language_id" component="select" className="form-control custom-select form-control-sm">
                        <option value="">Select language &nbsp;</option>
                        {languages.map(language => (
                        <option value={language.id} key={language.id}>
                            {language.name}
                        </option>
                        ))}
                    </Field>
                </div>

                <div className="form-group">
                    <label htmlFor="ability">Ability</label>
                    <Field name="ability" id="ability" component="select" className="form-control custom-select form-control-sm">
                        <option value="">Select ability</option>
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

LanguageSelectionForm = reduxForm({
  form: 'languageSelection',

})(LanguageSelectionForm)


export default LanguageSelectionForm;