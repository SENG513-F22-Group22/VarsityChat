import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import axios from 'axios'

function SaveTrigger(props) {
    const { edit, setEdit, fName, lName, userEmail, defaultFirstName, defaultLastName } = props
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Edit');
    const target = useRef(null);

    const handleClick = () => {
        if (edit) {
            let newFName = ""
            let newLName = ""
            if (defaultFirstName !== fName) {
                newFName = fName
            }

            if (defaultLastName !== lName) {
                newLName = lName
            }

            try {

                const response = axios.post('http://localhost:4000/profileName',
                            { email: userEmail,
                            fName: newFName,
                            lName: newLName })


                if (response.status === 200) {

                }
            } catch (err) {
                alert("Error! Name was not set!")
            }
        }

        setEdit(!edit);
        if (text === 'Edit') {
            setText('Save')
        } else {
            setShow(!show);
            setText('Edit')
        }

    };



    return (
        <>
            <Button id="ESButton" variant={edit ? "outline-primary" : "primary"} size="sm" ref={target} onClick={handleClick}>
                {text}
            </Button>
            <OverlayTrigger target={target.current} show={show} placement="left">
                {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                        Changes Saved!
                    </Tooltip>
                )}
            </OverlayTrigger>
        </>
    );
}

export default SaveTrigger;