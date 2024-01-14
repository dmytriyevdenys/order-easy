import ReactDOM from 'react-dom/client';
import './styles/global.scss'; 
import { QueryClient, QueryClientProvider,  } from '@tanstack/react-query';
import {  RouterProvider } from 'react-router-dom';
import { router } from 'routes/routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
);
