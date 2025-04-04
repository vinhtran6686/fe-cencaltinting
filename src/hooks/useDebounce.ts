import { useCallback, useState, useEffect } from "react";

function useDebounce<T extends (...args: any[]) => any>(
    callback: T,
    delay: number
): (...args: Parameters<T>) => void {
    const [debouncedArgs, setDebouncedArgs] = useState<Parameters<T> | null>(null);

    useEffect(() => {
        if (debouncedArgs === null) return;

        const timer = setTimeout(() => {
            callback(...debouncedArgs);
            setDebouncedArgs(null);
        }, delay);

        return () => clearTimeout(timer);
    }, [callback, delay, debouncedArgs]);

    return useCallback((...args: Parameters<T>) => {
        setDebouncedArgs(args);
    }, []);
}

export default useDebounce;