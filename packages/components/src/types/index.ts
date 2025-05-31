/**
 * @file Type definitions for the component library
 * This file exports all type definitions that are used across components
 */

// Export all types from tokens and theme
export * from '../style/tokens';
export * from '../style/theme';

// Component specific types
export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'text' | 'success' | 'warning';

// Input component types
export interface InputProps {
  modelValue: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  name?: string;
  required?: boolean;
  autofocus?: boolean;
  maxlength?: number;
  minlength?: number;
  pattern?: string;
}

// Toggle component types
export interface ToggleProps {
  modelValue: boolean;
  disabled?: boolean;
  label?: string;
}

export interface TabsProps {
  modelValue: string | number;
  tabs: Array<{
    id: string | number;
    label: string;
    disabled?: boolean;
  }>;
  disabled?: boolean;
}

export interface ProgressProps {
  value: number;
  max?: number;
  showPercentage?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary';
}
