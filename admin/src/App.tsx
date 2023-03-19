import { Card } from 'antd';
import 'antd/dist/reset.css'
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AdminLayout from './components/Layout/AdminLayout';
import LoginPage from './pages/Login';
import SuperTokens from 'supertokens-auth-react';
import { SuperTokensConfig } from './config';
import Helmet from 'react-helmet';
import { useContext, useMemo, useState } from 'react';
import { UserSessionContext } from './context/UserContext';
import SessionProvider from './components/SessionProvider';
import User from './models/User';
import AuthRoutes from './components/AuthRoutes';

if (typeof window !== 'undefined') {
  SuperTokens.init(SuperTokensConfig);
}


const App = () => {

  const [user, setUser] = useState<User | null>(null);

  const userSessionState = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <>
      <Helmet>
        <title>Admin</title>
      </Helmet>
      <UserSessionContext.Provider value={userSessionState}>
        <Router>
          <SessionProvider>
            <AuthRoutes>
              {user != null
                ? <AdminLayout>
                  <Card title="Card Title" bordered={false} style={{ width: "100%" }}>
                    <p>Card content</p>
                  </Card>
                </AdminLayout>
                : <LoginPage />
              }
            </AuthRoutes>
          </SessionProvider>
        </Router>
      </UserSessionContext.Provider>
    </>
  );
}

export default App;
