import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as messageActions from "../../actions/messageActions";
import React from 'react';
import { withRouter } from 'react-router-dom';
import  SentMessages  from "../../containers/message/SentMessages";
import  ReceivedMessages  from "../../containers/message/ReceivedMessages";

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

  
  render() {

    return (
    
        <div className="row">
          <div className="col-sm-2">
                <div className="side-bar">
                  <div className="btn-group-vertical" role="group" aria-label="Vertical button group">
                  
                      <button
                        type="button"
                        className="btn btn-default"
                        onClick={() => this.setState({
                          display: <ReceivedMessages
                            showView={this.showView }
                            userState = {this.props.userState}
                            messageState = {this.props.messageState} />
                        })} >
                        &nbsp;Inbox&nbsp;
                      </button>

                      <button
                        type="button"
                        className="btn btn-default"
                        onClick={() => this.setState({
                          display:<SentMessages
                          showView={this.showView }
                          userState = {this.props.userState}
                          messageState = {this.props.messageState}
                        />})} >
                        &nbsp;Sent&nbsp;
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