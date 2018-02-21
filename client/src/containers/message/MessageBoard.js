import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MessageForm from '../../components/message/MessageForm';
import * as messageActions from "../../actions/messageActions";
import React from 'react';
import { withRouter } from 'react-router-dom';
import  SentMessages  from "../../containers/message/SentMessages";
import  ReceivedMessages  from "../../containers/message/ReceivedMessages";

class CreateMessage extends React.Component {

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
    this.setState({display:<ReceivedMessages showView={this.showView }/>});
}





  submit = values => {
    // const casUser = "casUser";
    let now = new Date();
    const newMessage= {
        sender_id : 664,
        recipient_id : 663,
        subject : values.subject,
        content : values.content,
        updated_at : now,
        created_at : now
    }
   //this.props.createMessage(newMessage);
   console.log(newMessage);
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
            onClick={() => this.setState({display: <ReceivedMessages  showView={this.showView } /> })} >
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
    return { userState : state.userState }
 }
 
 function mapDispatchToProps(dispatch){
    return  bindActionCreators({ createMessage : messageActions.createMessage }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(CreateMessage));