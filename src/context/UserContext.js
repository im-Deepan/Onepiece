import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(null);

  // Load user from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem('onepiece-user');
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  // Save user to localStorage when user changes
  const setUser = (userData) => {
    if (userData) {
      localStorage.setItem('onepiece-user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('onepiece-user');
    }
    setUserState(userData);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
