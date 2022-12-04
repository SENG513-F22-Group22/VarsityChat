import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

function SaveTrigger({ edit, setEdit }) {
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Edit');
    const target = useRef(null);

    const handleClick = () => {
        setShow(!show);
        setEdit(!edit);
        if (text === 'Edit') {
            setText('Save')
        } else {
            setText('Edit')
        }
    };

    return (
        <>
            <Button id="ESButton" variant={edit ? "outline-primary" : "primary"} size="sm" ref={target} onClick={handleClick}>
                {text}
            </Button>
            <Overlay target={target.current} show={show} placement="left">
                {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                        Changes Saved!
                    </Tooltip>
                )}
            </Overlay>
        </>
    );
}

export default SaveTrigger;