import { Component } from "react";

export default class Contactinfo extends Component {
    render() {
        return (
            <div onClick={this.props.onClick}>
                {this.props.contact.name}
            </div>                
        );
    }
}
