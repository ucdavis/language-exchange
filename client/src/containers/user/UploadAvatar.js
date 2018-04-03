import React from 'react'
import Dropzone from 'react-dropzone'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import * as flashMessageAction from "../../actions/flashMessageActions"
import { withRouter } from 'react-router-dom';
import * as userActions from '../../actions/userActions';

class UploadFile extends React.Component {
  constructor() {
    super();
    this.sendFile = this.sendFile.bind(this);;
    this.state = {
      files:[],
      accepted: [],
      rejected: [],
      id: null
    }
    
  }
    componentDidMount(){
      this.props.fetchCurrentUser();      
    }

    sendFile=(accepted, user_id)=>{
      console.log(accepted);
        return new Promise(function(resolve, reject) {

            var xhr = new XMLHttpRequest();
            var fd = new FormData();
            var file = accepted[0];

            const url = "http://localhost:3000/api/storages/images/upload";

            xhr.open("POST", url, true);
            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4 && xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                }
            };
            fd.append('file', file);
            xhr.send(fd);

            //update user after upload file
            const now = new Date();

           
            const avatarUserData= {
              id : user_id,
              avatar_file_name : file.name,
              avatar_content_type : file.type,
              avatar_file_size : file.size,
              avatar_updated_at : now,
              updated_at : now
          }
            console.log("Avatar data:",avatarUserData);

        });
    }

    onImageDrop(accepted, rejected ){
      this.setState({ accepted, rejected }); 
        if (accepted.length){
          const user_id = this.props.userState.current.id
          this.sendFile(accepted, user_id)
        }else{
          console.log("File was rejected");
        }
    }

    render() {
    

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
                maxSize = {1000000}
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

        </div>
      </div>
      </div>
      </div>
    </div>  
      );
    }
  }

  function mapStateToProps(state){
    return {  userState : state.userState,
              // flashMessage : state.flashMessage
            }
 }
 
 function mapDispatchToProps(dispatch){
    return  bindActionCreators({  fetchCurrentUser : userActions.fetchCurrentUser,
                                  uploadAvatar : userActions.uploadAvatar
                                  // sendFlashMessage : flashMessageAction.sendFlashMessage
                                }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(UploadFile));