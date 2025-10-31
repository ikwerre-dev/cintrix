import { convertCurrency, fetchCurrencyRates } from '@/lib/helpers/currencyHelper';
import { useState, useEffect, useCallback } from 'react';

interface UserData {
    id: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    address?: string;
    created_at?: string;
    updated_at?: string;
    last_login?: string;
    role?: string;
}

interface Notification {
    id: string | number;
    user_id: string | number;
    type?: string;
    title: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

interface MedicalRecord {
    id: string;
    user_id: string;
    title: string;
    description?: string | null;
    data: string;
    hash: string;
    created_at: string;
}

export function useUserData() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [records, setRecords] = useState<MedicalRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const base = process.env.NEXT_PUBLIC_API_BASE_URL 
                || (process.env.NEXT_PUBLIC_API_PORT ? `http://localhost:${process.env.NEXT_PUBLIC_API_PORT}` : 'http://localhost:3001');
            
            const token = localStorage.getItem('auth-token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(`${base}/api/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data = await response.json();
            
            const mappedUser: UserData = {
                id: data.id ?? '',
                first_name: data.firstName ?? '',
                last_name: data.lastName ?? '',
                email: data.email ?? '',
                phone: data.phone ?? '',
                address: data.address ?? '',
                created_at: data.createdAt ?? new Date().toISOString(),
                updated_at: data.updatedAt ?? new Date().toISOString(),
                last_login: data.lastLogin ?? new Date().toISOString(),
                role: data.role ?? ''
            };

            const mappedNotifications: Notification[] = (data.notifications ?? []).map((n: any) => ({
                id: n.id,
                user_id: n.userId,
                type: n.type,
                title: n.title,
                message: n.message,
                is_read: Boolean(n.isRead),
                created_at: n.createdAt
            }));

            const mappedRecords: MedicalRecord[] = (data.records ?? []).map((r: any) => ({
                id: r.id,
                user_id: r.userId,
                title: r.title,
                description: r.description ?? null,
                data: r.data,
                hash: r.hash,
                created_at: r.createdAt
            }));

            setUserData(mappedUser);
            setNotifications(mappedNotifications);
            setRecords(mappedRecords);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const reload = () => {
        fetchData();
    };

    return {
        userData,
        notifications,
        records,
        loading,
        error,
        reload
    };
}