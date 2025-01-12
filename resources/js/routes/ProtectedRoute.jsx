import { Navigate } from 'react-router-dom';
import config from '~/config';

const ProtectedRoute = ({ isAuthenticated, forbidden = false, nextUrl, children }) => {
    if (!isAuthenticated) {
        localStorage.setItem('nextUrl', nextUrl);
        return <Navigate to={config.routes.other.login} />;
    }

    if (forbidden) {
        return <Navigate to={config.routes.other.forbidden} />;
    }
    return children;
};

export default ProtectedRoute;
