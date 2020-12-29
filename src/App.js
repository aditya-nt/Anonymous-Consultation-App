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
            itemsToDisplay : [],
            dict: {},
            messages: [],
            searches : [],
            chatMessages: [],
            chatRoomName: "Unlock a ChatRoom first",
            current_id: 0,
            adminOverride : false
        };
        // <- set up react state
        this.handleClick = this.handleClick.bind(this);
        this.getChatMessages = this.getChatMessages.bind(this);
        this.addChatRoom = this.addChatRoom.bind(this);
        this.addChat = this.addChat.bind(this);
        this.handleChangeRoomSearch = this.handleChangeRoomSearch.bind(this);
        this.searchChatRooms = this.searchChatRooms.bind(this);
        this.getChatRooms = this.getChatRooms.bind(this);
        this.toggleAdminOverride = this.toggleAdminOverride.bind(this);
    }


    toggleAdminOverride= (...args) => {

        if(this.state.adminOverride === false){
            this.setState({
                adminOverride : true
            });
        }
        else{{
            this.setState({
                adminOverride : false
            });
        }}


    }

    async searchChatRooms(){

        var strSearch =  document.getElementById("SearchInput").value;
        var strlength = strSearch.length;
        var strFrontCode = strSearch.slice(0, strlength-1);
        var strEndCode = strSearch.slice(strlength-1, strSearch.length);

        var endcode= strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);

        const arr = []

        await fire.firestore().collection("Questions")
        .where('roomName', '>=', strSearch)
        .where('roomName', '<', endcode)
        .get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                const eventData = {
                    id: doc.id,
                    text: doc.data().roomName,
                    password: doc.data().roomPassword
                }
                arr.push(eventData);
            });
        });

        this.setState({ itemsToDisplay :arr });  
    }

    getChatRooms(){
        /* Create reference to messages in Firebase Database */
        fire.firestore().collection("Questions").orderBy("lastActive", "desc").limit(25)
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(function (doc) {
                    const eventData = {
                        id: doc.id,
                        text: doc.data().roomName,
                        password: doc.data().roomPassword
                    }
                    return eventData
                })

                var dicto = {};
                querySnapshot.docs.forEach(function (doc) {
                    dicto[doc.id] = "locked";
                })

                this.setState({ messages: data,itemsToDisplay :data });
            });
    }

    componentDidMount() {
        this.getChatRooms(); 
        // this.searchChatRooms(); 
    }


    addChatRoom(roomName, roomPassword) {
        // e.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the message to Firebase */
        fire.database().ref('messages').push(this.ChatMessageInput.value);
        fire.firestore().collection('Questions').add({
            roomName: roomName,
            roomPassword: roomPassword,
            timestamp: new Date(Date.now()),
            lastActive :  new Date(Date.now())
        });

        document.getElementById('SearchInput').value = "";

    }

    addChat(e) {
        e.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the message to Firebase */
        // fire.database().ref('messages').push(this.ChatMessageInput.value);
        var path = 'Questions/' + this.state.current_id + '/Chat';
        var Sender = (this.state.adminOverride === false) ? this.state.chatRoomName : "Admin";
        fire.firestore().collection(path).add({
            Sender: Sender,
            ChatText: this.ChatMessageInput.value,
            timestamp: new Date(Date.now())
        });
        fire.firestore().collection('Questions').doc(this.state.current_id).update({lastActive : new Date(Date.now())});
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
        this.setState(prevState => {
            // Taking a copy of the initial filters obj         
            const { dict } = prevState;
            // Updating it's property as per the key, value pair retrieved (key being the filter, value being "on" or "off")        
            dict[this.state.current_id] = "unlocked";
            // Returning the updated object         
            return { dict };
        })

    }


    render() {
        return (
            <div className="container" style={{ "height": "100%" }}>
                <Card style={{ "overflow": "hidden", "height": "700px", "borderRadius": "10px", "padding": "20px", "backgroundColor": "#2A2F32", "color": "white", "margin": "20px" }}>
                    <TitleHeader extra={this.state.chatRoomName} onClick={this.toggleAdminOverride} adminOverride={this.state.adminOverride}></TitleHeader>

                    <Row style={{ "height": "100%" }}>
                        <Col className="SideContainerLeft" >
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Type to search"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2" id="SearchInput" onChange={this.handleChangeRoomSearch} ref={el => this.ChatRoomInput = el}
                                />
                                <InputGroup.Append>

                                    {/* <Button variant="outline-secondary" onClick={this.addChatRoom.bind(this)}>Seach</Button> */}
                                    <Button variant="outline-secondary" onClick={this.searchChatRooms}>Search</Button>
                                    <Example onCreateRoom={this.addChatRoom} />
                                </InputGroup.Append>
                            </InputGroup>
                            <ListGroup>
                                {
                                    this.state.itemsToDisplay.map(message =>
                                        <RoomPasswordModal adminOverride={this.state.adminOverride} onClick={this.handleClick} key={message.id} id={message.id} val={message.text} pass={message.password} status={this.state.dict[message.id]} />)
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
                                        <Alert variant="success" style={{textAlign: "center"}}>
                                            Happy Chatting!!
                                                </Alert>
                                    </li>
                                </ul>
                            </div>

                            {/* <ChatInput/> */}

                            <div className="input-container">
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder={this.state.chatRoomName + " : Type your message"}
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



    handleChangeRoomSearch = () => {
        const selected = document.getElementById("SearchInput").value;
        let itemsToDisplay = [];

    
        if (selected === ""){
          this.setState({ itemsToDisplay: [...this.state.messages] });
        }
        else {
          itemsToDisplay = this.state.messages.filter(item =>
            item.text.toLowerCase().includes(selected.toLowerCase())
          );
          this.setState({ itemsToDisplay });
        }
    };


}

export default App;