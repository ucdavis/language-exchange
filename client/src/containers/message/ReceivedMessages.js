import React, { Component } from 'react';
import ReceivedMessages from '../../components/message/ReceivedMessages';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as messageActions from "../../actions/messageActions";


class ReceivedMessagesContainer extends Component{


    // TODO: GET AUTH USER MESSAGES HERE !!!
    componentDidMount(){
    
        this.props.fetchReceivedMessages(663);
    }
    
    render(){  

        return (
            <div>
                <ReceivedMessages state= { this.props.messageState } fetchMessage = { this.props.fetchMessage } showView={this.props.showView}  />
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
    return bindActionCreators({
        fetchReceivedMessages : messageActions.fetchReceivedMessages,
        fetchMessage : messageActions.fetchSentMessages
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedMessagesContainer);