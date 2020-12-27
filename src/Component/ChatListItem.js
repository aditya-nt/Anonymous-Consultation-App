import React, { Component } from 'react';
import { ListGroup } from "react-bootstrap";

class ChatListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val : this.props.val
        }
    }

    componentDidMount() {
        this.setState({
        });
    }

    handleClick = () => {
        var va = this.state.val;
        this.props.onClick(va);
    }

    render() {
        return (
            <ListGroup.Item action variant="dark" onClick={this.handleClick} >{this.props.val}</ListGroup.Item>
        );
    }
}

export default ChatListItem;