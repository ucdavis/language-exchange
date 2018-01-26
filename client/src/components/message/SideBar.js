import React, { Component } from 'react';


class MessageSideBar extends Component{

    render(){

        return(
            <div>
                <div>
                <ul className="list-group">
                    <li className="list-group-item list-group-item-info">
                    Messages
                    </li>
                    <li className="list-group-item justify-content-between">
                    <a href="#" >Inbox</a>
                    <span className="badge badge-default badge-pill">1</span>
                    </li>
                    <li className="list-group-item justify-content-between">
                    <a href="#" >Sent</a>
                    </li>
                </ul>  
                </div>
            </div>
        )
    }

}     

export default MessageSideBar;