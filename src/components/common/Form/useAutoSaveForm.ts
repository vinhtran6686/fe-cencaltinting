import { useEffect, useRef, useState } from 'react';
import { FormInstance } from 'antd/es/form';
import { debounce } from 'lodash';

export interface UseAutoSaveFormOptions {
  debounceTime?: number;
  storageKey?: string;
  saveHandler?: (formValues: any) => Promise<void> | void;
  watchFields?: string[];
  saveToLocalStorage?: boolean;
  restoreFromLocalStorage?: boolean;
}

export const useAutoSaveForm = <T = any>(
  form: FormInstance<T>,
  options: UseAutoSaveFormOptions = {},
) => {
  const {
    debounceTime = 1000,
    storageKey,
    saveHandler,
    watchFields,
    saveToLocalStorage = true,
    restoreFromLocalStorage = true,
  } = options;

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<Error | null>(null);
  
  const isMounted = useRef(false);
  
  const debouncedSave = useRef(
    debounce(async (values: T) => {
      try {
        setIsSaving(true);
        
        if (saveToLocalStorage && storageKey) {
          localStorage.setItem(storageKey, JSON.stringify(values));
        }
        
        if (saveHandler) {
          await saveHandler(values);
        }
        
        setLastSaved(new Date());
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to save form'));
        console.error('Error saving form data:', err);
      } finally {
        setIsSaving(false);
      }
    }, debounceTime)
  ).current;
  
  useEffect(() => {
    if (restoreFromLocalStorage && storageKey && !isMounted.current) {
      try {
        const savedData = localStorage.getItem(storageKey);
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          form.setFieldsValue(parsedData);
        }
      } catch (err) {
        console.error('Error restoring form data from localStorage:', err);
      }
      
      isMounted.current = true;
    }
  }, [form, storageKey, restoreFromLocalStorage]);
  
  const onValuesChange = (changedValues: any, allValues: T) => {
    if (watchFields && watchFields.length > 0) {
      const changedField = Object.keys(changedValues)[0];
      if (watchFields.includes(changedField)) {
        debouncedSave(allValues);
      }
    } else {
      debouncedSave(allValues);
    }
  };
  
  const saveNow = async () => {
    const values = form.getFieldsValue();
    try {
      setIsSaving(true);
      
      if (saveToLocalStorage && storageKey) {
        localStorage.setItem(storageKey, JSON.stringify(values));
      }
      
      if (saveHandler) {
        await saveHandler(values);
      }
      
      setLastSaved(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to save form'));
      console.error('Error saving form data:', err);
    } finally {
      setIsSaving(false);
    }
  };
  
  const restoreFromStorage = () => {
    if (!storageKey) return;
    
    try {
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        form.setFieldsValue(parsedData);
      }
    } catch (err) {
      console.error('Error restoring form data from localStorage:', err);
    }
  };
  
  const clearSaved = () => {
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }
    setLastSaved(null);
  };
  
  return {
    isSaving,
    lastSaved,
    error,
    saveNow,
    restoreFromStorage,
    clearSaved,
    onValuesChange,
  };
};

export default useAutoSaveForm;