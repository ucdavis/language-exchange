import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class UsersResult extends Component{

    render(){

        // const provided = this.props.state.provided;
        // const desired =this.props.state.desired;


        const userList = this.props.state.searchResult.map((user,i)=>{
                return (
                    <tr key={ i } >
                        <th scope="row"> { i+1 } </th>
                        <td> { user.user_name } </td>
                        <td> { user.gender } </td>
                        <td>
                                {user.provided_languages.map((provided,i)=>{
                                    return( <p key={i}>{provided.languages.name}</p> )
                                    })
                                }
                        </td>
                        <td>
                                {user.desired_languages.map((desired,i)=>{
                                    return(  <p key={i}>{desired.languages.name}</p> )
                                    })
                                }
                        </td> 
                        <td><Link to={ `/users/${user.id}`}>Show</Link> </td>
                        <td>Contact</td>
                    </tr>    
                )

        })

        return (
            <div>
                <h4>Users</h4>
                <div className="table-responsive">
                <table className="table table-responsive table-hover table-sm">
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