import React, { Component } from 'react';
import { Row, Col, Card, ListGroup, Button , InputGroup ,FormControl } from "react-bootstrap";
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
      list_no: "Unlock this chat"
    };
    // <- set up react state
    this.handleClick = this.handleClick.bind(this);

  }



  componentDidMount() {
    /* Create reference to messages in Firebase Database */

    fire.firestore().collection("Questions")
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(function (doc) {
          const eventData = doc.data()
          eventData.id = doc.id
          eventData.text = doc.data().fullname

          return eventData
        })

        // console.log(data);
        this.setState({ messages: data }); // array of cities objects
      });

    // let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
    // messagesRef.on('child_added', snapshot => {
    //   /* Update React state when message is added at Firebase Database */
    //   let message = { text: snapshot.val(), id: snapshot.key };
    //   this.setState({ messages: [message].concat(this.state.messages) });
    // })
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


  handleClick(no) {
    this.setState({
      list_no: no
    })
  }

  render() {
    return (
      <div className="container" style={{ "height": "100%" }}>
        <Card style={{ "overflow": "hidden", "height": "700px", "borderRadius": "10px", "padding": "20px", "backgroundColor": "#2A2F32", "color": "white", "margin": "20px" }}>
          <TitleHeader/>

          <Row style={{ "height": "100%" }}>
            <Col className="SideContainerLeft" >
              <ListGroup>
                {
                  this.state.messages.map(message =>
                    <ChatListItem onClick={this.handleClick} key={message.id} val={message.text} />)
                }
              </ListGroup>
            </Col>
            
            <Col className="SideContainerRight" xs={8}  style={{  "overflow": "hidden" }}>
              <div className="ChatSpace">
              <Example chat_id={this.state.list_no} />
              <Example chat_id={this.state.list_no} />
              <Example chat_id={this.state.list_no} />
              <Example chat_id={this.state.list_no} />
              </div>

              {/* <ChatInput/> */}
              
              <div className="input-container">
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Type your message"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"  ref={el => this.inputEl = el}
                  />
                  <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={this.addMessage.bind(this)}>Send</Button>
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