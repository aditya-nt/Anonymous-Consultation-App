import React, { Component } from 'react';
import { Row } from "react-bootstrap";


class TitleHeader extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Row style={{ "display": "grid" }}><h2 style={{ "textAlign": "center" }}>
                Kaaya {this.props.extra}
          </h2></Row>
        );
    }
}

export default TitleHeader;