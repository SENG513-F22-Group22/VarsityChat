import React from 'react';
import {

} from 'react-bootstrap';

const Message = ({ from, contents, time, isSelf }) => {
    return (
        <>
            <div className="message__chats">
                <p>{from}</p>
                <div
                    className={
                        from === localStorage.getItem('email') ?
                            "message__sender" :
                            "message__recipient"}
                >
                    <p>{contents}</p>
                </div>
            </div>
        </>
    );
};

export default Message;