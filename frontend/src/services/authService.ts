"use client";

import { LoginCredentials, RegisterCredentials, User } from "@/types/auth";

// API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Helper to store token in localStorage
const storeToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
};

// Helper to get token from localStorage
export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

// Helper to remove token from localStorage
export const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
};

// Helper to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// Helper to get auth headers
export const getAuthHeaders = (): HeadersInit => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

// Register a new user
export async function register(credentials: RegisterCredentials): Promise<{ user: User; token: string }> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to register');
  }

  const data = await response.json();
  storeToken(data.token);
  return data;
}

// Login user
export async function login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Invalid credentials');
  }

  const data = await response.json();
  storeToken(data.token);
  return data;
}

// Logout user
export function logout(): void {
  removeToken();
  // You might want to redirect the user or update app state here
} 