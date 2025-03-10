import { useSessionStore } from '../store';

const baseUrl = import.meta.env.VITE_API_URL;

class ApiClient {
    private static instance: ApiClient;

    private constructor() {}

    public static getInstance(): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient();
        }
        return ApiClient.instance;
    }

    private getHeaders(isProtected: boolean = false) {
        const headers: Record<string, string> = {
            'Accept': 'application/json'
        };

        if (isProtected) {
            const accessToken = useSessionStore.getState().accessToken;
            if (accessToken) {
                headers['Authorization'] = `Bearer ${accessToken}`;
            }
        }

        return headers;
    }

    private async handleResponse<T>(response: Response, retryFn: () => Promise<Response>): Promise<T> {
        if (response.ok) {
            return response.json();
        }

        if (response.status === 401) {
            const refreshSuccessful = await this.refreshToken();

            if (refreshSuccessful) {
                const newResponse = await retryFn();
                return newResponse.json();
            } else {
                useSessionStore.getState().setAccessToken('');
                useSessionStore.getState().setIsAuthenticated(false);
                throw new Error('Authentication failed');
            }
        }

        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    private async refreshToken(): Promise<boolean> {
        try {
            const response = await fetch(`${baseUrl}/auth/refresh`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                return false;
            }

            const data = await response.json();
            useSessionStore.getState().setAccessToken(data.accessToken);
            useSessionStore.getState().setIsAuthenticated(true);

            return true;
        } catch (error) {
            return false;
        }
    }

    public async get<T>(endpoint: string): Promise<T> {
        const makeRequest = () => fetch(`${baseUrl}${endpoint}`, {
            method: 'GET',
            headers: this.getHeaders(true),
            credentials: 'include',
        });

        const response = await makeRequest();
        return this.handleResponse<T>(response, makeRequest);
    }

    public async post<T>(endpoint: string, data: any): Promise<T> {
        const makeRequest = () => fetch(`${baseUrl}${endpoint}`, {
            method: 'POST',
            headers: this.getHeaders(true),
            body: data,
            credentials: 'include',
        });

        const response = await makeRequest();
        return this.handleResponse<T>(response, makeRequest);
    }

    public async publicPost<T>(endpoint: string, data: any): Promise<T> {
        const makeRequest = () => fetch(`${baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include',
        });

        const response = await makeRequest();
        return this.handleResponse<T>(response, makeRequest);
    }
}

export const apiClient = ApiClient.getInstance();
