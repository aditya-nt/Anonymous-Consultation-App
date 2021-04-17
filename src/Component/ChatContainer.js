import React, { Component } from 'react';
import { Col, Button, InputGroup, FormControl, Alert } from "react-bootstrap";


class ChatContainer extends Component {
    constructor(props) {
        super(props);
        // this.state = this.props.myState;
        this.addChatMessage = this.addChatMessage.bind(this);
    }


    addChatMessage() {
        // console.log(this.ChatMessageInput.value);
        // this.props.myState.addChat(this.ChatMessageInput.value);

        if (document.getElementById("myText").value !== "") {
            this.props.onClick(this.ChatMessageInput.value);
            document.getElementById("myText").value = "";
        }

    }

    render() {
        return (
            //    <h1 onClick={this.gg}>{"ddd"+this.props.myState.current_id}</h1>
            <Col className="ChatContainer" md={8} style={{ "overflow": "hidden" }}>
                <div className="ChatSpace">

                    <ul>

                        {
                            this.props.myState.chatMessages.map(chatMessage => {
                                var class_name = (chatMessage.Sender === this.props.myState.chatRoomName) ? "rightL" : "leftL";
                                var variant = (chatMessage.Sender === this.props.myState.chatRoomName) ? "dark" : "primary";

                                return <li key={chatMessage.id} className={class_name}>
                                    <Alert variant={variant} style={{ paddingTop: "5px", paddingBottom: "5px", display: 'inline-block' }}>
                                        {chatMessage.ChatText}
                                    </Alert>
                                </li>
                            })
                        }
                        <li  >
                            <Alert variant="success" style={{ textAlign: "center" }}>
                                Happy Chatting!!
                               </Alert>
                        </li>
                    </ul>
                </div>


                <div className="input-container">
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder={this.props.myState.chatRoomName + " : Type your message"}
                            aria-label="Recipient's username" id="myText"
                            aria-describedby="basic-addon2" ref={el => this.ChatMessageInput = el}
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary" onClick={this.addChatMessage}>Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>

            </Col>
        );
    }
}

export default ChatContainer;