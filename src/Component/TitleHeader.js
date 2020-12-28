import React, { Component } from 'react';
import { Row , Button} from "react-bootstrap";


class TitleHeader extends Component {
    
    render() {
        return (
            <Row style={{ "position": "relative",display : 'grid' }}><h2 style={{ "textAlign": "center" }}>
                KAAYA
                
          </h2>
          
          <Button variant="outline-secondary" style={{position : 'absolute', right : '15px'}}>Unlock</Button>
          </Row>
        );
    }
}

export default TitleHeader;