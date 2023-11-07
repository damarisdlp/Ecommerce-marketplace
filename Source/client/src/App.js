import React, { useMemo } from 'react';
// import redux for auth guard
import { useSelector } from 'react-redux';

// import layout
import Layout from 'layout/Layout';

// import routing modules
import RouteIdentifier from 'routing/components/RouteIdentifier';
import { getRoutes } from 'routing/helper';
import Loading from 'components/loading/Loading';
import routesAndMenuItemsLI from 'routing/routesLI';
import routesAndMenuItems from './routing/routes';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
  const { currentUser, isLogin } = useSelector((state) => state.auth);

  // eslint-disable-next-line
  const routes = useMemo(() => getRoutes({ 
    data: isLogin ? routesAndMenuItemsLI : routesAndMenuItems,
        isLogin,
        userRole: currentUser.role,
      }),
    [isLogin, currentUser]
  );

  if (!routes) {
    return null;
  }

  return (
    <ErrorBoundary>
      <Layout>
        <RouteIdentifier routes={routes} fallback={<Loading />} />
      </Layout>
    </ErrorBoundary>
  );
};

export default App;
