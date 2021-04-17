import React, { useState } from "react";

import { Button, Modal, Form, ListGroup } from "react-bootstrap";

function RoomPasswordModal(props) {
    const [show, setShow] = useState(false);
    const [roomPassword, setRoomPassword] = useState('Invalid');
    const [hint , setHint] = useState('Unlock this room with a password.');

    const handleClose = () => setShow(false);
    const handleShow = () => {
    
        if(props.status === "unlocked" || props.adminOverride === true){
            handleSaveChanges()

        }
        else{
            setShow(true)

        }
    
    };

    const handleSaveChanges = () => {
        // console.log("2");
        if (props.pass === roomPassword || props.status === "unlocked" || props.adminOverride === true) {
            props.onClick(props.val, props.id);
            handleClose();
        }
        else {
            setHint('You have entered incorrect password. Try again.')
        }
    }


    const handleChangeRoomPassword = (e) => {
        const target = e.target;
        const value = target.value;
        setRoomPassword(value)
    };


    return (
        <>

            <ListGroup.Item action variant="dark" key={props.id} onClick={handleShow} >{props.val}</ListGroup.Item>


            <Modal animation={false} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Room Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" autoComplete="Null" placeholder="Password" onChange={handleChangeRoomPassword} />
                            <Form.Text className="text-muted">
                                {hint}
                        </Form.Text>

                        </Form.Group>
                        {/* <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group> */}

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
            </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Unlock
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RoomPasswordModal;