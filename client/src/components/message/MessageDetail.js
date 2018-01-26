import React, { Component } from 'react';

class MessageDetail extends Component{

    render(){
        const message = this.props.state;
        console.log("message detail props", message)
        
        
            
        return(
            <div>
                <ul className="list-group">
                    <li className="list-group-item">
                       <label> Subject: </label> &nbsp; { message.message.subject }</li>
                    <li className="list-group-item">
                        <label> Sent: </label> &nbsp; { new Date( message.message.created_at).toString()}</li>               
                </ul>
                
                <ul className="list-group">
                    <li className="list-group-item">
                        <label> Messge: </label> &nbsp; { message.message.content}
                    </li>
                
                 </ul>
            </div>

        )
    }

}     

export default MessageDetail;