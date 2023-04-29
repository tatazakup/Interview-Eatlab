export namespace StoreState {

    export namespace TodoList {
        export type TodoListModel = {
            id: string
            ownerId: string
            topic: string
            desc: string
            date: string
            status: 'waiting' | 'doing' | 'success'
        }

        export type State = {
            data: TodoListModel[];
        }
    
        export namespace Actions {
            export type SetData = {
                type: 'SET_DATA'
                payload: TodoListModel
            }

            export type UpdateData = {
                type: 'UPDATE_INFO'
                payload: TodoListModel[]
            }
    
            export type All = SetData | UpdateData
        }
    }

    export namespace User {
        export type State = {
            id: string;
            role: 'admin' | 'viewer'
        }
    }
  
    export type All = {
        todo: TodoList.State
        user: User.State
    }
  }