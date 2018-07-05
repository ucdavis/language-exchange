import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions";
import * as messageActions from "../../actions/messageActions";
import { withRouter, Redirect } from 'react-router-dom';
import MessageForm from '../../components/message/MessageForm';

class CreateMessage extends Component {
    constructor(props){
        super(props);
        this.state = {
          redirect : false
        }
      }

      componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchUser(id);
      }

    submit = values =>{
        let now = new Date();
        let recipient_id = this.props.match.params.id;;
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
        let authUser = this.props.userState.current;
        if(!authUser){
        return <Redirect to='/' />
        }
        const {redirect} = this.state;
        const recipient = this.props.userState.active;
        if (redirect) {
            return <Redirect to='/' />;
        }else{
            return(
                <div>
                    <div className="row">
                        <div className="col-sm-12">
                        <MessageForm recipient={ recipient} onSubmit={this.submit} />
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
        fetchUser: userActions.fetchUser,
        createMessage: messageActions.createMessage
    }, dispatch)
  }
  
  export default withRouter( connect(mapStateToProps, mapDispatchToProps)(CreateMessage));