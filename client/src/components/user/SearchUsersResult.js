import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class UsersResult extends Component{
    render(){
        
        const userList = this.props.state.searchResult.map((user,i)=>{
            return (
                <tr key={ i } >
                    <th scope="row"> { i+1 } </th>
                    <td> { user.user_name } </td>
                    <td> { user.gender } </td>
                    <td> Speaks</td>
                    <td> Learning </td> 
                    <td><Link to={ `/users/${user.id}`}> Show </Link> </td>
                    <td> Contact </td>
                </tr>    
            )
        });

        return (
            <div>
                <h1>Users</h1>
                <Link to="/users/add">Add User</Link>
                <div className="table-responsive">
                <table className="table table-responsive table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Speaks</th>
                    <th scope="col">Learning</th>
                    <th scope="col">Show</th>
                    <th scope="col">Contact</th>
 
                </tr>
                </thead>
                <tbody>
                 { userList }
                </tbody>
                </table> 
                </div>
            </div>    
        )
    }
}

export default UsersResult;