import React, { Component } from 'react';
import MessageDetail from "../../components/message/MessageDetail";


class SentMessages extends Component{
    componentDidMount() {
        this.props.fetchSentMessages(this.props.currentUser.id)
    }

    render(){

        let messages = null;
        const sent_messages = this.props.messageState.sent_messages;

        if (sent_messages.length){
            messages = sent_messages.map( message=>{
            var created_at = new Date(message.created_at)
            var date = created_at.getMonth()+1 +"/"
                        +created_at.getDate()+"/"
                        +created_at.getFullYear();

              return (
               
                    <tr key={message.id}>
                    <th scope="row">
                            <button onClick={
                                ()=>this.props.showView(<MessageDetail
                                    message={message}
                                    received={false}
                                    />)
                                } className="btn btn-secondary btn-sm">Read</button>  
                        </th>
                        <td>{message.recipient}</td>
                        <td>{message.subject}</td>
                        <td>{date}</td>
                    </tr>
                
              )
          })
        }

        return(
            
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <h3 className="text-right">Sent messages</h3>
                        <div className="card border-secondary">
                        <div className="table-responsive">
                            <table className="table table-sm">
                                <thead className="thead-light">
                                    <tr>
                                    <th scope="col">Read</th>
                                    <th scope="col">To</th>
                                    <th scope="col">Subject</th>
                                    <th scope="col">Sent</th>
                                    
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

export default SentMessages;