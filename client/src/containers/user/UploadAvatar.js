import React from 'react'
import Dropzone from 'react-dropzone'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import * as flashMessageAction from "../../actions/flashMessageActions"
import { withRouter, Redirect } from 'react-router-dom';
import * as userActions from '../../actions/userActions';

class UploadFile extends React.Component {
  constructor() {
    super();
    this.sendFile = this.sendFile.bind(this);;
    this.state = {
      files:[],
      accepted: [],
      rejected: [],
      redirect:false,
      preview : ""
    }
    
  }
    componentDidMount(){
      this.props.fetchCurrentUser();      
    }

    onImageDrop(accepted, rejected ){
      const fileToDelete = this.props.userState.current.avatar_file_name;
      this.setState({ accepted, rejected }); 
        if (accepted.length){
          const user_id = this.props.userState.current.id;
          this.sendFile(accepted, user_id, fileToDelete)
        }else{
          console.log("File was rejected");
        }
    }

    sendFile=(accepted, user_id, fileToDelete)=>{
      
      const setState = this.setState.bind(this);
      // const userState = this.props.userState;
      const saveUserAvatar = this.props.saveUserAvatar;
      saveUserAvatar(accepted, user_id, fileToDelete);
      const blob = accepted[0].preview;
      setState({
        preview : <div> <a href="/users/profile"className="btn btn-success">View Profile</a><br/><img src={blob}  alt="avatar"/></div>
      })
          // if(!userState.fetching){
          //   setState({ redirect: true });
          // }       
    }

    

    render() {
      const filePreview = this.state.preview;
      const {redirect} = this.state;
        if (redirect) {
          return <Redirect to='/users/profile' />;
        }else{

          return (
            <div className="container">
              <div className="row">
                <div className="col-sm-12">

                <div className="panel panel-default">
                <div className="panel-heading"><h4><span className="glyphicon glyphicon glyphicon-user" aria-hidden="true"></span>&nbsp;Profile Picture </h4></div>
                <div className="panel-body">

                <section>
                  <div className="dropzone">
                    <Dropzone
                        accept="image/jpg, image/jpeg, image/png"
                        multiple = {false}
                        maxSize = {1048576}
                        onDrop={ (accepted,rejected)=>                
                                this.onImageDrop(accepted, rejected)
                        }
                    >
                      <p className="text-center">Drop files here, or click to select files to upload.</p>
                    </Dropzone>
                  </div>
                  <br />
                  <aside>

                  <ul className="list-group">
                    {  this.state.accepted.map(f => <li className="list-group-item list-group-item-success" key={f.name}>{f.name} - {f.size} bytes</li>) }
                    { this.state.rejected.map(f => <li className="list-group-item list-group-item-danger" key={f.name}> {f.name} - {f.size } bytes</li>) }
                  </ul>
                </aside>
                </section>

                <div>
                   { filePreview }
                </div>

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
    return {  userState : state.userState,
              // flashMessage : state.flashMessage
            }
 }
 
 function mapDispatchToProps(dispatch){
    return  bindActionCreators({
      fetchCurrentUser : userActions.fetchCurrentUser,
      updateUserAvatar : userActions.updateUserAvatar,
      deleteUserAvatar : userActions.deleteUserAvatar,
      saveUserAvatar : userActions.saveUserAvatar
      // sendFlashMessage : flashMessageAction.sendFlashMessage
    }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(UploadFile));