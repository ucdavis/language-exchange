import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UsersResult extends Component{

    render(){
        var count = 1;
        const userList = this.props.state.searchResult.map((user,i)=>{
            if( user.provided_languages.length > 0 && user.desired_languages.length > 0 ){
                return (
                    <tr key={ i } >
                        <th scope="row"> { count++ } </th>
                        <td> { user.user_name } </td>
                        <td> { user.gender } </td>
                        <td>
                                {user.provided_languages.map((provided,i)=>{
                                    return( <p key={i}>{provided.language.name}</p> )
                                    })
                                }
                        </td>
                        <td>
                                {user.desired_languages.map((desired,i)=>{
                                    return(  <p key={i}>{desired.language.name}</p> )
                                    })
                                }
                        </td> 
                        <td><Link to={ `/users/${user.id}`}>Show</Link> </td>
                        <td><Link to={ `/users/contact/${user.id}`}>Contact</Link> </td>
                    </tr>    
                )
            }
            return userList;
        })

        
        if( this.props.state.searchResult.length > 0 ){
            return (
                <div className="card border-info mt-3 mb-3">
                    <div className="card-header border-info text-white bg-info">
                        Search Result
                    </div>
                    <div className="card-body">    
                        <p>Some people currently available for contacting:</p>
                        <div className="table-responsive">
                            <table className="table  table-hover table-sm">
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
                </div>        
            )

        }else {
            return <div> </div>
        }
    }
}

export default UsersResult;