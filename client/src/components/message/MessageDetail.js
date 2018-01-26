import React, { Component } from 'react';

class MessageDetail extends Component{

    render(){
        let message = this.props.message;
        
           
        return(
            <div>
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

export default MessageDetail;