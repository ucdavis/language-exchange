import React, { Component } from 'react';

class LanguageSelection extends Component{


    render(){


        const languageItems = this.props.languages.map((language, i) => {
            return(
            <tr key={ i } >
                    <th scope="row"> { language.name } </th>
                    <td> 
                    <select name="ability">
                        <option />
                        <option value="5">Native Speaker</option>
                        <option value="4">Superior</option>
                        <option value="3">Advanced</option>
                        <option value="2">Intermediate</option>
                        <option value="1">Elementary</option>
                        
                    </select>
                    </td>

                </tr>
            )  
        });

        // const languageAbility = this.props.state.desiredLanguages.map((language, i) => {
        //     return(
        //     <div className="form-group"  key={language.id}>
        //             <label>Ability</label>
        //             <select>
        //                 <option />
        //                 {language.ability}
        //             </select>
        //         </div> 
        //     )
        // })


        return (
            <div className="row">
                <h4>My Languages</h4>
                <div className="table-responsive">
                    <table className="table table-responsive table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Language</th>
                        <th scope="col">Languages you know</th>
                        <th scope="col">Language you are learning</th>
                    </tr>
                    </thead>
                    <tbody>
                        {languageItems }    
                    </tbody>
                    </table> 
                </div>
            </div>    
        )
    }
}

export default LanguageSelection;