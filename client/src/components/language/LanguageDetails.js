// import React, { Component } from 'react';
// import axios from 'axios';


// class LanguageDetails extends Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             details : ''
//         }
//     }

//     componentWillMount(){
//         this.getLanguage();
//     }

//     getLanguage(){
//         let languageId = this.props.match.params.id;
//         axios.get(`http://localhost:3000/api/languages/${languageId}`)
//         .then(response => {
//             this.setState({details: response.data})
//         })
//         .catch(err => console.log("There was an error fetching Language"));
//     }

//     render(){
//         let createdAt = (new Date(this.state.details.created_at)).toString();
//         let updatedAt = (new Date(this.state.details.updated_at)).toString();
//         return(
//             <div>
//                 <h1>{ this.state.details.name }</h1>
//                 <ul className="list-group">
//                     <li className="list-group-item"><b>Identifier:</b> { this.state.details.id } </li>
//                     <li className="list-group-item"><b>Date Created:</b> { createdAt } </li>
//                     <li className="list-group-item"><b>Date Updated:</b> { updatedAt} </li>
//                 </ul>
//             </div>
//         )      
//     }


// }

// export default LanguageDetails;