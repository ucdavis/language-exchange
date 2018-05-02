import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as messageActions from "../../actions/messageActions";
import React from 'react';
import { withRouter } from 'react-router-dom';
import SentMessages  from "../../containers/message/SentMessages";
import ReceivedMessages  from "../../containers/message/ReceivedMessages";

class MessageBoard extends React.Component {

  constructor(props){
    super(props);
    this.showView = this.showView.bind(this);
    this.state = {
      display : null
    }
  }

  showView = (view)=>{
    this.setState({ display:view });
  }

  toggleSentButton=()=> {
    var sentButton= document.getElementById("sentButton");
    var inboxButton= document.getElementById("inboxButton");
    if (sentButton.className === "btn btn-outline-info") {
      sentButton.className = "btn btn-info";
      inboxButton.className = "btn btn-outline-info";
    }else if(sentButton.className ===  "btn btn-info"){
      sentButton.className =  "btn btn-info"
    } else {
      sentButton.className = "btn btn-outline-info";
    }
  }

  toggleInboxButton=()=> {
    var inboxButton= document.getElementById("inboxButton");
    var sentButton = document.getElementById("sentButton");
    if (inboxButton.className === "btn btn-outline-info") {
      inboxButton.className = "btn btn-info";
      sentButton.className = "btn btn-outline-info";
    }else if(inboxButton.className ===  "btn btn-info"){
      inboxButton.className =  "btn btn-info"
    } else {
      inboxButton.className = "btn btn-outline-info";
    }
  }

  componentDidMount(){
    if (this.props.userState.current){
      this.props.fetchReceivedMessages(this.props.userState.current.id);
      this.props.fetchSentMessages(this.props.userState.current.id);
      this.setState({
        display:<ReceivedMessages
                  showView={this.showView }
                  userState = {this.props.userState}
                />
      });
    }

}

showInbox= () => {
  this.setState({
    display: <ReceivedMessages
      showView={this.showView }
      userState = {this.props.userState}
      messageState = {this.props.messageState} />
  });
    
    this.toggleInboxButton();
  }

showSent = () => {
  this.setState({
    display:<SentMessages
    showView={this.showView }
    userState = {this.props.userState}
    messageState = {this.props.messageState}
  />});
    this.toggleSentButton();
  }

  
  render() {

    return (
    
        <div>
          
           <div className="row">
            <div className="col-sm-12">
              <div className="side-bar text-right">
                <div className="btn-group" role="group" aria-label="button group">
                  <button
                    type="button"
                    id = "inboxButton"
                    className="btn btn-info"
                    onClick={this.showInbox} >
                    &nbsp;Inbox&nbsp;
                  </button>

                  <button
                    type="button"
                    id = "sentButton"
                    className="btn btn-outline-info"
                    onClick={this.showSent} >
                    &nbsp;Sent&nbsp;
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="border border-info border-left-0 border-right-0 border-bottom-0">
                { this.state.display }
              </div>
            </div>
          </div>

        </div>
    
    )
  }
}

function mapStateToProps(state){
    return { userState : state.userState, messageState : state.messageState }
 }
 
 function mapDispatchToProps(dispatch){
    return  bindActionCreators({
      createMessage : messageActions.createMessage,
      fetchReceivedMessages : messageActions.fetchReceivedMessages,
      fetchSentMessages : messageActions.fetchSentMessages
    }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(MessageBoard));