import {
    RouterProvider as LibraryRouterProvider,
    RouteObject,
    createBrowserRouter,
  } from "react-router-dom";

  type Props = {
    routes: Pick<RouteObject, 'path' | 'children'>[];
  }

  const RouterProvider = ({routes}: Props) : JSX.Element => {
    const router = createBrowserRouter(routes);

    return <LibraryRouterProvider router={router}/>
  }

  export {RouterProvider}