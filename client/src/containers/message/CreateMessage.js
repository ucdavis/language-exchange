import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions";
import * as messageActions from "../../actions/messageActions";
import { withRouter, Redirect } from 'react-router-dom';
import MessageForm from '../../components/message/MessageForm';

class CreateMessage extends Component {
    state = {
        redirect : false
    }
    componentDidMount() {
        const user_id  = this.props.match.params.id;
        this.props.fetchUser(user_id);
        this.props.fetchCurrentUser(); 
    }

    submit = values =>{
        let now = new Date();
        let recipient_id = this.props.userState.active.id;
        let sender_id = this.props.userState.current.id;
        const newMessage = {
            content : values.content,
            sender_id : sender_id,
            recipient_id : recipient_id,
            subject : values.subject,
            created_at : now,
            updated_at : now,
            read : 0
        }
        this.props.createMessage(newMessage);
        this.setState({ redirect: true })
    }

    render() {
        const {redirect} = this.state;
        if (redirect) {
            return <Redirect to='/messages' />;
        }else{
            return <MessageForm recipient={this.props.userState.active.user_name} onSubmit={this.submit} />
            
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
        createMessage: messageActions.createMessage
    }, dispatch)
  }
  
  export default withRouter( connect(mapStateToProps, mapDispatchToProps)(CreateMessage));