import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [sessionId, setSessionId] = useState(null);

    const login = (newSessionId) => {
        // Store the session ID in the state and mark the user as authenticated
        setSessionId(newSessionId);
        setIsAuthenticated(true);

        // Optionally, store the session ID in the browser's localStorage or sessionStorage
        // for persistence across page reloads:
        localStorage.setItem('sessionId', newSessionId);
    };

    const logout = () => {
        // Clear the session ID from the state and mark the user as unauthenticated
        setSessionId(null);
        setIsAuthenticated(false);

        // Also clear the session ID from localStorage, if it was stored there
        localStorage.removeItem('sessionId');
    };

    // Upon initialization, check if a session ID is stored in localStorage
    // and update the state accordingly
    React.useEffect(() => {
        const storedSessionId = localStorage.getItem('sessionId');
        if (storedSessionId) {
            setSessionId(storedSessionId);
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, sessionId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;