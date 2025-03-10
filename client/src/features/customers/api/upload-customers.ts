import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../../shared/fetcher';

interface UploadCustomersParams {
    file: File;
}

interface UploadCustomersResponse {
    success: boolean;
    message: string;
}

export function useUploadCustomers() {
    return useMutation({
        mutationFn: async ({ file }: UploadCustomersParams) => {
            const formData = new FormData();
            formData.append('file', file);

            const response = await apiClient.post<UploadCustomersResponse>(
                '/csv/uploadCustomers',
                formData,
            );

            if (!response.success) {
                throw new Error(response.message);
            }
        },
        onError: (error: Error) => {
            alert(error.message);
        },
    });
}
