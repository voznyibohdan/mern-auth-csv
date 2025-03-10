import { useMutation } from '@tanstack/react-query';

import { apiClient } from '../../../shared/fetcher';
import { useSessionStore } from '../../../shared/store';

interface SignInCredentials {
    email: string;
    password: string;
}

interface SignInResponse {
    success: boolean;
    accessToken: string;
    message?: string;
}

export function useSignIn() {
    const { setIsAuthenticated, setAccessToken } = useSessionStore();

    return useMutation({
        mutationFn: async (data: SignInCredentials) => {
            const response = await apiClient.publicPost<SignInResponse>('/auth/signin', data);

            if (!response.success) {
                throw new Error(response.message);
            }

            return response;
        },
        onSuccess: async (data: SignInResponse) => {
            setIsAuthenticated(true);
            setAccessToken(data.accessToken);
        },
        onError: async (error: Error) => {
            alert(error.message);
        }
    });
}
