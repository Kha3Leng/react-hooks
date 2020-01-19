import React, { useState } from 'react';

const ToDo = (props) => {
    const inputState = useState('');

    const inputHandler = event => {
        inputState[1](event.target.value);
    };

    return (
        <div>
            <input type='text' placeholder="To Do" onChange={inputHandler} value={inputState[0]} />
            <button type='button'>Add</button>
            <ul />
        </div>
    );
};

export default ToDo;