import React, { Component } from 'react';
import Languages from '../../components/language/Languages';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as languageActions from "../../actions/languageActions";
import { withRouter, Redirect } from 'react-router-dom';

class LanguageContainer extends Component{
    componentDidMount(){
        this.props.fetchLanguages();
    }
    
    render(){ 
        const authUser = this.props.userState.current;
        if(!authUser){
            return <Redirect to='/' />
          }
        const {updating,fetching,languages} = this.props.languageState;
        if( authUser.user_type){
            if(updating || fetching){
                return <h5>...loading</h5>
            }else{
                return ( <div> <Languages  languages={languages} /> </div> )
            }
        }else{
            return <Redirect to='/' />
        }
    }
}

function mapStateToProps(state){
    return{
        languageState: state.languageState,
        userState: state.userState
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetchLanguages: languageActions.fetchLanguages,
    }, dispatch)
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(LanguageContainer) );