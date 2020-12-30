import React, { Component } from 'react';
import { Row, Col, Card, ListGroup, Button, InputGroup, FormControl } from "react-bootstrap";

import fire from './firebase';
import TitleHeader from "./Component/TitleHeader";
import ChatContainer from "./Component/ChatContainer";
import "./App.css";
import RoomContainer from './Component/RoomContainer';


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
        this.addChatMessage = this.addChatMessage.bind(this);
        this.handleChangeRoomSearch = this.handleChangeRoomSearch.bind(this);
        this.searchChatRooms = this.searchChatRooms.bind(this);
        this.getChatRooms = this.getChatRooms.bind(this);
        this.toggleAdminOverride = this.toggleAdminOverride.bind(this);
    }



    componentDidMount() {
        this.getChatRooms(); 
    }

    toggleAdminOverride= (...args) => {
        if(this.state.adminOverride === false){
            this.setState({
                adminOverride : true
            });
        }
        else{
            this.setState({
                adminOverride : false
            });
        }
    }

    
    
    


    addChatRoom(roomName, roomPassword) {
        fire.firestore().collection('Questions').add({
            roomName: roomName,
            roomPassword: roomPassword,
            timestamp: new Date(Date.now()),
            lastActive :  new Date(Date.now())
        });
        document.getElementById('SearchInput').value = "";
    }

    getChatRooms(){
        fire.firestore().collection("Questions").orderBy("lastActive", "desc").limit(5)
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


    addChatMessage(e) {
        var path = 'Questions/' + this.state.current_id + '/Chat';
        var Sender = (this.state.adminOverride === false) ? this.state.chatRoomName : "Admin";
        fire.firestore().collection(path).add({
            Sender: Sender,
            ChatText: e,
            timestamp: new Date(Date.now())
        });
        fire.firestore().collection('Questions').doc(this.state.current_id).update({lastActive : new Date(Date.now())});
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
        });
    }


    handleClick = async (no, id) => {
        await this.setState({
            chatRoomName: no,
            current_id: id
        });
        this.getChatMessages();
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



    render() {
        return (
            <div className="container" style={{ "height": "100%" }}>
                <Card style={{ "overflow": "hidden", "height": "700px", "borderRadius": "10px", "padding": "20px", "backgroundColor": "#2A2F32", "color": "white", "margin": "20px" }}>
                    <TitleHeader extra={this.state.chatRoomName} onClick={this.toggleAdminOverride} adminOverride={this.state.adminOverride}></TitleHeader>

                    <Row style={{ "height": "100%" }}>
                        <RoomContainer myState={this.state} onClick={this.handleClick} onChange={this.handleChangeRoomSearch} onCreateRoom={this.addChatRoom} onSearchChatRooms={this.searchChatRooms}/>
                        <ChatContainer myState={this.state} onClick={this.addChatMessage} />
                    </Row>
                </Card>
            </div >

        );
    }
}

export default App;