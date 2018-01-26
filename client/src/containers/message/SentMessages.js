import React, { Component } from 'react';
import SentMessages from '../../components/message/SentMessages';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as messageActions from "../../actions/messageActions";

class SentMessagesContainer extends Component{

    componentDidMount(){
    
        this.props.fetchSentMessages(663);
    }
    
    render(){        
        return (
            <div>
                <ul className="list-group">
                    <SentMessages state= {this.props.messageState} />
                </ul>    
            </div>       
        )
    }
}

function mapStateToProps(state){
    return{
        messageState: state.messageState
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchSentMessages : messageActions.fetchSentMessages}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SentMessagesContainer);