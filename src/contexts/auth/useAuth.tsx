import React from 'react';
import {AuthContext, AuthContextType} from "./AuthContext";

const UseAuth = (): AuthContextType => {
    const authContext: AuthContextType | undefined = React.useContext(AuthContext);
    if (authContext === undefined) {
        throw new Error('useAuth must be used within the AuthProvider');
    }
    return authContext;
};

export default UseAuth;

