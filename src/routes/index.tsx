import {FC, lazy, Suspense} from 'react';
import { Outlet, useRoutes } from 'react-router-dom';

const Loadable = (Component: FC) => (props: any) => (
  <Suspense>
    <Component {...props} />
  </Suspense>
);

const App = Loadable(lazy(() => import('../App')));
const ShaderText = Loadable(lazy(() => import('../pages/ShaderText')));
const Three = Loadable(lazy(() => import('../pages/Three')));

// ==============================|| ROUTING RENDER ||============================== //

export default function Routes() {
  return useRoutes([{
    path: '/',
    element: <Outlet />,
    children: [
      {
        path: '/',
        element: <App/>
      },
      {
        path: '/shadertext',
        element: <ShaderText/>
      },
      {
        path: '/threejs',
        element: <Three />
      },
    ]
  }]);
}

