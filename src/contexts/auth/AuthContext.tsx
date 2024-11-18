import {createContext} from 'react';

export interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    token: string | null;
    setToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
