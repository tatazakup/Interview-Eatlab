import { Box, Button, Typography } from '@mui/material'
import { TableComponents as Table, Icon } from '../../components'
import { connect } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useMemo } from 'react';
import {
    DeleteTodo
} from '../../redux/actions/todo-list'

type PageProps = {
    userId: string,
    userRole: string
    todoListData: any,

    DeleteTodo: any
}

const Page = (props:PageProps) => {
    const {
        userId,
        userRole,
        todoListData,

        DeleteTodo,
    } = props

    const navigate = useNavigate();

    const column = [
        {
            id: 'topic',
            label: 'Name',
        },
        {
            id: 'desc',
            label: 'Description'
        },
        {
            id: 'date',
            label: 'Due date'
        },
        {
            id: 'status',
            label: 'Status',
            render: (renderProps: { status: string }) => {
                const {
                    status
                } = renderProps
                return (
                    <Typography
                        sx={{
                            color: status === 'waiting' ? 'black' : status === 'doing' ? 'red' : 'green'
                        }}
                    >{status}</Typography>
                )
            }
        },
        {
            id: 'action',
            label: '',
            render: (renderProps: { id: string, ownerId: string; }) => {
                const {
                    id,
                    ownerId 
                } = renderProps
                return (
                    <>
                        <Icon name="info-filled" onClick={() => navigate(`./${id}`)} />
                        <Icon name="edit-outlined" display={ownerId === userId || userRole === 'admin' ? 'block' : 'none'} onClick={() => navigate(`./update/${id}`)} />
                        <Box 
                            display={ownerId === userId || userRole === 'admin' ? 'block' : 'none'}
                        >
                            <Icon name="trash-outlined" onClick={() => DeleteTodo(id)} />
                        </Box>
                    </>
                )
            }
        },
    ]

    const data = useMemo(() => {
        return todoListData.data || []
    }, [todoListData.data])

    return (
        <>
            <Box>
                <Button onClick={() => navigate('./create')}>Add New</Button>
            </Box>

            <Table 
                column={column}
                data={data}
            />
        </>
    )
}

const mapStateToProps = (state: any) => ({
    userId: state.user.id,
    userRole: state.user.role,
    todoListData: state.todo
})

export default connect(mapStateToProps, {
    DeleteTodo
})(Page)