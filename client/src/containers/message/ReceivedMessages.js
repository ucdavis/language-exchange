import React, { Component } from 'react';
import ReceivedMessages from '../../components/message/ReceivedMessages';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as messageActions from "../../actions/messageActions";
import * as userActions from "../../actions/userActions";


class ReceivedMessagesContainer extends Component{

    // TODO: GET AUTH USER MESSAGES HERE !!!
    componentDidMount(){
        const current_user =this.props.userState.current;
        this.props.fetchReceivedMessages(current_user.id);
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
        messageState: state.messageState,
        userState: state.userState
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetchReceivedMessages : messageActions.fetchReceivedMessages,
        fetchMessage : messageActions.fetchSentMessages,
        fetchCurrentUser: userActions.fetchCurrentUser
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedMessagesContainer);