import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  SelectProps,
  Typography,
} from '@mui/material'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

export type SelectOptionProps = { label: string; value?: string }

export type FormSelectProps<TFieldValues extends FieldValues> = Omit<
  UseControllerProps<TFieldValues>,
  'rules'
> &
  Omit<SelectProps, 'value' | 'onChange'> & {
    label?: string
    placeholder?: string
    options: SelectOptionProps[]
  } & {
    axis?: 'vertical' | 'horizontal'
  }

export function FormSelect<TFieldValues extends FieldValues>({
  name,
  shouldUnregister,
  defaultValue,
  control,
  label,
  placeholder,
  options,
  required,
  axis = 'horizontal',
  ...props
}: FormSelectProps<TFieldValues>) {
  const { field, fieldState } = useController({
    name,
    shouldUnregister,
    defaultValue,
    control,
  })

  const { error } = fieldState
  const { value, onChange } = field

  const RenderSelect = (renderSelect: any) => {
    return (
      <FormControl error={!!error} required={required}>
        {renderSelect.label === '' ? null : <InputLabel>{label}</InputLabel>}
        <Select
          {...props}
          {...renderSelect}
          displayEmpty
          value={value ?? ''}
          onChange={onChange}
          renderValue={(selected) => {
            if (!selected) {
              return (
                <Typography
                  variant="body2"
                  sx={({ palette }) => ({ color: palette.grey[400] })}
                >
                  {placeholder}
                </Typography>
              )
            }
            return options.find((option) => option.value === selected)?.label
          }}
        >
          {options.map((option, index) => {
            if (option?.value) {
              return (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              )
            } else
              return <ListSubheader key={index}>{option.label}</ListSubheader>
          })}
        </Select>
        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    )
  }

  const SwitchAxis = () => {
    switch (axis) {
      case 'vertical':
        return <RenderSelect />
      case 'horizontal':
        return (
          <>
            <Box display="flex" alignItems="center">
              <Box width="40%">
                <Typography variant='h4'>{label}</Typography>
              </Box>
              <Box
                width="60%"
                sx={{
                  '.MuiFormControl-root': {
                    width: '100%',
                  },
                }}
              >
                <RenderSelect {...props} fullWidth label="" />
              </Box>
            </Box>
          </>
        )
    }
  }

  return <SwitchAxis />
}
