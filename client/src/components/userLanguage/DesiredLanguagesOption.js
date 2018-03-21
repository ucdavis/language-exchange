import React from 'react';
import { reduxForm, Field } from 'redux-form';
// import { connect } from "react-redux";

let DesiredLanguagesForm = props => {
  let {  handleSubmit, pristine, submitting, languageName } = props;
  console.log(props);


  const SelectField = ({ input, label, type, meta: { touched, error, warning }, children}) => (
    <div>
      <label className="col-sm-3 col-form-label">{label}</label>
      <div className="col-sm-5">
      <select {...input} className= "form-control  input-sm">
        {children}
      </select>
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  );


  return (
      <div>

            <form onSubmit={handleSubmit}  >
            {/* desiredLanguageId : {desiredLanguageId}<br/>
            languageId : {languageId}<br/>
            languageName : {languageName}<br/>
            ability : {ability}<br/> */}

               <Field name="ability" component={SelectField} label={languageName}  >
                    <option />
                    <option value="5">Native Speaker</option>
                    <option value="4">Superior</option>
                    <option value="3">Advanced</option>
                    <option value="2">Intermediate</option>
                    <option value="1">Elementary</option>
                    </Field>
            
            <div className="form-group">
                <button type="submit" className="btn btn-success btn-sm" disabled={pristine || submitting}>
                  Save
                </button>
            </div>
            
            </form>

        </div>         
  )
}

DesiredLanguagesForm = reduxForm({
  // validate,
  // initialValues: {ability:this.ability},
  // enableReinitialize : true
})(DesiredLanguagesForm)

 


export default DesiredLanguagesForm;