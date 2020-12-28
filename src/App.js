import React, { Component } from 'react';
import { Row, Col, Card, ListGroup, Button, InputGroup, FormControl, Alert } from "react-bootstrap";
import RoomPasswordModal from "./Component/RoomPasswordModal";
import Example from './Component/Example';
import fire from './firebase';
import TitleHeader from "./Component/TitleHeader";
// import ChatInput from "./Component/ChatInput";
import "./App.css";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            chatMessages: [],
            chatRoomName: "Unlock this chat",
            current_id: 0,
        };
        // <- set up react state
        this.handleClick = this.handleClick.bind(this);
        this.getChatMessages = this.getChatMessages.bind(this);
        this.addMessage = this.addMessage.bind(this);
    }




    componentDidMount() {
        /* Create reference to messages in Firebase Database */

        fire.firestore().collection("Questions")
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(function (doc) {
                    const eventData = {
                        id: doc.id,
                        text: doc.data().roomName,
                        password : doc.data().roomPassword
                    }

                    return eventData
                })

                this.setState({ messages: data }); // array of cities objects
            });

    }

    // addChatRoom(e){
    //     console.log(4);
    //     // return <Example/>
    // }

    addMessage(roomName,roomPassword) {
        // e.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the message to Firebase */
        fire.database().ref('messages').push(this.ChatMessageInput.value);
        fire.firestore().collection('Questions').add({
            roomName: roomName,
            roomPassword : roomPassword,
            timestamp: new Date(Date.now())
        });

    }

    addChat(e) {
        e.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the message to Firebase */
        // fire.database().ref('messages').push(this.ChatMessageInput.value);
        var path = 'Questions/' + this.state.current_id + '/Chat';
        fire.firestore().collection(path).add({
            Sender: this.state.chatRoomName,
            ChatText: this.ChatMessageInput.value,
            timestamp: new Date(Date.now())
        });
        this.ChatMessageInput.value = ''; // <- clear the input
    }

    handleChange = (no, id) => {
        this.setState({
            chatRoomName: no,
            current_id: id
        });
    }


    handleClick = async (no, id) => {
        await this.handleChange(no, id);
        this.getChatMessages();
    }



    getChatMessages() {

        var path = 'Questions/' + this.state.current_id + '/Chat';


        fire.firestore().collection(path).orderBy("timestamp", "desc")//.limit(7)
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(function (doc) {
                    const eventData = {
                        id: doc.id,
                        Sender: doc.data().Sender,
                        ChatText: doc.data().ChatText,
                        timestamp: doc.data().timestamp
                    }

                    return eventData
                })

                this.setState({ chatMessages: data }); // array of cities objects
            });

    }


    render() {
        return (
            <div className="container" style={{ "height": "100%" }}>
                <Card style={{ "overflow": "hidden", "height": "700px", "borderRadius": "10px", "padding": "20px", "backgroundColor": "#2A2F32", "color": "white", "margin": "20px" }}>
                    <TitleHeader extra={this.state.chatRoomName}></TitleHeader>

                    <Row style={{ "height": "100%" }}>
                        <Col className="SideContainerLeft" >
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Type to search"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2" ref={el => this.ChatRoomInput = el}
                                />
                                <InputGroup.Append>

                                    {/* <Button variant="outline-secondary" onClick={this.addChatRoom.bind(this)}>Seach</Button> */}
                                    <Button variant="outline-secondary">Search</Button>
                                    <Example onCreateRoom={this.addMessage}/>
                                </InputGroup.Append>
                            </InputGroup>
                            <ListGroup>
                                {
                                    this.state.messages.map(message =>
                                        <RoomPasswordModal onClick={this.handleClick} id={message.id} val={message.text} pass={message.password}/>)
                                }
                            </ListGroup>
                        </Col>

                        <Col className="SideContainerRight" xs={8} style={{ "overflow": "hidden" }}>
                            <div className="ChatSpace">
                                {/* <Example chat_id={this.state.chatRoomName} /> */}

                                <ul>
                                    
                                    {
                                        this.state.chatMessages.map(chatMessage => {
                                            var class_name = (chatMessage.Sender === this.state.chatRoomName) ? "rightL" : "leftL";
                                            var variant = (chatMessage.Sender === this.state.chatRoomName) ? "dark" : "primary";

                                            return <li className={class_name}>
                                                <Alert variant={variant} style={{ paddingTop: "5px", paddingBottom: "5px", display: 'inline-block' }}>
                                                    {chatMessage.ChatText}
                                                </Alert>
                                            </li>
                                        })
                                    }
                                    <li  >
                                        <Alert variant="success">
                                            Happy Chatting!!
                                                </Alert>
                                    </li>
                                </ul>
                            </div>

                            {/* <ChatInput/> */}

                            <div className="input-container">
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder={this.state.chatRoomName+" : Type your message"}
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2" ref={el => this.ChatMessageInput = el}
                                    />
                                    <InputGroup.Append>
                                        <Button variant="outline-secondary" onClick={this.addChat.bind(this)}>Send</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>

                        </Col>
                    </Row>
                </Card>
            </div >

        );
    }
}

export default App;