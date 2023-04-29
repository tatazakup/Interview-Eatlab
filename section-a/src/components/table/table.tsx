import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { FC, useMemo } from 'react'

type Column = {
    id: string
    label: string
    render?(data: any): JSX.Element
}

type Data = {
    [key: string]: string
}

type TableComponentsProps = {
    column: Column[]
    data: Data[]
}

export const TableComponents: FC<TableComponentsProps> = (props) => {
    const {
        column,
        data
    } = props

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        { column.map(({label}, index) => (
                            <TableCell key={index}>{label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((dataProps, dataIndex) => {
                        return (
                            <TableRow
                                key={dataIndex}
                            >
                                { column.map(({id: columnId, render}, columnIndex) => {
                                    return (
                                        <TableCell key={`${dataIndex}-${columnIndex}`}>
                                            {render ? 
                                                render(dataProps as any)
                                                :
                                                dataProps[columnId]
                                            }
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </>
    )
}

export default TableComponents