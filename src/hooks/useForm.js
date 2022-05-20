import { useCallback, useEffect, useState } from "react";

export default function() {
    const [cache, setCache] = useState(null);
    let state = {};
    const add = ({name, minlength, contains, matches, value = ""}) => {
        if(cache != null) {
            state = cache;
        } else state = {...state, [name]: {minlength, contains, matches, value}};
        

        const onChange = (e) => {
            console.log(e);
            state = {...state, [name]: {...state[name], value:e.target.value}};
        };

        return {onChange, defaultValue: value};
    };

    const handleSubmit = (e, onSuccess, onFail) => {
        e.preventDefault();

        const error = {};
        for(let item in state) {
            for(let prop in state[item]) {
                if(state[item][prop] != null){
                    switch(prop) {
                        case 'minlength':
                            if(state[item]['value'].length < state[item][prop])
                                error[item] = {...error[item], 'minlength': true};
                            
                            break;
                        case 'contains':
                            if(state[item]['value'].indexOf(state[item][prop]) === -1)
                                error[item] = {...error[item], 'contains': true};
                            
                            break;
                        case 'matches':
                            if(state[item]['value'] != state[state[item][prop]]['value'])
                                error[item] = {...error[item], 'matches': true};
                            break;
                    }
                }
            }
        }
        if(error.constructor === Object
            && Object.keys(error).length === 0) {
            setCache(state);
            onSuccess(state);
        }
        else {
            setCache(state);
            onFail(state, error);
        }
    };


    return {add, handleSubmit};
}