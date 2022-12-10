import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

function SaveTrigger({ edit, setEdit }) {
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Edit');
    const target = useRef(null);

    const handleClick = () => {
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