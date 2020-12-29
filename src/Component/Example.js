import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function Example(props) {
    const [show, setShow] = useState(false);
    const [roomName,setRoomName] = useState('Invalid');
    const [roomPassword,setRoomPassword] = useState('Invalid');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSaveChanges = () => {
        // console.log("2");
        props.onCreateRoom(roomName,roomPassword);
        handleClose();
    }

    const handleChangeRoomName = (e) => { 
        const target = e.target;
        const value = target.value;
        setRoomName(value)
      };

      const handleChangeRoomPassword = (e) => { 
        const target = e.target;
        const value = target.value;
        setRoomPassword(value)
      };
      

    return (
        <>

            <Button variant="outline-secondary" onClick={handleShow}>Add</Button>


            <Modal animation={false} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Room Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Enter Room Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Room Name"  maxLength="18" autoComplete="Null" onChange={handleChangeRoomName} />
                            <Form.Text className="text-muted">
                                Use this name for your privacy.
                        </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"  autoComplete="Null" onChange={handleChangeRoomPassword} />
                        </Form.Group>
                        {/* <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group> */}

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
            </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        SaveChanges
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Example;