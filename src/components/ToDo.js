import React, { useState } from 'react';

const ToDo = (props) => {
    // const [todoName, setTodoName] = useState('');
    // const [todoList, setTodoList] = useState([]);

    const [todoState, setTodoState] = useState({
        inputName: '',
        todoList: []
    });

    const inputHandler = event => {
        setTodoState({
            inputName: event.target.value,
            todoList: todoState.todoList
        });
    };

    const todoListHandler = _ => {
        setTodoState({
            inputName: todoState.inputName,
            todoList: todoState.todoList.concat(todoState.inputName)
        });
    };

    return (
        <div>
            <input type='text' placeholder="To Do" onChange={inputHandler} value={todoState.inputName} />
            <button type='button' onClick={todoListHandler}>Add</button>
            <ul>
                {todoState.todoList.map(todo => <li key={todo}>{todo}</li>)}
            </ul>
        </div>
    );
};

export default ToDo;