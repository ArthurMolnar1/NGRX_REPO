import { initialState } from "./counter.state";
import { createReducer, on } from '@ngrx/store';
import { customIncrement, decrement, increment, reset, changeChannelName } from "./counter.actions";


const _counterReducer = createReducer(initialState, 
    on(increment, (state) => {
        return {
            ...state,
            counter: state.counter + 1
        };
    }), on(decrement, (state) => {
        return {
            ...state,
            counter: state.counter - 1
        }
    }), on(reset, (state) => {
        return {
            ...state,
            counter: 0
        }
    }), on(customIncrement, (state, action) => {
        return {
            ...state,
            counter: state.counter + action.count
        }
    }), on(changeChannelName, (state) => {
        return {
            ...state,
            channelName: 'Arthur'
        }
    })
);

export function counterReducer(state: any, action: any) {
    return _counterReducer(state, action);
}
