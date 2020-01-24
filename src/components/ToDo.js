import React, { useMemo, useState, useRef, useEffect, useReducer } from 'react';
import axios from 'axios';

import List from './List';

const ToDo = (props) => {
    const [valid, setValid] = useState(false);
    // const [todoName, setTodoName] = useState('');
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
    const todoInputRef = useRef();


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
    }, []);

    // const inputHandler = event => {
    //     setTodoName(event.target.value);
    // };



    // useEffect(() => {
    //     if (shit)
    //         dispatch({ type: 'ADD', payload: shit });
    // }, [shit]);

    const todoListHandler = _ => {
        const todoName = todoInputRef.current.value;
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

            })
            .catch(err => console.log(err));
    };

    const inputValidationHandler = event => {
        if (event.target.value.trim() === '')
            setValid(false);
        else
            setValid(true);
    };

    return (
        <div>
            <input type='text' placeholder="To Do" ref={todoInputRef}
                onChange={inputValidationHandler}
                style={{
                    backgroundColor: valid ? 'transparent' : 'red'
                }} />

            <button type='button' onClick={todoListHandler}>Add</button>
            {useMemo(
                () => <List todoList={todoList} onClick={todoListRemovedHandler} />,
                [todoList])}
        </div>
    );
};

export default ToDo;