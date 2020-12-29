import React, { Component } from 'react';
import { Row } from "react-bootstrap";
import AdminUnlockModal from "./AdminUnlockModal";


class TitleHeader extends Component {

    constructor(props){
        super(props);
        this.clickFunction = this.clickFunction.bind(this);
    }

    clickFunction(){
        this.props.onClick();
    }
    
    render() {



        return (
            <Row style={{ "position": "relative",display : 'grid' }}><h2 style={{ "textAlign": "center" }}>
                CHAT-ANT               
          </h2>
          <AdminUnlockModal onClick={this.clickFunction} adminOverride={this.props.adminOverride}/>
          </Row>
        );
    }
}

export default TitleHeader;