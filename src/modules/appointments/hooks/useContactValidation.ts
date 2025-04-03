import { Rule } from 'antd/es/form';
import FormValidation from '@/components/common/Form/FormValidation';

/**
 * Custom hook for contact form validation rules
 * Follows the module-centric pattern by providing domain-specific validation
 * while leveraging the global FormValidation utility
 */
export const useContactValidation = () => {
  return {
    /**
     * Validation rules for contact name field
     */
    nameRules: [
      FormValidation.required('Name is required'),
      FormValidation.name('Please enter a valid name'),
      FormValidation.minLength(2, 'Name must be at least 2 characters')
    ],

    /**
     * Validation rules for contact email field
     */
    emailRules: [
      FormValidation.required('Email is required'),
      FormValidation.email('Please enter a valid email')
    ],

    /**
     * Validation rules for contact phone field
     */
    phoneRules: [
      FormValidation.required('Phone number is required'),
      FormValidation.phoneInternational('Please enter a valid phone number')
    ],

    /**
     * Validation rules for contact additional phone field
     */
    additionalPhoneRules: [
      FormValidation.required('Additional phone number is required'),
      FormValidation.phoneInternational('Please enter a valid phone number'),
      FormValidation.differentFrom('contactPhone', 'Additional phone must be different from primary phone')
    ],

    /**
     * Validation rules for contact note field (optional)
     */
    noteRules: [
      FormValidation.maxLength(500, 'Note cannot exceed 500 characters')
    ],

    /**
     * Validation rules for contact selection in forms
     */
    contactSelectionRules: [
      FormValidation.required('Please select a contact')
    ],
    
    /**
     * Custom validation function for when either email or phone is required
     * but not both necessarily
     */
    emailOrPhoneRequired: (emailField: string, phoneField: string): Rule => ({
      validator: async (_, value, form: any) => {
        if (!form) return Promise.resolve();
        
        const email = form.getFieldValue(emailField);
        const phone = form.getFieldValue(phoneField);
        
        if (!email && !phone) {
          return Promise.reject('Either email or phone is required');
        }
        
        return Promise.resolve();
      }
    })
  };
};

export default useContactValidation; 