import { Rule } from 'antd/es/form';

export const FormValidation = {
  required: (message: string = 'This field is required'): Rule => ({
    required: true,
    message,
  }),

  email: (message: string = 'Please enter a valid email address'): Rule => ({
    type: 'email',
    message,
  }),

  phone: (message: string = 'Please enter a valid phone number'): Rule => ({
    pattern: /^(\+\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
    message,
  }),

  // More flexible phone validation (accepts international formats)
  phoneInternational: (message: string = 'Please enter a valid phone number'): Rule => ({
    pattern: /^(\+\d{1,3}[-\s]?)?\(?(\d{3})\)?[-\s]?(\d{3})[-\s]?(\d{4})$/,
    message,
  }),

  // Simple phone validation (just numbers, dashes, spaces, parentheses, plus)
  phoneSimple: (message: string = 'Please enter a valid phone number'): Rule => ({
    pattern: /^[0-9\-\+\(\)\s]+$/,
    message,
  }),

  url: (message: string = 'Please enter a valid URL'): Rule => ({
    type: 'url',
    message,
  }),

  minLength: (min: number, message?: string): Rule => ({
    min,
    message: message || `Please enter at least ${min} characters`,
  }),

  maxLength: (max: number, message?: string): Rule => ({
    max,
    message: message || `Please enter no more than ${max} characters`,
  }),

  min: (min: number, message?: string): Rule => ({
    type: 'number',
    min,
    message: message || `Value must be at least ${min}`,
  }),

  max: (max: number, message?: string): Rule => ({
    type: 'number',
    max,
    message: message || `Value must be at most ${max}`,
  }),

  password: (message: string = 'Password must contain at least 8 characters, including uppercase, lowercase letters and numbers'): Rule => ({
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    message,
  }),

  match: (field: string, message?: string): Rule => ({
    validator: (_, value, callback) => {
      const form = (callback as any)?.form;
      if (!form) return Promise.resolve();
      
      const matchValue = form.getFieldValue(field);
      if (value && value !== matchValue) {
        return Promise.reject(message || `This field does not match with ${field}`);
      }
      return Promise.resolve();
    },
  }),

  custom: (validator: (value: any) => Promise<void> | void): Rule => ({
    validator: async (_, value) => {
      try {
        await validator(value);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error instanceof Error ? error.message : String(error));
      }
    },
  }),

  // Require either this field or another field
  requiredUnless: (field: string, message: string = 'Either this field or the other is required'): Rule => ({
    validator: (_, value, callback) => {
      const form = (callback as any)?.form;
      if (!form) return Promise.resolve();
      
      const otherValue = form.getFieldValue(field);
      if (!value && !otherValue) {
        return Promise.reject(message);
      }
      return Promise.resolve();
    },
  }),

  // Ensure value is different from another field
  differentFrom: (field: string, message: string = 'This value must be different from the other field'): Rule => ({
    validator: (_, value, callback) => {
      const form = (callback as any)?.form;
      if (!form) return Promise.resolve();
      
      const otherValue = form.getFieldValue(field);
      if (value && value === otherValue) {
        return Promise.reject(message);
      }
      return Promise.resolve();
    },
  }),

  // Name validation (letters, spaces, hyphens, apostrophes)
  name: (message: string = 'Please enter a valid name'): Rule => ({
    pattern: /^[\p{L}\s'-]+$/u,
    message,
  }),

  // Compound validation with multiple rules
  compose: (...rules: Rule[]): Rule[] => rules,
};

export default FormValidation; 