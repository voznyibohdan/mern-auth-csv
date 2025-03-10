import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../shared/fetcher';

interface Customer {
    _id: string;
    username: string;
    email: string;
    balance: number;
    referralsCount: string;
    createdAt: string;
}

export function useGetCustomers() {
    return useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
            const response = await apiClient.get<{customers: Customer[]}>('/csv/getCustomers');
            return response.customers;
        }
    });
}
