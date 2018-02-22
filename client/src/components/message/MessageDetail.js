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

        
        let messages = this.props.messageState.message.map(message=>{
            var created_at = new Date(message.created_at)
            var date = created_at.getMonth()+1 +"/"
                +created_at.getDate()+"/"
                +created_at.getFullYear();

            return(
                <div key={message.id} >
                <ul className="list-group">
                    <li className="list-group-item">
                       <label> From: </label>&nbsp;{ message.sender.user_name }
                    </li>
                   
                    <li className="list-group-item">
                        <label> Recived: </label> &nbsp;{ date }
                    </li>  

                     <li className="list-group-item">
                       <label> Subject: </label>&nbsp;{ message.subject }
                    </li>            
                </ul>
                
                <ul className="list-group">
                    <li className="list-group-item">
                        <label> Message: </label> &nbsp; { message.content }
                    </li>
                
                 </ul>
                 </div>
            );
        })


        return(
            <div>
                 <h1>Inbox</h1>

                {messages}
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

