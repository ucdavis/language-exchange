import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as messageActions from "../../actions/messageActions";
import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import CreateMessage from "../../containers/message/CreateMessage";


class MessageDetail extends React.Component {
    state = {
        redirect: false,
        redirect_url : null
    }


    componentDidMount(){
        if(this.props.sent===false){
            let now = new Date();
            const messageData = {
                id : this.props.message.id,
                content : this.props.message.content,
                sender_id : this.props.message.sender_id,
                recipient_id : this.props.message.recipient_id,
                subject : this.props.message.subject,
                read : true,
                updated_at : now,
                created_at : this.props.message.created_at
            }
            this.props.updatedMessage(messageData);
        }
    }  

    reply(sender_id){
        this.setState({
            redirect:true,
            redirect_url : `/users/contact/${sender_id}`
        });

    }

    render(){
        let button = null;
        let sender = null;
        let label = null;
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

                    var created_at = new Date(this.props.message.created_at)
                    var date = addZero(created_at.getMonth()+1) +"/"
                        +addZero(created_at.getDate())+"/"
                        +addZero(created_at.getFullYear())+" "
                        +addZero(created_at.getHours())+":"
                        +addZero(created_at.getMinutes());

                if(this.props.sent===false){
                     button = (
                        <button
                            onClick={()=>this.props.showView(<CreateMessage recipient = { this.props.message.sender }/>)}
                            className="btn btn-success"
                            type="button">
                                Reply
                        </button>);
                     sender = this.props.message.sender.user_name;
                     label = "From";

                    }else{
                        sender = this.props.message.recipient.user_name;
                        label = "To";
                    }
                

                    return(
                        <div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <h3>Message</h3>
                                    <div className="card">
                                        <div className="card-header">
                                            { this.props.message.subject }
                                        </div>
                                        <ul className="list-group">
                                            <li className="list-group-item">
                                                <label><strong>{label}: </strong></label>&nbsp;{ sender }
                                            </li>
                                        
                                            <li className="list-group-item">
                                            <label><strong> Recived: </strong></label> &nbsp;{ date }
                                            </li>
                                        </ul>
                                        <div className="card-body">
                                            <h5 className="card-title">Message</h5>
                                            <p className="card-text">{ this.props.message.content }</p>
                                        </div>
                                        <div className="card-footer text-center">
                                            {button}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );

            }


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

