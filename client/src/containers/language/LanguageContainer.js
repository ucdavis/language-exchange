import React, { Component } from 'react';
import Languages from '../../components/language/Languages';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as languageActions from "../../actions/languageActions";
import * as userActions from "../../actions/userActions";

class LanguageContainer extends Component{
    componentDidMount(){
        this.props.fetchLanguages();
        this.props.fetchCurrentUser();
    }
    
    render(){ 
        const {updating,fetching,languages} = this.props.languageState;
        const authUser = this.props.userState.current;

        if( authUser.user_type){
            if(updating || fetching){
                return <h5>...loading</h5>
            }else{
                return ( <div> <Languages  languages={languages} /> </div> )
            }
        }else{
            return ( <div> <h4> 403 Forbidden - User Not Authorized </h4></div> )
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
        fetchCurrentUser: userActions.fetchCurrentUser

    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageContainer);