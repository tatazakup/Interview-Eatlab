import { Suspense } from "react"
import { useRoutes } from "react-router-dom"
import TaskListPage from './task-list-page'
import TaskCreationPage from './task-creation-page'
import TaskUpdatePage from "./task-update-page"
import TaskInfoPage from "./task-info-page"

const PREFIX_PATH = `${'app'}/${'todo-list'}`

export const TodoListRoutes = () => {
    const routesConfig = [
        {
            index: true,
            path: `${PREFIX_PATH}`,
            element: <TaskListPage />
        },
        {
            index: true,
            path: `${PREFIX_PATH}/create`,
            element: <TaskCreationPage />
        },
        {
            index: true,
            path: `${PREFIX_PATH}/update/:id`,
            element: <TaskUpdatePage />
        },
        {
            index: true,
            path: `${PREFIX_PATH}/:id`,
            element: <TaskInfoPage />
        }
    ]

    const routes = useRoutes(routesConfig)

    return <Suspense fallback={<></>}>{routes}</Suspense>
}