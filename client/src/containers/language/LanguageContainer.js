import React, { Component } from 'react';
import Languages from '../../components/language/Languages';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as languageActions from "../../actions/languageActions";

class LanguageContainer extends Component{
    componentDidMount(){
        this.props.fetchLanguages();
    }
    
    render(){ 
        const {updating,fetching,languages} = this.props.languageState;

        if(updating || fetching){
            return <h5>...loading</h5>
        }else{
            return (
                <div>
                    <Languages  languages={languages} />
                </div>       
            )
        }
    }
}

function mapStateToProps(state){
    return{
        languageState: state.languageState  
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchLanguages: languageActions.fetchLanguages}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageContainer);