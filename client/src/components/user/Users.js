import React, { Component } from 'react';
import ReactTable from "react-table";
import { CSVLink } from 'react-csv'; 
import 'react-table/react-table.css';
import {Link} from 'react-router-dom';


class Users extends Component{

    
    render(){
        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        const userList = this.props.state.users.map((user)=>{return user });
        const dataDownload = [];
        userList.map(user=>{
            dataDownload.push({
                Username:user.user_name,
                Gender:user.gender,
                Field: user.field_of_study,
                Affiliation: user.affiliation,
                Known_Languages: user.provided_languages.map(language=>{return language.language.short_name}),
                Learning_languages: user.provided_languages.map(language=>{return language.language.short_name}),
                Available: user.available,
                Registered:user.created_at.toString().split('T',1),
                Last_Login: user.updated_at.toString().split('T',1)            
            })
            return userList;
        })


        const columns = [{
            Header: 'View',
            accessor: 'id',
            Cell: row => (<Link to={ `/users/${row.value}`} className="btn btn-sm btn-primary">View</Link>)

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
            Header: 'Available',
            accessor: 'available',
            Cell: ({ value }) => String(value)
          },{
            Header: 'Registered',
            accessor: 'created_at',
            Cell:  row => (
                addZero(new Date(row.value).getMonth()+1) +"/"
                        +addZero(new Date(row.value).getDate())+"/"
                        +addZero(new Date(row.value).getFullYear())
            )
          },{
            Header: 'Last Update',
            accessor: 'updated_at',
            Cell:  row => (
                addZero(new Date(row.value).getMonth()+1) +"/"
                        +addZero(new Date(row.value).getDate())+"/"
                        +addZero(new Date(row.value).getFullYear())
            )
          }]


        return (
            <div>
                <nav className="nav nav-pills nav-fill mt-3">
                    <Link to={'/admin/dashboard'}  className="btn btn-outline-info nav-item nav-link" >
                        Stats
                    </Link>
                    <Link to={'/admin/users'}  className="btn btn-outline-info nav-item nav-link active" >
                        Users
                    </Link>
                    <Link to={'/admin/languages'}  className="btn btn-outline-info nav-item nav-link" >
                        Languages
                    </Link>
                 </nav>

                <div className="card mt-3">

                    <div className="text-left">
                        <CSVLink data={dataDownload} className="btn btn-success btn-sm" filename="report_tle_users.csv">Download CSV</CSVLink>
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