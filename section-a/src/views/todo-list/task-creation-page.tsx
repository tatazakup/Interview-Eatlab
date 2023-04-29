import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormTextField } from '../../components'
import { FC } from 'react'
import { Box, Button } from '@mui/material'
import { connect } from 'react-redux'
import {
    AddTodo,
} from '../../redux/actions/todo-list'
import { useNavigate } from "react-router-dom";

export const TaskSchema = z
  .object({
    topic: z.string(),
    desc: z.string(),
    date: z.string(),
  })
  .required()

export type TaskSchemaType = z.infer<typeof TaskSchema>

type PageProps = {
    AddTodoFunc: any
}

const TaskCreationPage: FC<PageProps> = (props) => {
    const {
        AddTodoFunc
    } = props

    const navigate = useNavigate();

    const formSchema = useForm<TaskSchemaType>({
        resolver: zodResolver(TaskSchema),
        defaultValues: {},
    })

    const { control, handleSubmit } = formSchema

    const onSubmit = handleSubmit(async (data) => {
        await AddTodoFunc(data)
        return navigate('../app/todo-list')
    })

    return (
        <Box sx={{
            m: 5
        }}>
            <FormTextField label='Topic' name='topic' control={control} />
            <FormTextField label='Description' name='desc' control={control} />
            <FormTextField label='Date' name='date' control={control} />d
            <Button onClick={onSubmit}>Submit</Button>
        </Box>
    )
}

export default connect(null, {
    AddTodoFunc: AddTodo
})(TaskCreationPage)

