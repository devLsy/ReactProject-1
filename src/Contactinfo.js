import { Component } from "react";

export default class Contactinfo extends Component {
    render() {
        return (
            <div>{this.props.contact.name} {this.props.contact.phone}</div>                
        );
    }
}
