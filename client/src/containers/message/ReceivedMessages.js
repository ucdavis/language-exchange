import React, { Component } from 'react';
import ReceivedMessages from '../../components/message/ReceivedMessages';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as messageActions from "../../actions/messageActions";
// import * as userActions from "../../actions/userActions";


class ReceivedMessagesContainer extends Component{

    // TODO: GET AUTH USER MESSAGES HERE !!!
    componentDidMount(){
        // this.props.fetchCurrentUser(this.props.userState.cas_user);
        // this.setState()
        // // const current_user =this.props.userState.current;
        //this.props.fetchReceivedMessages(this.props.userState.current.id);
    }
    
    render(){  

        return (
            <div>
                {this.props.userState.current.id}
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