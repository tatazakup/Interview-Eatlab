import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormTextField, FormSelect } from '../../components'
import { FC, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import {
    UpdateTodo,
} from '../../redux/actions/todo-list'

export const TaskSchema = z
  .object({
    id: z.string(),
    ownerId: z.string(),
    topic: z.string(),
    desc: z.string(),
    date: z.string(),
    status: z.string()
  })
  .required()

export type TaskSchemaType = z.infer<typeof TaskSchema>

type PageProps = {
    data: any,
    UpdateTodo: any
}

const TaskCreationPage: FC<PageProps> = (props) => {
    const {
        data,
        UpdateTodo
    } = props

    const navigate = useNavigate();
    let { id } = useParams();

    const formSchema = useForm<TaskSchemaType>({
        resolver: zodResolver(TaskSchema),
        defaultValues: {},
    })

    const { control, handleSubmit, reset } = formSchema

    useEffect(() => {
        const found = data.find((v: { id: string }) => v.id === id)
        reset(found)
    }, [])

    const onSubmit = handleSubmit(async (data) => {
        UpdateTodo(data)
        return navigate('../../app/todo-list')
    })

    return (
        <Box sx={{
            m: 5
        }}>
            <FormTextField label='Topic' name='topic' control={control} />
            <FormTextField label='Description' name='desc' control={control} />
            <FormSelect label='Status' name='status' control={control} options={[
                {
                    label: 'waiting',
                    value: 'waiting'
                },
                {
                    label: 'doing',
                    value: 'doing'
                },
                {
                    label: 'success',
                    value: 'success'
                }
            ]} />
            <Button onClick={onSubmit}>Update</Button>
        </Box>
    )
}

const mapStateToProps = (state: any) => ({
    data: state.todo.data
})

export default connect(mapStateToProps, {
    UpdateTodo
})(TaskCreationPage)

