import React, {Component} from 'react';  
import {connect} from 'react-redux';
import * as flashMessageActions from '../../actions/flashMessageActions';
import { bindActionCreators } from "redux";


class FlashMessage extends Component{

  render(){
    const {message, className} = this.props.flashMessage;
    if(!message){
      return null;
    }

    return (
      <div className="row">
        <div className="col-md-12 ">
          <div 
            className={'alert ' + className} 
            role="alert">
            {message}
            <button type="button" onClick={()=>this.props.sendFlashMessage(null)} className="close"  aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>

          </div>
          
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return  bindActionCreators({
      sendFlashMessage: flashMessageActions.sendFlashMessage
    }, dispatch)
}

const mapStateToProps = ({flashMessage}) => {  
  return {flashMessage};
};

export default connect(mapStateToProps,mapDispatchToProps)(FlashMessage);  