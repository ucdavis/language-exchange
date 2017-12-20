import React from 'react'
import UserForm from '../../components/user/UserForm'

class CreateUser extends React.Component {
  submit = values => {
    let now = new Date();
    const newLanguage = {
        available : values.available,
        user_name : values.userName,
        email_confirmed : values.emailConfirmed,
        notify_by_email : values.emailNotifications,
        email : values.email,
        gender : values.gender,
        description : values.aditionalInformation,
        affiliation : values.affiliation,
        field_of_study: values.field,
        updated_at : now,
        created_at : now
    }
    //this.props.createLanguage(newLanguage);
    // print the form values to the console
    console.log("New Language:", newLanguage)
    console.log(values)
  }
  render() {
    return <UserForm onSubmit={this.submit} />
  }
}

export default CreateUser;