import { Routes, Route } from 'react-router';

import { useSessionStore } from './shared/store';
import { AuthPage, HomePage } from './pages';
import { Header } from './shared/layouts/header';

function App() {
    const { isAuthenticated } = useSessionStore();

    return (
        <div className="container">
            <Header />

            <Routes>
                {isAuthenticated ? (
                    <Route path="/" element={<HomePage />} />
                ) : (
                    <Route path="/" element={<AuthPage />} />
                )}
            </Routes>
        </div>
    );
}

export default App;
