import { BrowserRouter } from "react-router-dom"
import { TodoListRoutes } from '../views'

const App = () => {
    return (
        <BrowserRouter>
            <TodoListRoutes />
        </BrowserRouter>
    )
}

export default App