import React, { Component } from 'react';

class SentMessages extends Component{

    render(){

        const sent_messages = this.props.state.sent_messages;
        let read_class = "list-group-item ";
        const messages = sent_messages.map( message=>{
            var created_at = new Date(message.created_at)
            var date = created_at.getMonth()+1 +"/"
                    +created_at.getDate()+"/"
                    +created_at.getFullYear();
            
            const read = message.read.toString();
            if(read === "false" ){
                read_class = "list-group-item  list-group-item-warning";               
            }

              return (
                <li className= {read_class} key={message.id} >
                    { message.subject }
                    &nbsp; { message.recipient.user_name }
                    &nbsp; { date }
                </li>
              )

          })

        return(
            <div>
                <h1>Sent</h1>
                
                <ul className="list-group">
                    { messages }
                </ul>
                    
            </div>
        )
    }
}     

export default SentMessages;