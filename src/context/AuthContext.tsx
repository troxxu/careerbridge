'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthUser, UserRole } from '@/types';
import { MOCK_STUDENTS, MOCK_MENTORS } from '@/lib/mock-data';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithGoogle: (targetRedirect?: string) => Promise<void>;
  loginWithCredentials: (email: string, role?: UserRole, targetRedirect?: string) => Promise<void>;
  registerUser: (userData: Partial<AuthUser>, targetRedirect?: string) => Promise<void>;
  logout: () => void;
  updateUserCRS: (crsScore: number, tier?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_STUDENT_USER: AuthUser = {
  id: 'std-1',
  name: 'Thoriq Hilmuddin',
  email: 'thoriq.hilmuddin@alumni.its.ac.id',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  role: 'student',
  department: 'Teknik Elektro ITS',
  university: 'Institut Teknologi Sepuluh Nopember',
  nrp: '5007201191',
  targetIndustry: 'Oil & Gas & Subsea Electrical',
  crsScore: 54,
  crsTier: 'Exploration Needed',
  authProvider: 'google',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cb_auth_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse stored user:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUserSession = (newUser: AuthUser, targetRedirect?: string) => {
    setUser(newUser);
    try {
      localStorage.setItem('cb_auth_user', JSON.stringify(newUser));
    } catch (e) {}

    const destination = targetRedirect || '/diagnostic';
    router.push(destination);
  };

  const loginWithGoogle = async (targetRedirect?: string) => {
    setIsLoading(true);
    // Simulate instantaneous Google OAuth handshake
    await new Promise((resolve) => setTimeout(resolve, 600));

    const googleUser: AuthUser = {
      ...DEFAULT_STUDENT_USER,
      authProvider: 'google',
    };

    saveUserSession(googleUser, targetRedirect);
    setIsLoading(false);
  };

  const loginWithCredentials = async (email: string, role: UserRole = 'student', targetRedirect?: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    let authUser: AuthUser;

    if (role === 'mentor') {
      const mentor = MOCK_MENTORS[0];
      authUser = {
        id: mentor.id,
        name: mentor.name,
        email: email || 'hendra.wijaya@bp.com',
        avatarUrl: mentor.avatarUrl,
        role: 'mentor',
        department: 'Teknik Elektro ITS (Alumni)',
        university: 'Institut Teknologi Sepuluh Nopember',
        targetIndustry: mentor.industryDomain,
        authProvider: 'credentials',
      };
    } else if (role === 'institution') {
      authUser = {
        id: 'inst-1',
        name: 'BEM FTEIC ITS & Himatektro',
        email: email || 'akademik.fteic@its.ac.id',
        avatarUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=200&auto=format&fit=crop&q=80',
        role: 'institution',
        department: 'Fakultas Teknologi Elektro dan Informatika Cerdas',
        university: 'Institut Teknologi Sepuluh Nopember',
        authProvider: 'credentials',
      };
    } else {
      authUser = {
        ...DEFAULT_STUDENT_USER,
        email: email || DEFAULT_STUDENT_USER.email,
        authProvider: 'credentials',
      };
    }

    saveUserSession(authUser, targetRedirect);
    setIsLoading(false);
  };

  const registerUser = async (userData: Partial<AuthUser>, targetRedirect?: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newUser: AuthUser = {
      id: `std-${Date.now()}`,
      name: userData.name || 'Mahasiswa Baru',
      email: userData.email || 'mahasiswa@its.ac.id',
      avatarUrl: userData.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      role: userData.role || 'student',
      department: userData.department || 'Teknik Elektro ITS',
      university: userData.university || 'Institut Teknologi Sepuluh Nopember',
      nrp: userData.nrp || '5007221001',
      targetIndustry: userData.targetIndustry || 'Power Utility & Grid Automation',
      crsScore: undefined,
      authProvider: 'credentials',
    };

    saveUserSession(newUser, targetRedirect);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('cb_auth_user');
      localStorage.removeItem('cb_student_unlocked');
    } catch (e) {}
    router.push('/login');
  };

  const updateUserCRS = (crsScore: number, tier?: string) => {
    if (user) {
      const calculatedTier = tier || (crsScore >= 80 ? 'Industry Ready' : crsScore >= 60 ? 'Emerging Readiness' : 'Exploration Needed');
      const updated: AuthUser = { ...user, crsScore, crsTier: calculatedTier };
      setUser(updated);
      try {
        localStorage.setItem('cb_auth_user', JSON.stringify(updated));
        localStorage.setItem('cb_student_crs', crsScore.toString());
      } catch (e) {}
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        loginWithGoogle,
        loginWithCredentials,
        registerUser,
        logout,
        updateUserCRS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
