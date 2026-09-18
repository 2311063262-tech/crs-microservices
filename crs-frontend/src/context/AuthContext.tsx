import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthUser, LoginResponse } from '../types/auth';
interface AuthContextValue { user: AuthUser | null; isAuthenticated: boolean; login: (data: LoginResponse) => void; logout: () => void }
const AuthContext = createContext<AuthContextValue | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  useEffect(() => { const token = localStorage.getItem('crs_token'); const savedUser = localStorage.getItem('crs_user'); if (token && savedUser) { try { const parsedUser = JSON.parse(savedUser) as AuthUser; if (parsedUser.id && parsedUser.username && (parsedUser.role === 'ADMIN' || parsedUser.role === 'STUDENT')) setUser(parsedUser); } catch { localStorage.removeItem('crs_token'); localStorage.removeItem('crs_user'); } } }, []);
  const login = (data: LoginResponse) => { const authUser: AuthUser = { id: data.userId, username: data.username, role: data.role }; localStorage.setItem('crs_token', data.token); localStorage.setItem('crs_user', JSON.stringify(authUser)); setUser(authUser); };
  const logout = () => { localStorage.removeItem('crs_token'); localStorage.removeItem('crs_user'); setUser(null); };
  return <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user), login, logout }}>{children}</AuthContext.Provider>;
};
export const useAuth = (): AuthContextValue => { const context = useContext(AuthContext); if (!context) throw new Error('useAuth must be used within an AuthProvider'); return context; };
