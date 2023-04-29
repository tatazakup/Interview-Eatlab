import { StoreState } from '../reducers/types'

// const getData = (username: string, password: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
//     return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
//         return new Promise<void>((resolve) => {
          
//         })
//       }
// }

export const GetData = (data: any) => (dispatch: any) => {
    
    return
};

export const AddTodo = (newData: StoreState.TodoList.TodoListModel) => (dispatch: any, getState: any) => {

    const lengthData = getState().todo.data.length
    let lastData
    if (lengthData > 0) {
        lastData = getState().todo.data[lengthData - 1]
    } else {
        lastData = { id: '0' }
    }

    const lastIndex = (parseInt(lastData.id) + 1).toString()

    dispatch({
        type: 'SET_DATA',
        payload: {
            ...newData,
            id: lastIndex,
            ownerId: getState().user.id,
            date: '.. / .. / ..',
            status: 'waiting'
        }
    })
    
    return
};

export const UpdateTodo = (data: StoreState.TodoList.TodoListModel) => (dispatch: any, getState: any) => {
    const index = getState().todo.data.findIndex((v: { id: string }) => v.id === data.id)

    let newDataObject = getState().todo.data
    newDataObject[index] = data

    dispatch({
        type: 'UPDATE_INFO',
        payload: newDataObject
    })
    
    return
};

export const DeleteTodo = (id: string) => (dispatch: any, getState: any) => {
    const index = getState().todo.data.findIndex((v: { id: string }) => v.id === id)

    let newDataObject = getState().todo.data
    if (index > -1) { // only splice array when item is found
        newDataObject.splice(index, 1); // 2nd parameter means remove one item only
    }

    console.log('newDataObject :', newDataObject)

    dispatch({
        type: 'UPDATE_INFO',
        payload: newDataObject
    })
    
    return
}
  