import ReactDOM from 'react-dom/client';
import './styles/global.scss'; 
import { QueryClientProvider,  } from '@tanstack/react-query';
import {  RouterProvider,  } from 'react-router-dom';
import { router } from 'routes/routes';
import queryClient from 'config/queryConfig';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
);
