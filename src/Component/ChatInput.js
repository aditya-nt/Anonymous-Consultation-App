import React, { Component } from 'react';
import { Button,InputGroup,FormControl } from "react-bootstrap";

class ChatInput extends Component {
    constructor(props){
        super(props);
        this.inputRef = React.createRef();
    }

    handleClick(e){
        e.preventDefault(); 
        
    }

    render() {


        return (
            <div>
                <div className="input-container">
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Type wewd message"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2" ref={el => this.inputRef = el}
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary" onClick={this.handleClick}>Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>

            </div>
        );
    }
}

export default ChatInput;