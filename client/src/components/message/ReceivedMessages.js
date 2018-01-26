import React, { Component } from 'react';


class ReceivedMessages extends Component{

    render(){

        const received_messages = this.props.state.received_messages;
        let read_class = "list-group-item ";
        const messages = received_messages.map( message=>{
            var created_at = new Date(message.created_at)
            var date = created_at.getMonth()+1 +"/"
                    +created_at.getDate()+"/"
                    +created_at.getFullYear();

            const read = message.read.toString();
            if(read === "false" ){
                read_class = "list-group-item  list-group-item-info";               
            }

              return (
                <li className={read_class}  key={message.id}>
                <button className="btn btn-default btn-xs"
                  onClick={this.props.handler} >Read</button>
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