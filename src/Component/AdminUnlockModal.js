import React, { useState } from "react";

import { Button, Modal, Form } from "react-bootstrap";
import { Lock  } from 'react-bootstrap-icons';


function AdminUnlockModal(props) {
    const [show, setShow] = useState(false);
    const [roomPassword, setRoomPassword] = useState('Invalid');
    const [hint, setHint] = useState('Unlock this room with a password.');

    const handleClose = () => setShow(false);
    const handleShow = () => {

        if (props.adminOverride === true) {
            handleSaveChanges()

        }
        else {
            setShow(true)

        }

    };

    const handleSaveChanges = () => {
        if (roomPassword === "admin" || props.adminOverride === true) {
            props.onClick();
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

            <Button variant={(props.adminOverride) ? "outline-primary" : "outline-secondary"} onClick={handleShow} style={{ position: 'absolute', right: '15px' , padding : '3px 8px 6px 8px' }}><Lock st/></Button>

            <Modal animation={false} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Switch to Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Enter Admin Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" autoComplete="Null" onChange={handleChangeRoomPassword} />
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

export default AdminUnlockModal;