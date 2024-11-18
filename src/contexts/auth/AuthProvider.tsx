import React, {ReactNode} from 'react';
import {AuthContext} from "./AuthContext";

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [token, setToken] = React.useState<string | null>(null);


    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, token, setToken}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;


