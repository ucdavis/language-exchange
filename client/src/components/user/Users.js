import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Users extends Component{
    render(){
        
        const userList = this.props.state.users.map((user,i)=>{
            var created = new Date(user.created_at);
            var updated = new Date(user.updated_at);
            return (
                <tr key={ i } >
                    <th scope="row"> { i+1 } </th>
                    <td> <Link to={ `/users/${user.id}`}> { user.user_name } </Link> </td>
                    <td> { user.gender } </td>
                    <td> { user.provided_languages.map(language=>{
                                if(language.ability === 5){
                                    return  <div key={language.language.id}> {language.language.short_name}</div>
                                }else return null
                            })}
                    </td>
                    <td> { (created.getMonth()+1)+"/"+created.getDate()+"/"+created.getFullYear() } </td>  
                    <td> { (updated.getMonth()+1)+"/"+updated.getDate()+"/"+updated.getFullYear() } </td>  
                </tr>    
            )
        });
        

        return (
            <div>
                <div className="card">
                    <div className="card-header bg-dark text-white">
                        Users
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-sm table-hover">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Username</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Native</th>
                                <th scope="col">Registered</th>
                                <th scope="col">Last Login</th>   
                            </tr>
                            </thead>
                            <tbody>
                            { userList }
                            </tbody>
                            </table> 
                        </div>
                    </div>
                </div>
            </div>    
        )
    }
}

export default Users;