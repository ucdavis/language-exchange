import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions";
import * as messageActions from "../../actions/messageActions";
import { withRouter, Redirect } from 'react-router-dom';
import MessageForm from '../../components/message/MessageForm';
import SentMessages  from "../../containers/message/SentMessages";
import ReceivedMessages  from "../../containers/message/ReceivedMessages";
import * as flashMessageActions from '../../actions/flashMessageActions'

class CreateMessage extends Component {
    constructor(props){
        super(props);
        this.showView = this.showView.bind(this);
        this.state = {
          display : <MessageForm recipient={ this.props.originalMessage.sender} onSubmit={this.submit} />,
          redirect : false
        }
      }

      showView = (view)=>{
        this.setState({ display:view });
      }

    submit = values =>{
        let now = new Date();
        let recipient_id = this.props.originalMessage.sender_id;
        const newMessage = {
            content : values.content,
            recipient_id : recipient_id,
            subject : values.subject,
            created_at : now,
            updated_at : now,
            viewed : 0
        }
        this.props.createMessage(newMessage);
        this.setState({ redirect: true })
    }

    showInbox= () => {
            this.setState({
            display: <ReceivedMessages
                showView={this.showView }
                userState = {this.props.userState}
                messageState = {this.props.messageState} />
            });
        }
      
      showSent = () => {
            this.setState({
            display:<SentMessages
            showView={this.showView }
            userState = {this.props.userState}
            messageState = {this.props.messageState}
            />});
        }

    render() {
        const {redirect} = this.state;
        if (redirect) {
            this.props.sendFlashMessage("Message sent!", "alert-success");
            return <Redirect to='/' />;
        }else{
            return(
                <div>
                    <div className="row">
                        <div className="col-sm-12">
                            { this.state.display }
                        </div>
                    </div>
            </div>
            )
        }
    }
}

function mapStateToProps(state){
    return{
        userState: state.userState
    }
  }
  
  function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetchCurrentUser: userActions.fetchCurrentUser,
        fetchUser: userActions.fetchUser,
        createMessage: messageActions.createMessage,
        sendFlashMessage: flashMessageActions.sendFlashMessage
    }, dispatch)
  }
  
  export default withRouter( connect(mapStateToProps, mapDispatchToProps)(CreateMessage));