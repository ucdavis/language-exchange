import React, { Component } from 'react';
import MessageDetail from "../../components/message/MessageDetail";


class ReceivedMessages extends Component{


    render(){

        let messages = null;
        const received_messages = this.props.messageState.received_messages;
        let read_class = "bg-default";
        if (received_messages.length){
            messages = received_messages.map( message=>{
            var created_at = new Date(message.created_at)
            var date = created_at.getMonth()+1 +"/"
                        +created_at.getDate()+"/"
                        +created_at.getFullYear();
                  

            const read = message.read.toString();
            if(read === "false" ){
                read_class = "bg-info";               
            }

              return (
                    <tr key={message.id} className={read_class}>
                        <th scope="row"  className={read_class}>{message.sender.user_name}</th>
                        <td className={read_class}>{message.subject}</td>
                        <td className={read_class}>{date}</td>
                        <td className={read_class}>
                            <button onClick={()=>this.props.showView(<MessageDetail message={message} sent={false} read={true}/>)} className="btn btn-default btn-sm">Read</button>  
                        </td>
                    </tr>
              )
          })
        }

        return(
            
            <div>
                <h1>Inbox</h1>
                <div className="table-responsive">
                <table className="table table-sm table-hover table-responsive">
                    <thead>
                        <tr>
                        <th scope="col">From</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Received</th>
                        <th scope="col">Read</th>
                        </tr>
                    </thead>
                    <tbody>{messages}</tbody>
                </table>
                    
            </div>
            </div>
        )
    }
}     

export default ReceivedMessages;