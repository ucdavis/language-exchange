import React, { Component } from 'react';
import { Link } from "react-router-dom";


class ReceivedMessages extends Component{

    render(){

        const received_messages = this.props.state.received_messages;
        let read_class = "list-group-item ";
        const messages = received_messages.map( message=>{
            var created_at = new Date(message.created_at)
            var date = created_at.getMonth()+1 +"/"
                    +created_at.getDate()+"/"
                    +created_at.getFullYear();
                    var linkToMessage = `/message/read/${message.id}`

            const read = message.read.toString();
            if(read === "false" ){
                read_class = "list-group-item  list-group-item-info";               
            }

              return (
                <li className={read_class}  key={message.id}>
               
                   <Link to={ linkToMessage } >Read</Link>
                    &nbsp; { message.subject }
                    &nbsp; { message.sender.user_name }
                    &nbsp; { date }

                </li>
              )
          })

        return(
            
            <div>
                <h1>Inbox</h1>

                <ul className="list-group">
                    { messages }
                </ul>
                    
            </div>
        )
    }
}     

export default ReceivedMessages;