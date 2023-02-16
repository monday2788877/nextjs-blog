import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { useRef, useEffect } from "react";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const usePrevious = <TValue extends unknown>(value: TValue) => {
    const ref = useRef<TValue>();
  
    useEffect(() => {
      ref.current = value;
    }, [value]);
  
    return ref.current;
}