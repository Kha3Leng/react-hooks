import { useState } from 'react';

export const useInputValidity = () => {
    const [value, setValue] = useState('');
    const [validity, setValidity] = useState(false);

    const inputIsValid = () => {
        if (value.trim() === '') {
            setValidity(false);
        } else {
            setValidity(true);
        }
    };

    return { value: value, onChange: inputIsValid, validity };
};