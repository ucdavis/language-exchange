import React, { Component } from 'react';
import ReceivedMessages from '../../components/message/ReceivedMessages';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as messageActions from "../../actions/messageActions";

class ReceivedMessagesContainer extends Component{

    
    render(){  

        return (
            <div>
                <ReceivedMessages 
                messageState = { this.props.messageState }
                fetchMessage = { this.props.fetchMessage }
                showView={this.props.showView}
                currentUser = {this.props.userState.current}  />
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
        fetchReceivedMessages : messageActions.fetchReceivedMessages,
        fetchMessage : messageActions.fetchSentMessages
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedMessagesContainer);