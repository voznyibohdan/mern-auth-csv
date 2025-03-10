import { useState } from 'react';
import css from './auth.module.css';

import { useSignIn, useSignUp } from './api';
import { Button, Input } from '../../shared/components';

export const AuthPage = () => {
    const { mutate: signIn } = useSignIn();
    const { mutate: signUp } = useSignUp();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        signIn({ email, password });
    }

    const handleSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        signUp({ email, password });
    }

    return (
        <div>
            <form>
                <label htmlFor="email">Email</label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password</label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className={css.buttonsContainer}>
                    <Button onClick={handleSignIn}>Sign In</Button>
                    <Button onClick={handleSignUp}>Sign Up</Button>
                </div>
            </form>
        </div>
    );
}
