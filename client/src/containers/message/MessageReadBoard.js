import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MessageForm from '../../components/message/MessageForm';
import * as messageActions from "../../actions/messageActions";
import React from 'react';
import { withRouter } from 'react-router-dom';
import  SentMessages  from "../../containers/message/SentMessages";
import  ReceivedMessages  from "../../containers/message/ReceivedMessages";
import MessageDetail from "../../components/message/MessageDetail";

class ReadMessage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      display : <MessageDetail state = { this.props.messageState } />,
      message : null
    }
  }

  componentDidMount(){

    this.props.fetchMessage(1897);
}

  
  render() {
 
    return (
    
    <div className="row">

      <div className="col-sm-2">

      <div className="side-bar">
        <div className="btn-group-vertical" role="group" aria-label="Vertical button group">

          <button
            type="button"
            className="btn btn-default"
            onClick={() => this.setState({display:<ReceivedMessages />})} >
            &nbsp;&nbsp;Inbox&nbsp;
          </button>

          <button
            type="button"
            className="btn btn-default"
            onClick={() => this.setState({display:<SentMessages />})} >
            &nbsp;&nbsp;Sent&nbsp;
          </button>

          <button
            type="button"
            className="btn btn-default"
            onClick={() => this.setState({display:<MessageForm />})} >
            &nbsp;&nbsp;Compose&nbsp;
          </button>

        </div>
    </div>
       
      <div>

      </div>

      </div>

      <div className="col-sm-10">
          <div>
            { this.state.display }
          </div>
      </div>

    </div>
    
    )
  }
}

function mapStateToProps(state){
    return { messageState : state.messageState }
 }
 
 function mapDispatchToProps(dispatch){
    return  bindActionCreators({ fetchMessage : messageActions.fetchMessage}, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(ReadMessage));