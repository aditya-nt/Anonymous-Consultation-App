import React, { Component } from 'react';
import { Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { ArrowLeft } from 'react-bootstrap-icons';
import AdminUnlockModal from "./AdminUnlockModal";
import FontAwesome, { FontAwesomeSize } from "react-fontawesome";
import logo  from "../logo2.png";


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
            <Button variant= "outline-secondary" onClick={this.props.onBack} style={{ position: 'absolute', left: '15px' , padding : '3px 8px 6px 8px' }}><ArrowLeft/></Button>
            <div style={{  display: 'flex' ,justifyContent: 'center'}} ><img src={logo} style={{ width: '30px' , height : '30px' , marginBottom : '20px'}}></img>    
                <FontAwesome >Chat-ant</FontAwesome> 
                </div>          
          </h2>
          <AdminUnlockModal onClick={this.clickFunction} adminOverride={this.props.adminOverride}/>
          </Row>
        );
    }
}

export default TitleHeader;