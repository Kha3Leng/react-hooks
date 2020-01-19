import React, { useState } from 'react';

import authContext from './auth-context';
import ToDo from './components/ToDo';
import Header from './components/Header';
import Auth from './components/Auth';

const App = props => {
  const [state, setState] = useState('auth');
  const [authState, setAuth] = useState(false);

  const onLoadTodos = name => {
    setState(name);
  };

  const onLoadAuthe = name => {
    setState(name);
  };

  const logIn = _ => {
    setAuth(
      true
    );
  };

  return (
    <authContext.Provider value={{ status: authState, login: logIn }}>
      <div>
        <Header
          onLoadTodo={onLoadTodos.bind(this, 'todo')}
          onLoadAuth={onLoadAuthe.bind(this, 'auth')} />
        <hr />
        {state === 'auth' ? <Auth /> : state === 'todo' ? <ToDo /> : null}
      </div>
    </authContext.Provider>
  );

}

export default App;
