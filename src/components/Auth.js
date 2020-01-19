import React, { useContext } from 'react';

import authContext from '../auth-context';

const Auth = _ => {
    const auth = useContext(authContext);
    return (
        <button onClick={auth.login}>
            Log In
    </button>
    );
};

export default Auth;