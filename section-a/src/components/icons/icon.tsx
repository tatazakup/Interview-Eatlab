import { SvgIcon, SvgIconProps } from '@mui/material'
import { forwardRef } from 'react'
import filled from './filled'
import outlined from './outlined'
import regular from './regular'

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsSizeOverrides {
    extraLarge: true
  }
}

const icons = { ...filled, ...outlined, ...regular }

export type IconName = keyof typeof icons

export type IconProps = Omit<SvgIconProps, 'component' | 'inheritViewBox'> & {
  name: IconName
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, ...props }, ref) => (
    <SvgIcon {...props} ref={ref} component={icons[name]} inheritViewBox />
  ),
)

export default Icon
