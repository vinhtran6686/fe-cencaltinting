import React from 'react'
import { Input as AntInput } from 'antd'
import type { InputProps as AntInputProps } from 'antd'
import type { TextAreaProps as AntTextAreaProps } from 'antd/lib/input/TextArea'

export interface InputProps extends AntInputProps {
  // Add any custom props here
}

export interface TextAreaProps extends AntTextAreaProps {
  // Add any custom props here
}

const Input: React.FC<InputProps> = (props) => {
  return <AntInput {...props} />
}

// Export variants
export const TextArea: React.FC<TextAreaProps> = (props) => {
  return <AntInput.TextArea {...props} />
}

export const Password: React.FC<InputProps> = (props) => {
  return <AntInput.Password {...props} />
}

export default Input 