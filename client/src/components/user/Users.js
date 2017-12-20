import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Languages extends Component{
    render(){
        return (
            <div>
                <h1>Users</h1>
                <Link to="/users/add">Add User</Link> 
            </div>    
        )
    }
}

export default Languages;