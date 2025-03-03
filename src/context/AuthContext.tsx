import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { sampleUsers } from '../data/sampleData';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [error, setError] = useState<string | null>(null);

  // Save authentication state to localStorage
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('currentUser');
    }
  }, [isAuthenticated, currentUser]);

  const login = (username: string, password: string): boolean => {
    // Clear previous errors
    setError(null);
    
    // Find user with matching credentials
    const user = sampleUsers.find(
      u => u.username === username && u.password === password
    );
    
    if (user) {
      // Create a copy without the password for security
      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(user);
      setIsAuthenticated(true);
      return true;
    } else {
      setError('Invalid username or password');
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        login,
        logout,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};