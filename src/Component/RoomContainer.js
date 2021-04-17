import React, { Component } from 'react';
import { Col,InputGroup,FormControl,ListGroup , Button } from "react-bootstrap";
import RoomPasswordModal from "./RoomPasswordModal";
import Example from './Example';

class RoomContainer extends Component {
    


    


    render() {
        return (
            <Col className="SideContainerLeft " >
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Type to search"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2" id="SearchInput" onChange={this.props.onChange}                />
                <InputGroup.Append>

                    {/* <Button variant="outline-secondary" onClick={this.addChatRoom.bind(this)}>Seach</Button> */}
                    <Button variant="outline-secondary" onClick={this.props.onSearchChatRooms}>Search</Button>
                    <Example onCreateRoom={this.props.onCreateRoom} />
                </InputGroup.Append>
            </InputGroup>
            <ListGroup>
                {
                    this.props.myState.itemsToDisplay.map(message =>
                        <RoomPasswordModal adminOverride={this.props.myState.adminOverride} onClick={this.props.onClick} key={message.id} id={message.id} val={message.text} pass={message.password} status={this.props.myState.dict[message.id]} />)
                }
            </ListGroup>
        </Col>

        );
    }
}

export default RoomContainer;