import { convertCurrency, fetchCurrencyRates } from '@/lib/helpers/currencyHelper';
import { useState, useEffect, useCallback } from 'react';

interface UserData {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
}

export function useUserData() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const base = "https://mediflow-backend.vercel.app";
            
            const token = localStorage.getItem('auth-token');
            console.log(token)
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(`${base}/api/auth/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data = await response.json();
            setUserData(data);

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
        loading,
        error,
        reload
    };
}