import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role') || '');
    const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    const handleLogin = (token, userRole, user_id, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', userRole);
        localStorage.setItem('userId', user_id);
        localStorage.setItem('user', JSON.stringify(user));
        setIsAuthenticated(true);
        setRole(userRole);
        setUserId(user_id);
        setUser(user);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setRole('');
        setUserId('');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, userId, user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
