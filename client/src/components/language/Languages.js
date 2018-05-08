import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Languages extends Component{
    render(){
        
        const languageItems = this.props.languages.map((language, i) => {
            return (

                 <tr key={i}>
                 <td>  <Link to={`/languages/${language.id}`} > { language.name }</Link> </td>
                 <td>  <Link to={`/languages/${language.id}`} > { language.short_name }</Link> </td>
                 <td>  <Link to={`/languages/edit/${language.id}`} className="btn btn-sm btn-success pull-right"> Edit </Link>   </td>
                </tr> 

            )
        })
      
        return (
            <div>

                <div className="card mt-3">
                <div className="card-header bg-dark text-white">
                    Languages
                </div>
                <div className="card-body">
                    <table className="table table-hover table-sm">
                        <thead>
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