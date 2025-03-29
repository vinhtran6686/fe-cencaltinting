import React from 'react'
import { Button as AntButton } from 'antd'
import type { ButtonProps as AntButtonProps } from 'antd'

export interface ButtonProps extends AntButtonProps {
  // Add any custom props here
}

const Button: React.FC<ButtonProps> = (props) => {
  return <AntButton {...props} />
}

export default Button 