import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ToDo = (props) => {
    const [todoName, setTodoName] = useState('');
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        axios.get('https://to-do-81153.firebaseio.com/todo.json')
            .then(res => {
                console.log(res);
                const todoData = res.data;
                const todo = [];

                for (const key in todoData) {
                    todo.push({ id: key, name: todoData[key].name });
                }
                setTodoList(todo);
            });
        return () => {
            console.log("clean up");
        }
    }, [todoName]);

    const inputHandler = event => {
        setTodoName(event.target.value);
    };

    const todoListHandler = _ => {
        setTodoList(todoList.concat(todoName));
        axios.post('https://to-do-81153.firebaseio.com/todo.json', { name: todoName })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    return (
        <div>
            <input type='text' placeholder="To Do" onChange={inputHandler} value={todoName} />
            <button type='button' onClick={todoListHandler}>Add</button>
            <ul>
                {todoList.map(todo => <li key={todo.id}>{todo.name}</li>)}
            </ul>
        </div>
    );
};

export default ToDo;