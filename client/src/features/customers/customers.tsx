import { useState } from 'react';
import css from './customers.module.css';

import { useGetCustomers, useUploadCustomers } from './api';
import { Button } from '../../shared/components';

export const Customers = () => {
    const { data, isLoading, refetch } = useGetCustomers();
    const { mutate } = useUploadCustomers();

    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
        }
    };

    const handleUploadFile = () => {
        if (file) {
            mutate({ file }, {
                onSuccess: () => {
                    refetch();
                }
            });
        } else {
            alert('Select file first');
        }
    }

    return (
        <section>
            <div className={css.title}>
                <h3>Customers table</h3>

                <div>
                    <label htmlFor="customersFile">
                        <input id="customersFile" type="file" accept=".csv" onChange={handleFileChange} />
                    </label>

                    <Button onClick={handleUploadFile}>Upload</Button>
                </div>
            </div>

            <div className={css.tableContainer}>
                <table className={css.customersTable}>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Balance</th>
                            <th>Referrals Count</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((customer) => (
                            <tr key={customer._id}>
                                <td>{customer.username}</td>
                                <td>{customer.email}</td>
                                <td>{customer.balance}</td>
                                <td>{customer.referralsCount}</td>
                                <td>{customer.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isLoading ? 'Loading...' : null}
        </section>
    );
}