import React, { Component } from 'react';
import SentMessages from '../../components/message/SentMessages';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as messageActions from "../../actions/messageActions";

class SentMessagesContainer extends Component{
    componentDidMount() {
        this.props.fetchSentMessages(this.props.userState.current.id);
    }

    
    render(){        
        return (
            <div>
                    <SentMessages
                        messageState = { this.props.messageState }
                        showView={ this.props.showView }
                        currentUser = { this.props.userState.current }
                        fetchSentMessages = { this.props.fetchSentMessages }  />
            </div>       
        )
    }
}

function mapStateToProps(state){
    return{
        messageState: state.messageState,
        userState: state.userState
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetchSentMessages : messageActions.fetchSentMessages,
        fetchMessage : messageActions.fetchSentMessages
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SentMessagesContainer);