import React, { Component } from 'react';
import { ListGroup } from "react-bootstrap";

class ChatListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.id,
            val : this.props.val
        }
    }

    componentDidMount() {
        this.setState({
        });
    }

    handleClick = () => {
        var va = this.state.val;
        var id = this.state.id;
        this.props.onClick(va,id);
    }

    render() {
        return (
            <ListGroup.Item action variant="dark" onClick={this.handleClick} >{this.props.val}</ListGroup.Item>
        );
    }
}

export default ChatListItem;