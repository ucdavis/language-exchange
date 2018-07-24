import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import CreateMessage from "../../containers/message/CreateMessage";


class MessageDetail extends React.Component {
    state = {
        redirect: false,
        redirect_url : null
    }

    reply(sender_id){
        this.setState({
            redirect:true,
            redirect_url : `/users/contact/${sender_id}`
        });

    }

    render(){
        let button = null;
        let name = null;
        let label = null;
        let message = this.props.message;
        console.log(message);
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

                    var created_at = new Date(message.created_at)
                    var date = addZero(created_at.getMonth()+1) +"/"
                        +addZero(created_at.getDate())+"/"
                        +addZero(created_at.getFullYear())+" "
                        +addZero(created_at.getHours())+":"
                        +addZero(created_at.getMinutes());

                if(this.props.received){
                     button = (
                        <button
                            onClick={()=>this.props.showView(<CreateMessage originalMessage = { message }/>)}
                            className="btn btn-success"
                            type="button">
                                Reply
                        </button>);
                        label = "From";
                        name = message.sender;
                    }else{
                        label = "To";
                        name = message.recipient;
                    }
                

                    return(
                        <div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <h3 className="text-right">Message</h3>
                                    <div className="card">
                                        <div className="card-header">
                                        <label><strong>{label}: </strong></label>&nbsp;{ name }
                                        </div>
                                        <ul className="list-group">
                                        <li className="list-group-item">
                                            <label><strong> Recived: </strong></label> &nbsp;{ date }
                                        </li>
                                        <li className="list-group-item">
                                        <label><strong> Subject: </strong></label> &nbsp;
                                        { message.subject }
                                        </li>
                                        
                                            
                                        </ul>
                                        <div className="card-body">
                                            <h5 className="card-title">Message</h5>
                                            <p className="card-text">{ message.content }</p>
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


 export default withRouter( MessageDetail);

