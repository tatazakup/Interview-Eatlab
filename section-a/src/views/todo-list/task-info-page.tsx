import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormTextField } from '../../components'
import { FC, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { connect } from 'react-redux'
import { Routes, Route, useParams } from 'react-router-dom';

export const TaskSchema = z
  .object({
    topic: z.string(),
    desc: z.string(),
    date: z.string(),
  })
  .required()

export type TaskSchemaType = z.infer<typeof TaskSchema>

type PageProps = {
    data: any
}

const TaskCreationPage: FC<PageProps> = (props) => {
    const {
        data 
    } = props

    let { id } = useParams();

    const formSchema = useForm<TaskSchemaType>({
        resolver: zodResolver(TaskSchema),
        defaultValues: {},
    })

    const { control, reset } = formSchema

    useEffect(() => {
        const found = data.find((v: { id: string }) => v.id === id)
        reset(found)
    }, [])

    return (
        <Box sx={{
            m: 5
        }}>
            <FormTextField label='Topic' name='topic' control={control} />
            <FormTextField label='Description' name='desc' control={control} />
            <FormTextField label='Date' name='date' control={control} />
        </Box>
    )
}

const mapStateToProps = (state: any) => ({
    data: state.todo.data
})

export default connect(mapStateToProps, {
    
})(TaskCreationPage)

