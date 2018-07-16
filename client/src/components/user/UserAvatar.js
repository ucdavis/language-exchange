import React, {Component} from 'react';
import Img from 'react-image';

class UserAvatar extends Component{

    render(){
        let loading = '/api/storages/images/download/loading.gif';
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