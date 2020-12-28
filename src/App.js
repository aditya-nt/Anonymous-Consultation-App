import React, { Component } from 'react';
import { Row, Col, Card, ListGroup, Button, InputGroup, FormControl, Alert } from "react-bootstrap";
import ChatListItem from "./Component/ChatListItem";
import Example from './Component/Example';
import fire from './firebase';
import TitleHeader from "./Component/TitleHeader";
import ChatInput from "./Component/ChatInput";
import "./App.css";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            chatMessages: [],
            current_name: "Unlock this chat",
            current_id: 0,
        };
        // <- set up react state
        this.handleClick = this.handleClick.bind(this);
        this.getChatMessages = this.getChatMessages.bind(this);
    }




    componentDidMount() {
        /* Create reference to messages in Firebase Database */

        fire.firestore().collection("Questions")
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(function (doc) {
                    const eventData = {
                        id: doc.id,
                        text: doc.data().fullname
                    }

                    return eventData
                })

                this.setState({ messages: data }); // array of cities objects
            });

    }
    addMessage(e) {
        e.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the message to Firebase */
        // fire.database().ref('messages').push(this.inputEl.value);
        fire.firestore().collection('Questions').add({
            fullname: this.inputEl.value,
            timestamp: new Date(Date.now())
        });
        this.inputEl.value = ''; // <- clear the input
    }

    addChat(e) {
        e.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the message to Firebase */
        // fire.database().ref('messages').push(this.inputEl.value);
        var path = 'Questions/' + this.state.current_id + '/Chat';
        fire.firestore().collection(path).add({
            Sender: this.state.current_name,
            ChatText: this.inputEl.value,
            timestamp: new Date(Date.now())
        });
        this.inputEl.value = ''; // <- clear the input
    }

    handleChange = (no, id) => {
        this.setState({
            current_name: no,
            current_id: id
        });
    }


    handleClick = async (no, id) => {
        await this.handleChange(no, id);
        this.getChatMessages();
    }



    getChatMessages() {

        var path = 'Questions/' + this.state.current_id + '/Chat';


        fire.firestore().collection(path).orderBy("timestamp","desc").limit(7)
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.reverse().map(function (doc) {
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
                    <TitleHeader extra={this.state.current_name}></TitleHeader>

                    <Row style={{ "height": "100%" }}>
                        <Col className="SideContainerLeft" >
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Type to search"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2" ref={el => this.inputEl = el}
                                />
                                <InputGroup.Append>

                                    <Button variant="outline-secondary">Seach</Button>
                                    <Button variant="outline-secondary" onClick={this.addChat.bind(this)}>Add</Button>
                                </InputGroup.Append>
                            </InputGroup>
                            <ListGroup>
                                {
                                    this.state.messages.map(message =>
                                        <ChatListItem onClick={this.handleClick} id={message.id} val={message.text} />)
                                }
                            </ListGroup>
                        </Col>

                        <Col className="SideContainerRight" xs={8} style={{ "overflow": "hidden" }}>
                            <div className="ChatSpace">
                                {/* <Example chat_id={this.state.current_name} /> */}

                                <ul>
                                    {
                                        // this.state.chatMessages.map(chatMessage =>
                                        //     <li>{chatMessage.ChatText}</li>)


                                        this.state.chatMessages.map(chatMessage => {
                                            var class_name = (chatMessage.Sender === this.state.current_name) ? "rightL" : "leftL";
                                            var variant = (chatMessage.Sender === this.state.current_name) ? "dark" : "primary";

                                            return <li className={class_name}>
                                                <Alert variant={variant} style={{paddingTop:"5px" ,paddingBottom: "5px"}}>
                                                    {chatMessage.ChatText}
                                                </Alert>
                                            </li>
                                        })
                                    }
                                </ul>
                            </div>

                            {/* <ChatInput/> */}

                            <div className="input-container">
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Type your message"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2" ref={el => this.inputEl = el}
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