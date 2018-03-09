import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as messageActions from "../../actions/messageActions";
import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';


class MessageDetail extends React.Component {
    state = {
        redirect: false,
        redirect_url : null
    }


    componentDidMount(){
        var message_id = this.props.message.id;
        this.props.fetchMessage(message_id);

      }

    // readMessage(){
    //     let now = new Date();
    //     const messageData = {
    //         content : this.props.message.content,
    //         sender_id : this.props.message.sender_id,
    //         recipient_id : this.props.message.recipient_id,
    //         subject : this.props.message.subject,
    //         read : 1,
    //         updated_at : now,
    //         created_at : this.props.message.created_at
    //     }
    //     console.log("update this message:",messageData);
    // }  

    reply(sender_id){
        this.setState({
            redirect:true,
            redirect_url : `/users/contact/${sender_id}`
        });

    }

    render(){
        let button = null;
        let messages = null;
        const {redirect,redirect_url} = this.state;
        if(redirect&&redirect_url){
            return <Redirect to={redirect_url}  />;
        }else{
            function addZero(i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }

                 messages = this.props.messageState.message.map(message=>{
                    var created_at = new Date(message.created_at)
                    var date = addZero(created_at.getMonth()+1) +"/"
                        +addZero(created_at.getDate())+"/"
                        +addZero(created_at.getFullYear())+" "
                        +addZero(created_at.getHours())+":"
                        +addZero(created_at.getMinutes());

                if(this.props.sent===false){
                     button = (<button onClick={()=>this.reply(`${message.sender_id}`)} className="btn btn-success" type="button">Reply</button>)
                    }
                

                    return(
                        <div key={message.id} >
                        <ul className="list-group">
                            <li className="list-group-item">
                                <label> From: </label>&nbsp;{ message.sender.user_name }
                            </li>
                        
                            <li className="list-group-item">
                                <label> Recived: </label> &nbsp;{ date }
                            </li>  

                            <li className="list-group-item">
                                <label> Subject: </label>&nbsp;{ message.subject }
                            </li>            
                        </ul>
                        
                        <ul className="list-group">
                            <li className="list-group-item">
                                <label> Message: </label> &nbsp; { message.content }
                            </li>
                        </ul>
                        {button}
                        </div>
                    );
                })
            }


        return(
            <div>
                 <h2>Message</h2>

                {messages}
            </div>

        )
    }

}

function mapStateToProps(state){
    return { messageState : state.messageState }
 }
 
 function mapDispatchToProps(dispatch){
    return  bindActionCreators({
        fetchMessage : messageActions.fetchMessage,
        updatedMessage : messageActions.updateMessage }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(MessageDetail));

