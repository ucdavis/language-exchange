import React from 'react'
import Dropzone from 'react-dropzone'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from '../../actions/userActions';
import { withRouter, Redirect, Link } from 'react-router-dom';
import Img from 'react-image';

 
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

    onImageDrop(accepted, rejected ){
      const directory_exists = this.props.userState.directory_exists.toString();
      const user_id = this.props.userState.current.id;
      const createUserDirectoryAndSave = this.props.createUserDirectoryAndSave;
      const setState = this.setState.bind(this);
      let blob = null;


        if (accepted.length && directory_exists === "true"){
          blob = accepted[0].preview;
          this.sendFile(accepted, user_id);
          setState({
            preview : <div>
                        <Link to={'/users/profile'} className="btn btn-success">View Profile</Link>
                        <br/>
                        <Img src={blob} alt="avatar"/>
                      </div>
          , accepted, rejected }
          );

        }else if( directory_exists === "false"){
          blob = accepted[0].preview;
          createUserDirectoryAndSave(accepted,user_id);
          setState({
            preview : <div>
                        <a href="/users/profile" className="btn btn-success">View Profile</a>
                        <br/>
                        <Img src={blob} alt="avatar"/>
                      </div>
          , accepted, rejected }
          );

        }else{
          setState({
            preview : null,
            accepted,
            rejected
          });
        }
    }

    sendFile=(accepted, user_id)=>{
      const saveUserAvatar = this.props.saveUserAvatar;
      saveUserAvatar(accepted, user_id);
    }

   
    render() {
      let loading = '/api/storages/images/download/loading.gif';
      let authUser = this.props.userState.current;
      if(!authUser){
        return <Redirect to='/' />
      }

      const filePreview = this.state.preview;
      const {redirect} = this.state;
      
        if (redirect) {
          return <Redirect to='/users/profile' />;
        }else if ( this.props.userState.fetching ){
          return(
            <div>
                <div className="card mt-3">
                    <div className="card-body text-center">
                        <Img src={ loading } />
                    </div>
                </div>
            </div>
        )
        }else{

          return (
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <aside>
                      <ul className="list-group">
                        {  this.state.accepted.map(f => <li className="list-group-item list-group-item-success" key={f.name}>Avatar Uploaded!</li>) }
                        { this.state.rejected.map(f => <li className="list-group-item list-group-item-danger" key={f.name}> Wrong file format or size - {f.size } bytes</li>) }
                      </ul>
                    </aside>
                    <div className="card mt-3">
                      <div className="card-header bg-dark text-white">
                          My Profile
                      </div>
                      <div className="card-body">

                          <h4 className="card-tittle">&nbsp;Profile Picture </h4>
                              <section>
                                <div className="dropzone" >
                                  <Dropzone
                                      accept="image/jpg, image/jpeg, image/png"
                                      multiple = {false}
                                      maxSize = {1048576}
                                      onDrop={ (accepted,rejected)=>                
                                              this.onImageDrop(accepted, rejected)
                                      } >
                                    <br/>  
                                    <p className="text-center">Drop files here, or click to select files to upload.</p>
                                    <p className="text-center">Max file size: 1MB</p>
                                    <p className="text-center">Formats: JPG and PNG</p>
                                  </Dropzone>
                                </div>
                              </section>
                              <br />

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
            }
 }
 
 function mapDispatchToProps(dispatch){
    return  bindActionCreators({
      saveUserAvatar : userActions.saveUserAvatar,
      createUserDirectoryAndSave : userActions.createUserDirectoryAndSave,    
    }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(UploadFile));