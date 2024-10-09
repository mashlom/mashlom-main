import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface ResusContextType {
  age: string;
  weight: number | null;
  protocol: string;
  setAge: (age: string) => void;
  setWeight: (weight: number | null) => void;
  setProtocol: (protocol: string) => void;
  updateContext: (age: string, weight: number | null) => void;
  resetContext: () => void;
}

const ResusContext = createContext<ResusContextType | undefined>(undefined);

export const useResusContext = () => {
  const context = useContext(ResusContext);
  if (!context) {
    throw new Error('useResusContext must be used within a ResusProvider');
  }
  return context;
};

export const ResusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [age, setAge] = useState<string>('');
  const [weight, setWeight] = useState<number | null>(null);
  const [protocol, setProtocol] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const ageParam = searchParams.get('age');
    const weightParam = searchParams.get('weight');

    if (ageParam) setAge(ageParam);
    if (weightParam) setWeight(Number(weightParam));
  }, []);

  const updateContext = (newAge: string, newWeight: number | null) => {
    setAge(newAge);
    setWeight(newWeight);
    const searchParams = new URLSearchParams(location.search);
    if (newAge) searchParams.set('age', newAge);
    if (newWeight !== null) searchParams.set('weight', newWeight.toString());
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  const resetContext = () => {
    setAge('');
    setWeight(null);
    setProtocol('');
    navigate(location.pathname, { replace: true });
  };

  return (
    <ResusContext.Provider value={{ 
      age, 
      weight, 
      protocol, 
      setAge, 
      setWeight, 
      setProtocol, 
      updateContext, 
      resetContext 
    }}>
      {children}
    </ResusContext.Provider>
  );
};