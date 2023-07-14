import { Component } from "react";
import Contactinfo from "./Contactinfo";

export default class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            contactData: [
                {name: "광개토대왕", phone: "010-1111-2222"},
                {name: "이순신장군", phone: "010-2222-3333"},
                {name: "세종대왕", phone: "010-3333-4444"},
            ]
        }
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        this.setState({
                keyword: e.target.value
        });
    }

    render() {

        const mapToComponent = (data) => {
            data.sort();
            data = data.filter(
                (contact) => {
                    return contact.name.toLowerCase()
                            .indexOf(this.state.keyword) > -1;
                } 
            )
            return data.map((contact, i) => {
                return (<Contactinfo contact = {contact} key={i}/>)                     
            });
        };

        return( 
            <div>   
                <h1>Contacts</h1>   
                <input type="text" 
                       name="keyword" 
                       placeholder="Search" 
                       value={this.state.keyword}
                       onChange={this.handleChange}
                       />
                {mapToComponent(this.state.contactData)}
            </div>                
        );  
    }
}
