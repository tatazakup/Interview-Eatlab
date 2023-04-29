import { StoreState } from './types'

type StateType = StoreState.User.State

const initial: StateType = {
    id: '1',
    role: 'admin'
}

const userReducer = (state: StateType = initial, action: StoreState.TodoList.Actions.All): StateType => {
    const { type, payload } = action
    let changed = state

    return changed
}

export default userReducer