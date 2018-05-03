import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as languageActions from "../../actions/languageActions";
import { withRouter, Redirect } from 'react-router-dom';
import UpdateLanguageForm from '../../components/language/UpdateLanguageForm';


class UpdateLanguage extends Component{
    constructor(props){
        super(props);
        this.state={
            redirect : false
        }
    }
    

    componentDidMount(){
        if(this.props.match.params.id){
            this.props.fetchLanguage(this.props.match.params.id);
            
    }}


    onDelete(){
       this.props.deleteLanguage(this.props.match.params.id);
    }
    
    submit= values =>{
        let now = new Date();
        const language_id= this.props.languageState.active.id
        const newLanguage = {
            id : language_id,
            name : values.name,
            short_name : values.short_name,
            updated_at : now

        }
        this.props.updateLanguage(newLanguage);
        this.setState({ redirect: true })
    }

    render(){
        const {redirect} = this.state;
        if (redirect) {
            return <Redirect to='/Languages' />;
        }else{
        
            return(
                <div>
                    <h3>Edit Language</h3>
                    <hr/>

                    <div className="card">
                        <div className="card-header bg-dark text-white">
                            Language : {this.props.languageState.active.name } 
                        </div>
                        <div className="card-body">

                        <UpdateLanguageForm onSubmit={this.submit} />
                        </div>
                    </div>


                </div>  
            )
        }
    }

}

function mapStateToProps(state){
   return { languageState : state.languageState }
}

function mapDispatchToProps(dispatch){
   return  bindActionCreators({
       fetchLanguage:languageActions.fetchLanguage, 
       updateLanguage : languageActions.updateLanguage,
       deleteLanguage : languageActions.deleteLanguage
    }, dispatch)
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(UpdateLanguage));