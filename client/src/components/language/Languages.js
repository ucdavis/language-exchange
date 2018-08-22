import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Languages extends Component{
    render(){
        
        const languageItems = this.props.languages.map((language, i) => {
            return (

                 <tr key={i}>
                 <td>  <Link to={`/admin/languages/${language.id}`} > { language.name }</Link> </td>
                 <td>  <Link to={`/admin/languages/${language.id}`} > { language.short_name }</Link> </td>
                 <td>  <Link to={`/admin/languages/edit/${language.id}`} className="btn btn-sm btn-success pull-right"> Edit </Link>   </td>
                </tr> 

            )
        })
      
        return (
            <div>
            <nav className="nav nav-pills nav-fill mt-3">
                <Link to={'/admin/dashboard'}  className="btn btn-outline-info nav-item nav-link" >
                    Stats
                </Link>
                <Link to={'/admin/users'}  className="btn btn-outline-info nav-item nav-link" >
                    Users
                </Link>
                <Link to={'/admin/languages'}  className="btn btn-outline-info nav-item nav-link active" >
                    Languages
                </Link>
            </nav>

                <div className="card mt-3">

                    <div className="card-body">
                        <table className="table table-hover table-sm">
                            <thead className="bg-light">
                            <tr><th>Language</th><th>Short Name</th><th>Edit</th></tr>
                            </thead>
                            <tbody>
                            { languageItems }
                            </tbody>      
                        </table>
                    </div>    
                </div>    
            </div>    
        )
    }
}

export default Languages;