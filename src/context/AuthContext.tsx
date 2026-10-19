'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthUser, StoredUserAccount, UserRole } from '@/types';
import { MOCK_MENTORS } from '@/lib/mock-data';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithCredentials: (
    email: string,
    password: string,
    targetRedirect?: string
  ) => Promise<{ success: boolean; error?: string }>;
  registerUser: (
    userData: {
      name: string;
      email: string;
      password: string;
      department?: string;
      university?: string;
      nrp?: string;
      targetIndustry?: string;
      role?: UserRole;
    },
    targetRedirect?: string
  ) => Promise<{ success: boolean; error?: string }>;
  requestPasswordReset: (
    email: string
  ) => Promise<{ success: boolean; error?: string; message?: string; resetToken?: string }>;
  resetPasswordWithToken: (
    email: string,
    newPassword: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUserCRS: (crsScore: number, tier?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default seed database accounts (Clean, neutral credentials)
const INITIAL_DATABASE_USERS: StoredUserAccount[] = [
  {
    id: 'user_seed_mentor',
    name: 'Ir. Hendra Wijaya',
    email: 'hendra.wijaya@bp.com',
    password: 'password123',
    role: 'mentor',
    department: 'Teknik Elektro (Alumni ITS)',
    university: 'Institut Teknologi Sepuluh Nopember',
    targetIndustry: 'Offshore Energy & Power Systems',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'user_seed_inst',
    name: 'BEM FTEIC ITS & Himatektro',
    email: 'akademik.fteic@its.ac.id',
    password: 'password123',
    role: 'institution',
    department: 'Fakultas Teknologi Elektro dan Informatika Cerdas',
    university: 'Institut Teknologi Sepuluh Nopember',
    targetIndustry: 'Academic & Institutional Collaboration',
    avatarUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=200&auto=format&fit=crop&q=80',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
];

const DB_STORAGE_KEY = 'cb_users_db';
const SESSION_STORAGE_KEY = 'cb_auth_user';

function getStoredUsersFromDB(): StoredUserAccount[] {
  if (typeof window === 'undefined') return INITIAL_DATABASE_USERS;
  try {
    const raw = localStorage.getItem(DB_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(INITIAL_DATABASE_USERS));
      return INITIAL_DATABASE_USERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read users database from localStorage:', e);
    return INITIAL_DATABASE_USERS;
  }
}

function saveUsersToDB(users: StoredUserAccount[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save users database to localStorage:', e);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load existing session on initial mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
      // Ensure DB initialized in localStorage
      getStoredUsersFromDB();
    } catch (e) {
      console.error('Failed to parse active user session:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveActiveSession = (authUser: AuthUser, targetRedirect?: string) => {
    setUser(authUser);
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(authUser));
    } catch (e) {
      console.error('Failed to store active session:', e);
    }

    const destination = targetRedirect || '/diagnostic';
    router.push(destination);
  };

  const loginWithCredentials = async (
    email: string,
    password: string,
    targetRedirect?: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setIsLoading(false);
      return { success: false, error: 'Email dan kata sandi wajib diisi.' };
    }

    const dbUsers = getStoredUsersFromDB();
    const existingAccount = dbUsers.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!existingAccount) {
      setIsLoading(false);
      return {
        success: false,
        error: 'Email belum terdaftar. Silakan daftar akun baru terlebih dahulu.',
      };
    }

    if (existingAccount.password !== cleanPassword) {
      setIsLoading(false);
      return {
        success: false,
        error: 'Kata sandi tidak sesuai. Silakan periksa kembali atau gunakan opsi Lupa Kata Sandi.',
      };
    }

    // Extract user session without password
    const { password: _, resetToken: __, ...sessionUser } = existingAccount;
    saveActiveSession(sessionUser, targetRedirect);
    setIsLoading(false);
    return { success: true };
  };

  const registerUser = async (
    userData: {
      name: string;
      email: string;
      password: string;
      department?: string;
      university?: string;
      nrp?: string;
      targetIndustry?: string;
      role?: UserRole;
    },
    targetRedirect?: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const cleanEmail = userData.email.trim().toLowerCase();
    const cleanName = userData.name.trim();
    const cleanPassword = userData.password.trim();

    if (!cleanName) {
      setIsLoading(false);
      return { success: false, error: 'Nama lengkap wajib diisi.' };
    }
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setIsLoading(false);
      return { success: false, error: 'Alamat email tidak valid.' };
    }
    if (!cleanPassword || cleanPassword.length < 6) {
      setIsLoading(false);
      return { success: false, error: 'Kata sandi minimal 6 karakter.' };
    }

    const dbUsers = getStoredUsersFromDB();
    const isDuplicate = dbUsers.some((u) => u.email.toLowerCase() === cleanEmail);

    if (isDuplicate) {
      setIsLoading(false);
      return {
        success: false,
        error: 'Alamat email ini sudah terdaftar. Silakan masuk menggunakan kata sandi Anda.',
      };
    }

    // Generate avatar URL from name initials or realistic portrait
    const initials = cleanName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      cleanName
    )}&background=059669&color=ffffff&bold=true`;

    const newAccount: StoredUserAccount = {
      id: `usr_${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      password: cleanPassword,
      role: userData.role || 'student',
      department: userData.department || 'Teknik Elektro',
      university: userData.university || 'Institut Teknologi Sepuluh Nopember',
      nrp: userData.nrp || '',
      targetIndustry: userData.targetIndustry || 'Energy Transition & Automation',
      avatarUrl,
      createdAt: new Date().toISOString(),
      crsScore: undefined,
      crsTier: undefined,
      authProvider: 'credentials',
    };

    const updatedDB = [...dbUsers, newAccount];
    saveUsersToDB(updatedDB);

    // Save session without password
    const { password: _, ...sessionUser } = newAccount;
    saveActiveSession(sessionUser, targetRedirect);
    setIsLoading(false);
    return { success: true };
  };

  const requestPasswordReset = async (
    email: string
  ): Promise<{ success: boolean; error?: string; message?: string; resetToken?: string }> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setIsLoading(false);
      return { success: false, error: 'Masukkan alamat email yang terdaftar.' };
    }

    const dbUsers = getStoredUsersFromDB();
    const userIndex = dbUsers.findIndex((u) => u.email.toLowerCase() === cleanEmail);

    if (userIndex === -1) {
      setIsLoading(false);
      return {
        success: false,
        error: 'Email tidak ditemukan dalam database. Silakan periksa kembali atau daftar akun baru.',
      };
    }

    // Generate random 6-digit reset token
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    dbUsers[userIndex].resetToken = token;
    saveUsersToDB(dbUsers);

    setIsLoading(false);
    return {
      success: true,
      message: `Tautan dan kode reset kata sandi telah dikirim ke ${cleanEmail}. Gunakan kode ${token} untuk membuat kata sandi baru.`,
      resetToken: token,
    };
  };

  const resetPasswordWithToken = async (
    email: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = newPassword.trim();

    if (!cleanPassword || cleanPassword.length < 6) {
      setIsLoading(false);
      return { success: false, error: 'Kata sandi baru minimal 6 karakter.' };
    }

    const dbUsers = getStoredUsersFromDB();
    const userIndex = dbUsers.findIndex((u) => u.email.toLowerCase() === cleanEmail);

    if (userIndex === -1) {
      setIsLoading(false);
      return { success: false, error: 'Akun tidak ditemukan.' };
    }

    dbUsers[userIndex].password = cleanPassword;
    delete dbUsers[userIndex].resetToken;
    saveUsersToDB(dbUsers);

    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      localStorage.removeItem('cb_student_unlocked');
    } catch (e) {}
    router.push('/login');
  };

  const updateUserCRS = (crsScore: number, tier?: string) => {
    if (!user) return;

    const calculatedTier =
      tier ||
      (crsScore >= 80
        ? 'Industry Ready'
        : crsScore >= 60
        ? 'Emerging Readiness'
        : 'Exploration Needed');

    const updatedUser: AuthUser = {
      ...user,
      crsScore,
      crsTier: calculatedTier,
    };

    setUser(updatedUser);

    // Save session
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updatedUser));
      localStorage.setItem('cb_student_crs', crsScore.toString());
    } catch (e) {}

    // Persist to users database table
    try {
      const dbUsers = getStoredUsersFromDB();
      const updatedDB = dbUsers.map((u) => {
        if (u.id === user.id || u.email.toLowerCase() === user.email.toLowerCase()) {
          return { ...u, crsScore, crsTier: calculatedTier };
        }
        return u;
      });
      saveUsersToDB(updatedDB);
    } catch (e) {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        loginWithCredentials,
        registerUser,
        requestPasswordReset,
        resetPasswordWithToken,
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
