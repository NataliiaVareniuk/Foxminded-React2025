import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './shared/assets/api/query-client';
import TodoPage from './pages/TodoPage'


function App() {
  return (
    <QueryClientProvider client={queryClient}>
     
        <TodoPage />
      
     
    </QueryClientProvider>
  );
}

export default App;
