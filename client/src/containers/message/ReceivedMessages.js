import React, { Component } from 'react';
import ReceivedMessages from '../../components/message/ReceivedMessages';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as messageActions from "../../actions/messageActions";

class ReceivedMessagesContainer extends Component{
    componentDidMount() {
        this.props.fetchReceivedMessages(this.props.userState.current.id);
    }

    
    render(){  

        return (
            <div>
                <ReceivedMessages 
                    messageState = { this.props.messageState }
                    showView={this.props.showView}
                    currentUser = {this.props.userState.current}
                    fetchReceivedMessages = {this.props.fetchReceivedMessages}  />
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
        fetchReceivedMessages : messageActions.fetchReceivedMessages
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedMessagesContainer);