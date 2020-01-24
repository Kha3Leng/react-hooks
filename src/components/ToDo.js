import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const ToDo = (props) => {
    const [todoName, setTodoName] = useState('');
    // const [todoList, setTodoList] = useState([]);
    // const [shit, setShit] = useState(null);
    const todoListReducer = (state, action) => {
        switch (action.type) {
            case 'ADD':
                return state.concat(action.payload);
            case 'SET':
                return action.payload;
            case 'REMOVE':
                return state.filter(todo => todo.id !== action.payload);
            default:
                return state;
        }
    };

    const [todoList, dispatch] = useReducer(todoListReducer, []);


    useEffect(() => {
        axios.get('https://to-do-81153.firebaseio.com/todo.json')
            .then(res => {
                console.log(res);
                const todoData = res.data;
                const todo = [];

                for (const key in todoData) {
                    todo.push({ id: key, name: todoData[key].name });
                }
                dispatch({ type: 'SET', payload: todo });
            });
        return () => {
            console.log("clean up");
        }
    }, [todoName]);

    const inputHandler = event => {
        setTodoName(event.target.value);
    };



    // useEffect(() => {
    //     if (shit)
    //         dispatch({ type: 'ADD', payload: shit });
    // }, [shit]);

    const todoListHandler = _ => {
        axios.post('https://to-do-81153.firebaseio.com/todo.json', { name: todoName })
            .then(res => {
                console.log(res);
                setTimeout(
                    () => {
                        const todo = { id: res.data.name, name: todoName };
                        dispatch({ type: 'ADD', payload: todo });
                    },
                    3000
                );
            })
            .catch(err => console.log(err));
    };

    const todoListRemovedHandler = todoId => {
        axios.delete(`https://to-do-81153.firebaseio.com/${todoId}.json`)
            .then(res => {
                dispatch({ type: 'REMOVE', payload: todoId });
                console.log(`https://to-do-81153.firebaseio.com/${todoId}.json`);
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <input type='text' placeholder="To Do" onChange={inputHandler} value={todoName} />
            <button type='button' onClick={todoListHandler}>Add</button>
            <ul>
                {todoList.map(todo => <li
                    key={todo.id}
                    onClick={todoListRemovedHandler.bind(this, todo.id)}>{todo.name}</li>)}
            </ul>
        </div>
    );
};

export default ToDo;