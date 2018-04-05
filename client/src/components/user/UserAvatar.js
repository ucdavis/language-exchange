import React, {Component} from 'react';

class UserAvatar extends Component{

    render(){
        if(this.props.userState.fetching && this.props.userLanguageState.fetching ){
            return <p>Loading Image</p>
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