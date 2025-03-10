import { useMutation } from '@tanstack/react-query';

import { apiClient } from '../../../shared/fetcher';
import { useSessionStore } from '../../../shared/store';

interface SignUpCredentials {
    email: string;
    password: string;
}

interface SignUpResponse {
    success: boolean;
    accessToken: string;
    message?: string;
}

export function useSignUp() {
    const { setIsAuthenticated, setAccessToken } = useSessionStore();

    return useMutation({
        mutationFn: async (data: SignUpCredentials) => {
            const response = await apiClient.publicPost<SignUpResponse>('/auth/signup', data);

            if (!response.success) {
                throw new Error(response.message);
            }

            return response;
        },
        onSuccess: (data) => {
            setAccessToken(data.accessToken);
            setIsAuthenticated(true);
        },
        onError: async (error: Error) => {
            alert(error.message);
        }
    });
}
