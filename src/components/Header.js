import React, { useContext } from 'react';

import authContext from '../auth-context';

const Header = props => {

    const auth = useContext(authContext);
    return (
        <React.Fragment>
            {auth.status ? <button onClick={props.onLoadTodo}>To Do</button> : null}|
            <button onClick={props.onLoadAuth}>Auth</button>
        </React.Fragment>
    );
};

export default Header;