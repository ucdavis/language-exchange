import React, { Component } from 'react';
import MessageDetail from "../../components/message/MessageDetail";


class ReceivedMessages extends Component{

    componentDidMount() {
        this.props.fetchReceivedMessages(this.props.currentUser.id);
    }

    render(){

        let messages = null;
        const received_messages = this.props.messageState.received_messages;

        if (received_messages.length){
            messages = received_messages.map( message=>{
                console.log(message)

              return (
                    <tr key={message.id} >
                        <th scope="row">
                            <button
                                onClick={()=>this.props.showView(<MessageDetail
                                    message={message}
                                    showView={ this.props.showView }
                                    received={true}
                                    />)}
                                className="btn btn-secondary btn-sm">
                                    Read
                            </button>  
                        </th>
                        <td>{message.sender}</td>
                        <td>{message.subject}</td>
                        <td>{message.created_at.slice(0, 10)}</td>
                        
                    </tr>
              )
          })
        }

        return(        
            <div>
                <div className="row">
                    <div className="col-sm-12">
                            <h3 className="text-right">Inbox</h3>
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