import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as messageActions from "../../actions/messageActions";
import React from 'react';
import { withRouter } from 'react-router-dom';


class MessageDetail extends React.Component {

    componentDidMount(){
        var id = this.props.id;
        this.props.fetchMessage(id);
      }

    render(){
        let message = this.props.messageState.message;
        
           
        return(
            <div>
                 <h1>Inbox</h1>
                <ul className="list-group">
                    <li className="list-group-item">
                       <label> Subject: </label> &nbsp; { message.subject }</li>
                    <li className="list-group-item">
                        <label> Sent: </label> &nbsp; { new Date( message.created_at).toString()}</li>               
                </ul>
                
                <ul className="list-group">
                    <li className="list-group-item">
                        <label> Messge: </label> &nbsp; { message.content}
                    </li>
                
                 </ul>
            </div>

        )
    }

}

function mapStateToProps(state){
    return { messageState : state.messageState }
 }
 
 function mapDispatchToProps(dispatch){
    return  bindActionCreators({ fetchMessage : messageActions.fetchMessage }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(MessageDetail));

