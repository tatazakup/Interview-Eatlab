import { SET_DATA } from '../constants/todo-list.constants'
import { StoreState } from './types'

type StateType = StoreState.TodoList.State

const initial: StateType = {
    data: [
        {
            id: '1',
            ownerId: '1',
            topic: 'Task A',
            desc: '-',
            date: '11 / 1 / 22',
            status: 'waiting'
        },
        {
            id: '2',
            ownerId: '2',
            topic: 'Task B',
            desc: '-',
            date: '11 / 1 / 22',
            status: 'waiting'
        }
    ]
}

const todoListReducer = (state: StateType = initial, action: StoreState.TodoList.Actions.All): StateType => {
    const { type, payload } = action
    let changed = state

    switch (type) {
        case "SET_DATA": {
            changed = {
                ...state,
                data: [...state.data, payload]
            }
            break;
        }

        case "UPDATE_INFO": {
            changed = {
                ...state,
                data: payload
            }
            break;
        }
        
        default:
            break;

    }

    return changed
}

export default todoListReducer