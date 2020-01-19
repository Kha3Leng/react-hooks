import React, { useState } from 'react';
import axios from 'axios';

const ToDo = (props) => {
    const [todoName, setTodoName] = useState('');
    const [todoList, setTodoList] = useState([]);

    const inputHandler = event => {
        setTodoName(event.target.value);
    };

    const todoListHandler = _ => {
        setTodoList(todoList.concat(todoName));
        axios.post('https://to-do-81153.firebaseio.com/todo.json', { todo: todoName })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    return (
        <div>
            <input type='text' placeholder="To Do" onChange={inputHandler} value={todoName} />
            <button type='button' onClick={todoListHandler}>Add</button>
            <ul>
                {todoList.map(todo => <li key={todo}>{todo}</li>)}
            </ul>
        </div>
    );
};

export default ToDo;