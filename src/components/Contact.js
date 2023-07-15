import { Component } from "react";
import Contactinfo from "./Contactinfo"; 
import ContactDetails from "./ContactDetails";
import update from "react-addons-update";
import ContactCreate from "./ContactCreate";

export default class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectKey: -1,
            keyword: '',
            contactData: [
                {name: "광개토대왕", phone: "010-1111-2222"},
                {name: "이순신장군", phone: "010-2222-3333"},
                {name: "세종대왕", phone: "010-3333-4444"},
                {name: "장영실", phone: "010-4444-5555"}
            ]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.handleCreate = this.handleCreate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleChange(e) {
        this.setState({
                keyword: e.target.value
        });
    }

    handleClick(key) {
        this.setState({
            selectKey: key
        });
        
        console.log(key, "is selected");
    }

    handleCreate(contact) {
        this.setState({
            contactData: update(this.state.contactData, { $push: [contact] })
        });
    }

    handleRemove() {
        if(this.state.selectKey < 0) {
            return;
        }
        this.setState({
            contactData: update(this.state.contactData,
                { $splice: [[this.state.selectKey, 1]] }
            ),
            selectKey: -1                     
        });
    }
    
    handleEdit(name, phone) {
        this.setState({
            contactData: update(this.state.contactData, 
                {
                    [this.state.selectKey]: {
                        name: { $set: name },
                        phone: { $set: phone }
                    }
                }
            )                
        });
    }

    render() {

        const mapToComponent = (data) => {
            data.sort();
            data = data.filter(
                ( contact) => {
                    return contact.name.toLowerCase()
                            .indexOf(this.state.keyword) > -1;
                } 
            )
            return data.map((contact, i) => {
                return (<Contactinfo 
                             contact = {contact} 
                             key={i}    
                             onClick={() => {this.handleClick(i)}}/>)                     
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

                <ContactDetails 
                    isSelected = {this.state.selectKey !== -1}
                    contact = {this.state.contactData[this.state.selectKey]}
                    onRemove = {this.handleRemove}
                    / > 

                <ContactCreate 
                    onCreate={this.handleCreate}
                />
            </div>                
        );  
    }
}
