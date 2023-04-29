import { Box, TextField, TextFieldProps, Typography } from '@mui/material'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

export type FormTextFieldProps<TFieldValues extends FieldValues> = Omit<
  UseControllerProps<TFieldValues>,
  'rules'
> &
  Omit<TextFieldProps, 'value' | 'error' | 'helperText'> & {
    axis?: 'vertical' | 'horizontal'
  }

export function FormTextField<TFieldValues extends FieldValues>({
  name,
  onChange,
  shouldUnregister,
  defaultValue,
  control,
  axis = 'horizontal',
  ...props
}: FormTextFieldProps<TFieldValues>) {
  const { field, fieldState } = useController({
    name,
    shouldUnregister,
    defaultValue,
    control,
  })

  const { error } = fieldState
  const { ref, value, onChange: onChangeField } = field

  const onChangeFunc = (e: any) => {
    onChange?.(e)
    onChangeField(e)
  }

  return axis === 'vertical' ? (
    <TextField
      {...props}
      inputRef={ref}
      value={value ?? ''}
      onChange={onChangeFunc}
      error={!!error}
      helperText={error?.message}
    />
  ) : (
    <Box display="flex" alignItems="center">
      <Box width="40%">
        <Typography variant='h4'>{props.label}</Typography>
      </Box>
      <Box width="60%">
        <TextField
          {...props}
          inputRef={ref}
          label=""
          value={value ?? ''}
          onChange={onChangeFunc}
          error={!!error}
          helperText={error?.message}
          fullWidth
        />
      </Box>
    </Box>
  )
}

export default FormTextField
