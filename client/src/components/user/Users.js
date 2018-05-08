import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Users extends Component{

    
    render(){

        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }
        
        const userList = this.props.state.users.map((user,i)=>{
            var created_at = new Date(user.created_at);
            var updated_at = new Date(user.updated_at);
            var created = addZero(created_at.getMonth()+1) +"/"
                        +addZero(created_at.getDate())+"/"
                        +addZero(created_at.getFullYear());
            var updated = addZero(updated_at.getMonth()+1) +"/"
                        +addZero(updated_at.getDate())+"/"
                        +addZero(updated_at.getFullYear());
                        
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
                    <td> { created } </td>  
                    <td> { updated } </td>  
                </tr>    
            )
        });
        

        return (
            <div>
                <div className="card mt-3">
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