import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { colors, spacing } from '../../theme/tokens';

export interface ToggleableFormProps {
  children: React.ReactNode;
  alternateChildren: React.ReactNode;
  toggleText: string;
  alternateToggleText: string;
  defaultAlternate?: boolean;
  isAlternate?: boolean;
  onToggle?: (isAlternate: boolean) => void;
  className?: string;
}

const FormContainer = styled.div`
  margin-bottom: ${spacing.md};
`;

const ToggleLink = styled.a`
  color: ${colors.primary};
  cursor: pointer;
  display: inline-block;
  margin-top: ${spacing.sm};
  transition: color 0.2s;
  
  &:hover {
    color: ${colors.primaryHover};
    text-decoration: underline;
  }
`;

export const ToggleableForm: React.FC<ToggleableFormProps> = ({
  children,
  alternateChildren,
  toggleText,
  alternateToggleText,
  defaultAlternate = false,
  isAlternate: controlledIsAlternate,
  onToggle,
  className,
}) => {
  const [uncontrolledIsAlternate, setUncontrolledIsAlternate] = useState(defaultAlternate);
  
  const isAlternate = controlledIsAlternate !== undefined 
    ? controlledIsAlternate 
    : uncontrolledIsAlternate;
  
  const handleToggle = () => {
    const newValue = !isAlternate;
    
    if (controlledIsAlternate === undefined) {
      setUncontrolledIsAlternate(newValue);
    }
    
    onToggle?.(newValue);
  };
  
  useEffect(() => {
    if (controlledIsAlternate !== undefined) {
      setUncontrolledIsAlternate(controlledIsAlternate);
    }
  }, [controlledIsAlternate]);
  
  return (
    <FormContainer className={className}>
      {isAlternate ? alternateChildren : children}
      
      <ToggleLink onClick={handleToggle}>
        {isAlternate ? alternateToggleText : toggleText}
      </ToggleLink>
    </FormContainer>
  );
};

export default ToggleableForm; 