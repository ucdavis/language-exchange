import React, { Component } from 'react';
import MessageDetail from "../../components/message/MessageDetail";


class ReceivedMessages extends Component{

    componentDidMount() {
        this.props.fetchReceivedMessages(this.props.currentUser.id);
    }

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
                read_class = "bg-default";               
            }

              return (
                    <tr key={message.id} className={read_class}>
                        <th scope="row"  className={read_class}>
                            <button
                                onClick={()=>this.props.showView(<MessageDetail message={message}
                                showView={ this.props.showView }
                                sent={false}
                                read={true}/>)}
                                className="btn btn-secondary btn-sm">
                                    Read
                            </button>  
                        </th>
                        <td className={read_class}>{message.sender.user_name}</td>
                        <td className={read_class}>{message.subject}</td>
                        <td className={read_class}>{date}</td>
                        
                    </tr>
              )
          })
        }

        return(        
            <div>
                <div className="row">
                    <div className="col-sm-12">
                            <h3>Inbox</h3>
                            <div className="card border-secondary">
                            <div className="table-responsive">
                                <table className="table table-sm">
                                    <thead className="thead-light">
                                        <tr>
                                        <th scope="col">Read</th>
                                        <th scope="col">From</th>
                                        <th scope="col">Subject</th>
                                        <th scope="col">Received</th>
                                        </tr>
                                    </thead>
                                    <tbody>{messages}</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}     

export default ReceivedMessages;