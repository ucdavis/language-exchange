import React, {Component} from 'react';
import Img from 'react-image';
import loading from '../../assets/images/loading.gif';

class UserAvatar extends Component{

    render(){

        if(this.props.userState.fetching && this.props.userLanguageState.fetching ){
            return (
                <div>
                    <div className="card mt-3">
                        <div className="card-body text-center">
                            <Img src={ loading } />
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                { this.props.userImage } 
                </div> 
            )
        }
    }
}

export default UserAvatar;