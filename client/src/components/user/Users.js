import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import ReactTable from "react-table";
import 'react-table/react-table.css';


class Users extends Component{

    
    render(){

        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }
        
        // const userList = this.props.state.users.map((user,i)=>{
        //     var created_at = new Date(user.created_at);
        //     var updated_at = new Date(user.updated_at);
        //     var created = addZero(created_at.getMonth()+1) +"/"
        //                 +addZero(created_at.getDate())+"/"
        //                 +addZero(created_at.getFullYear());
        //     var updated = addZero(updated_at.getMonth()+1) +"/"
        //                 +addZero(updated_at.getDate())+"/"
        //                 +addZero(updated_at.getFullYear());
                        
        //     return (
        //         <tr key={ i } >
        //             <th scope="row"> { i+1 } </th>
        //             <td> <Link to={ `/users/${user.id}`}> { user.user_name } </Link> </td>
        //             <td> { user.gender } </td>
        //             <td> { user.provided_languages.map(language=>{
        //                         if(language.ability === 5){
        //                             return  <div key={language.language.id}> {language.language.short_name}</div>
        //                         }else return null
        //                     })}
        //             </td>
        //             <td> { created } </td>  
        //             <td> { updated } </td>  
        //         </tr>    
        //     )
        // });

        const userList = this.props.state.users.map((user)=>{return user });
        // const data = [{
        //     name: 'Tanner Linsley',
        //     age: 26,
        //   },{
        //     name: 'Mia Wallace',
        //     age: 25,
        //   }
        // ];

        const columns = [{
            Header: 'Show',
            accessor: 'id',
            Cell: row => (<a href={ `/users/${row.value}`} className="btn btn-sm btn-primary"> Show</a>)

          },{
            Header: 'Username',
            accessor: 'user_name'
          }, {
            Header: 'Gender',
            accessor: 'gender',
          }, {
            Header: 'Known Lang.',
            accessor: 'provided_languages',
            Cell:  row => (
                row.value.map(language=>{ 
                        return(<div key={language.id}>{language.language.short_name}<br/></div>)
                })
            )
          },{
            Header: 'Learning Lang.',
            accessor: 'desired_languages',
            Cell:  row => (
                row.value.map(language=>{ 
                        return(<div key={language.id}>{language.language.short_name}<br/></div>)
                })
            )
          },{
            Header: 'Registered',
            accessor: 'created_at',
            Cell:  row => (
                addZero(new Date(row.value).getMonth()+1) +"/"
                        +addZero(new Date(row.value).getDate())+"/"
                        +addZero(new Date(row.value).getFullYear())
            )
          },{
            Header: 'Last Login',
            accessor: 'updated_at',
            Cell:  row => (
                addZero(new Date(row.value).getMonth()+1) +"/"
                        +addZero(new Date(row.value).getDate())+"/"
                        +addZero(new Date(row.value).getFullYear())
            )
          }]

        
        

        return (
            <div>
                <div className="card mt-3">
                    <div className="card-header bg-dark text-white">
                        Users
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">

                        <ReactTable
                            data={userList}
                            columns={columns}
                            className="-striped -highlight"
                            defaultSorted={[
                                {
                                  id: "created_at",
                                  desc: true
                                }
                              ]}
                        />
                        </div>
                    </div>
                </div>
            </div>    
        )
    }
}

export default Users;